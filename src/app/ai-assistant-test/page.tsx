'use client';

import React, { useState } from 'react';
import { AIAssistantPlatform } from '@/components/ui/AIAssistantPlatform';

export default function AIAssistantTestPage() {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E1E7EE] p-8">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#464646]">AI Assistant Platform Test</h1>
          <button
            onClick={() => setIsAIPanelOpen(true)}
            className="px-6 py-3 bg-[#1D77BD] text-white rounded-lg hover:bg-[#1565c0] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Open AI Panel
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-[#464646] mb-4">Welcome to AI Assistant Test Page</h2>
          <p className="text-[#4A4A4A] mb-6">
            This is a test page for the AI Assistant Platform component. Click the button above to open the AI panel.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#EBFCF4] p-6 rounded-lg border border-[#00DF8B]">
              <h3 className="font-semibold text-[#0B6333] mb-2">Features</h3>
              <ul className="text-sm text-[#4A4A4A] space-y-1">
                <li>• Chat interface with AI</li>
                <li>• Context pills for collections</li>
                <li>• Prompt suggestions</li>
                <li>• Expandable panel</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            
            <div className="bg-[#FEF3E2] p-6 rounded-lg border border-[#F59E0B]">
              <h3 className="font-semibold text-[#B45309] mb-2">How to Test</h3>
              <ol className="text-sm text-[#4A4A4A] space-y-1">
                <li>1. Click &quot;Open AI Panel&quot; button</li>
                <li>2. Try typing in the chat input</li>
                <li>3. Test the prompt pills</li>
                <li>4. Use the right sidebar controls</li>
                <li>5. Click outside to close</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Panel */}
      <AIAssistantPlatform 
        isOpen={isAIPanelOpen} 
        onClose={() => setIsAIPanelOpen(false)} 
      />
    </div>
  );
}
