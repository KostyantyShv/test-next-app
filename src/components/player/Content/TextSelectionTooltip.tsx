'use client';

import { FC, useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface TooltipPosition {
  x: number;
  y: number;
}

interface TextSelectionTooltipProps {
  onHighlight?: (text: string) => void;
  onCreateHighlighter?: (text: string) => void;
  onCreateNote?: (text: string) => void;
  onCopyText?: (text: string) => void;
  onSearch?: (text: string, type: 'punchline' | 'google' | 'perplexity') => void;
  onPostToX?: (text: string) => void;
}

export const TextSelectionTooltip: FC<TextSelectionTooltipProps> = ({
  onHighlight,
  onCreateHighlighter,
  onCreateNote,
  onCopyText,
  onSearch,
  onPostToX
}) => {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setPosition({
            x: rect.x + (rect.width / 2),
            y: rect.y - 10
          });
        }
      } else {
        setSelectedText('');
        setPosition(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  if (!position || !selectedText) return null;

  return (
    <div 
      className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
      style={{ left: position.x, top: position.y }}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
        <div className="flex flex-col">
          <button 
            onClick={() => onHighlight?.(selectedText)}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="highlight" className="w-4 h-4" />
            Highlight
          </button>
          
          <button 
            onClick={() => onCreateHighlighter?.(selectedText)}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="plus" className="w-4 h-4" />
            Create Highlighter
          </button>
          
          <button 
            onClick={() => onCreateNote?.(selectedText)}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="note" className="w-4 h-4" />
            Create Note
          </button>
          
          <button 
            onClick={() => onCopyText?.(selectedText)}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="copy" className="w-4 h-4" />
            Copy Text
          </button>
          
          <div className="h-px bg-gray-200 my-1" />
          
          <button 
            onClick={() => onSearch?.(selectedText, 'punchline')}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="search" className="w-4 h-4" />
            Search PunchLine
          </button>
          
          <button 
            onClick={() => onSearch?.(selectedText, 'google')}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="google" className="w-4 h-4" />
            Search Google
          </button>
          
          <button 
            onClick={() => onSearch?.(selectedText, 'perplexity')}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="perplexity" className="w-4 h-4" />
            Search Perplexity
          </button>
          
          <button 
            onClick={() => onPostToX?.(selectedText)}
            className="flex items-center gap-3 px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Icon name="twitter" className="w-4 h-4" />
            Post to X (8 chars)
          </button>
        </div>
      </div>
    </div>
  );
}; 