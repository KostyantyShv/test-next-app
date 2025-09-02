'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import styles from './AIAssistantPlatform.module.css';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface ContextPill {
  id: string;
  type: string;
  name: string;
}

interface PromptPill {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

interface AIAssistantPlatformProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AIAssistantPlatform: React.FC<AIAssistantPlatformProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: "Hello! How can I assist you today? I'm here to help with writing, research, analysis, and more." }
  ]);
  const [contextPills, setContextPills] = useState<ContextPill[]>([]);
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [activeModel, setActiveModel] = useState('SchoolScout');
  
  const panelRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const promptPills: PromptPill[] = [
    { id: 'write', title: 'Write', desc: 'Help me write content', icon: '✍️' },
    { id: 'research', title: 'Research', desc: 'Help me research a topic', icon: '🔍' },
    { id: 'analyze', title: 'Analyze', desc: 'Help me analyze data', icon: '📊' },
    { id: 'all', title: 'All Prompts', desc: 'View all available prompts', icon: '📋' }
  ];

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      try {
        if (document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } catch (error) {
        console.warn('Error removing event listener:', error);
      }
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (isOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const submitMessage = () => {
    const message = chatInput.trim();
    if (!message) return;
    
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: 'I understand your request. Let me help you with that.' }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const handlePromptPillClick = (pillId: string) => {
    if (pillId === 'all') {
      // Handle all prompts view
      return;
    }
    setActivePrompt(pillId);
  };

  const addContextPill = (name: string, type: string, id: string) => {
    setContextPills(prev => [...prev, { id, type, name }]);
  };

  const removeContext = (type: string, id: string) => {
    setContextPills(prev => prev.filter(pill => !(pill.type === type && pill.id === id)));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 cursor-pointer" 
        onClick={handleBackdropClick}
      />
      
      {/* AI Panel */}
      <div 
        ref={panelRef}
        className={cn(
          "absolute top-0 right-0 w-[450px] h-screen bg-white shadow-2xl flex",
          "transform transition-all duration-300 ease-in-out",
          "border-l border-gray-200",
          styles.aiPanel,
          isOpen ? "translate-x-0" : "translate-x-full",
          isExpanded && "w-[580px]",
          className
        )}
        style={{
          backgroundColor: 'white !important',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          height: '100vh',
          minHeight: '100vh',
        }}
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#464646]">Assistant</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 border-none rounded-full flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:text-[#4A4A4A]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div 
              ref={chatMessagesRef}
              className="flex-1 p-4 overflow-y-auto space-y-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-2",
                    message.type === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      message.type === 'user'
                        ? "bg-[#1D77BD] text-white rounded-br-md"
                        : "bg-gray-100 text-[#4A4A4A] rounded-bl-md"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Context Pills */}
            {contextPills.length > 0 && (
              <div className="px-4 py-3 flex gap-2 flex-wrap min-h-[40px]">
                {contextPills.map((pill) => (
                  <div
                    key={pill.id}
                    className="bg-gray-100 border border-gray-200 rounded-2xl px-3 py-1.5 text-xs text-[#4A4A4A] flex items-center gap-2 relative cursor-pointer group"
                  >
                    <span>{pill.name}</span>
                    <button
                      onClick={() => removeContext(pill.type, pill.id)}
                      className="w-4 h-4 bg-transparent border-none text-[#5F5F5F] cursor-pointer p-0.5 rounded-full hidden group-hover:flex items-center justify-center transition-all hover:bg-black hover:bg-opacity-10"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Prompt Pills */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex gap-2 flex-wrap">
                {promptPills.map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => handlePromptPillClick(pill.id)}
                    className={cn(
                      "bg-[#EBFCF4] border border-transparent rounded-2xl px-3 py-1.5 text-sm cursor-pointer transition-all text-[#4A4A4A] flex items-center gap-1 hover:bg-[#D7F7E9] hover:border-[#0B6333]",
                      activePrompt === pill.id && "bg-[#0B6333] text-white"
                    )}
                  >
                    <span>{pill.icon}</span>
                    {pill.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4">
              <div className="relative bg-white border-[1.5px] border-gray-200 rounded-xl transition-all focus-within:border-[#1D77BD] focus-within:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]">
                <div className="flex items-end gap-2 px-3 py-[18px] bg-white">
                  <textarea
                    ref={chatInputRef}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything, type '/' for prompts, or '@' for collections"
                    className="flex-1 border-none outline-none resize-none text-sm leading-relaxed max-h-[120px] min-h-[20px] font-sans text-[#4A4A4A] placeholder-[#5F5F5F] bg-transparent"
                    rows={2}
                  />
                  <button
                    onClick={submitMessage}
                    className={cn(
                      "w-8 h-8 bg-[#1D77BD] border-none rounded-full flex items-center justify-center cursor-pointer transition-all text-white",
                      chatInput.trim() ? "opacity-100 scale-100" : "opacity-0 scale-80"
                    )}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-white border-t border-gray-200 px-3 py-2 rounded-b-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="bg-transparent border-none rounded-md px-2 py-1 text-xs cursor-pointer transition-all text-[#5F5F5F] hover:bg-[rgba(29,119,189,0.1)] hover:text-[#1D77BD] flex items-center gap-1.5">
                      <span>{activeModel}</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[rgba(29,119,189,0.1)] hover:text-[#1D77BD]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[rgba(29,119,189,0.1)] hover:text-[#1D77BD]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[rgba(29,119,189,0.1)] hover:text-[#1D77BD]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[50px] bg-gray-50 border-l border-gray-200 flex flex-col p-3 gap-2">
          {/* Panel Controls */}
          <div className="flex flex-col gap-1 mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-[34px] h-[34px] bg-transparent border-none rounded-md flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-gray-200 hover:text-[#4A4A4A]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button
              onClick={() => setShowChatHistory(!showChatHistory)}
              className="w-[34px] h-[34px] bg-transparent border-none rounded-md flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-gray-200 hover:text-[#4A4A4A]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Panel Actions */}
          <div className="flex flex-col gap-3 flex-1">
            <button className="w-[34px] h-[34px] bg-transparent border-none rounded-lg flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[#EBFCF4] hover:text-[#0B6333]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="w-[34px] h-[34px] bg-transparent border-none rounded-lg flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[#EBFCF4] hover:text-[#0B6333]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>
            <button className="w-[34px] h-[34px] bg-transparent border-none rounded-lg flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[#EBFCF4] hover:text-[#0B6333]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="w-[34px] h-[34px] bg-transparent border-none rounded-lg flex items-center justify-center cursor-pointer transition-all text-[#5F5F5F] hover:bg-[#EBFCF4] hover:text-[#0B6333]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
