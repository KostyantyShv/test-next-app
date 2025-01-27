'use client';

import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { ReportData, ReportModal } from './ReportModal';
import { QASection } from './QASection';
import { useSidebar } from '@/store/use-sidebar';

interface ChapterActionsProps {
  sources: Array<{
    logo: string;
    alt: string;
  }>;
  sourceCount: number;
  highlightCount: number;
  commentCount: number;
}

export const ChapterActions: FC<ChapterActionsProps> = ({
  sources,
  sourceCount,
  highlightCount,
  commentCount
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isQASectionOpen, setIsQASectionOpen] = useState(false);
  const qaButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const openWithTab = useSidebar(state => state.openWithTab);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReport = (data: ReportData) => {
    console.log('Report data:', data);
  };

  const questions = [
    {
      id: '1',
      question: 'What is the main idea behind quantum computing?',
      answer: 'Quantum computing harnesses the principles of quantum mechanics to process information in ways that classical computers cannot, potentially solving complex problems exponentially faster.',
      votes: 116
    },
    {
      id: '2',
      question: 'How does machine learning differ from traditional programming?',
      answer: '...',
      votes: 84
    },
    {
      id: '3',
      question: 'What are the key principles of responsive web design?',
      answer: '...',
      votes: 72
    },
    {
      id: '4',
      question: 'What is the main idea behind quantum computing?',
      answer: 'Quantum computing harnesses the principles of quantum mechanics to process information in ways that classical computers cannot, potentially solving complex problems exponentially faster.',
      votes: 116
    },
    {
      id: '5',
      question: 'How does machine learning differ from traditional programming?',
      answer: '...',
      votes: 84
    },
    {
      id: '6',
      question: 'What are the key principles of responsive web design?',
      answer: '...',
      votes: 72
    },
    {
      id: '7',
      question: 'What is the main idea behind quantum computing?',
      answer: 'Quantum computing harnesses the principles of quantum mechanics to process information in ways that classical computers cannot, potentially solving complex problems exponentially faster.',
      votes: 116
    },
    {
      id: '8',
      question: 'How does machine learning differ from traditional programming?',
      answer: '...',
      votes: 84
    },
    {
      id: '9',
      question: 'What are the key principles of responsive web design?',
      answer: '...',
      votes: 72
    },
  ];

  const handleCommentClick = () => {
    if (window.innerWidth < 768) { // MD breakpoint
      openWithTab('qa');
    } else {
      setIsQASectionOpen(true);
    }
  };

  const handleHighlightClick = () => {
    if (window.innerWidth < 768) { // MD breakpoint
      openWithTab('bigIdeas');
    }
  };

  return (
    <>
      <div className="relative w-full pb-4">
        <div className="absolute inset-0">
          <div className="overflow-x-auto h-full">
            <div className="flex items-center justify-between w-max min-w-full">
              {/* Left side - Sources */}
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-full px-3 py-1.5">
                  <div className="flex -space-x-2 mr-2">
                    {sources.slice(0, 3).map((source, index) => (
                      <div 
                        key={index} 
                        className="w-6 h-6 rounded-full bg-white overflow-hidden ring-2 ring-white"
                      >
                        <Image
                          src={source.logo}
                          alt={source.alt}
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{sourceCount} sources</span>
                </div>

                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <Icon name="link" className="w-5 h-5 text-gray-600" />
                </button>

                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <Icon name="copy" className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Right side - Highlights & Comments */}
              <div className="flex items-center gap-2">
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={handleHighlightClick}
                >
                  <Icon name="highlight" className="w-4 h-4" />
                  <span>{highlightCount}</span>
                </button>

                <button 
                  ref={qaButtonRef}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={handleCommentClick}
                >
                  <Icon name="question-chat" className="w-4 h-4" />
                  <span>{commentCount}</span>
                </button>

                {/* More Menu Button */}
                <div className="relative">
                  <button 
                    ref={buttonRef}
                    className="p-1.5 hover:bg-gray-50 rounded-full transition-colors"
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  >
                    <Icon name="more" className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* More Menu Dropdown */}
                  {isMoreMenuOpen && (
                    <div 
                      ref={menuRef}
                      className="fixed mt-1 py-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-[9999]"
                      style={{
                        top: buttonRef.current?.getBoundingClientRect().bottom ?? 0,
                        left: buttonRef.current?.getBoundingClientRect().right 
                          ? buttonRef.current.getBoundingClientRect().right - 144 // 36px * 4
                          : 0
                      }}
                    >
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => {
                          // Handle create note
                          setIsMoreMenuOpen(false);
                        }}
                      >
                        <Icon name="note" className="w-4 h-4" />
                        Create Note
                      </button>
                      
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => {
                          setIsReportModalOpen(true);
                          setIsMoreMenuOpen(false);
                        }}
                      >
                        <Icon name="flag" className="w-4 h-4" />
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[52px]" aria-hidden="true" />
      </div>

      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReport}
      />

      <QASection 
        isOpen={isQASectionOpen}
        onClose={() => setIsQASectionOpen(false)}
        questions={questions}
        anchorEl={qaButtonRef.current}
      />
    </>
  );
}; 