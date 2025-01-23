'use client';

import { FC, useCallback, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface SelectionTooltipProps {
  position: { x: number; y: number } | null;
  onHighlight: () => void;
  onCreateNote: () => void;
  onCopy: () => void;
  onSearch: () => void;
}

const SelectionTooltip: FC<SelectionTooltipProps> = ({ 
  position, 
  onHighlight,
  onCreateNote,
  onCopy,
  onSearch
}) => {
  if (!position) return null;

  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-lg py-2 px-1"
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="flex items-center gap-1">
        <button 
          onClick={onHighlight}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Highlight"
        >
          <Icon name="highlight" size="sm" />
        </button>
        <button 
          onClick={onCreateNote}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Create Note"
        >
          <Icon name="note" size="sm" />
        </button>
        <button 
          onClick={onCopy}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Copy"
        >
          <Icon name="copy" size="sm" />
        </button>
        <button 
          onClick={onSearch}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Search"
        >
          <Icon name="search" size="sm" />
        </button>
      </div>
    </div>
  );
};

interface ArticleContentProps {
  content: string;
}

export const ArticleContent: FC<ArticleContentProps> = ({ content }) => {
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    } else {
      setTooltipPosition(null);
    }
  }, []);

  const handleHighlight = () => {
    // Implement highlight functionality
    console.log('Highlight selected text');
    setTooltipPosition(null);
  };

  const handleCreateNote = () => {
    // Implement note creation
    console.log('Create note from selected text');
    setTooltipPosition(null);
  };

  const handleCopy = () => {
    const selection = window.getSelection();
    if (selection) {
      navigator.clipboard.writeText(selection.toString());
    }
    setTooltipPosition(null);
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Search selected text');
    setTooltipPosition(null);
  };

  return (
    <div className="relative mb-4">
      <div 
        className="prose max-w-none"
        onMouseUp={handleTextSelection}
        onKeyUp={handleTextSelection}
      >
        <p>{content}</p>
      </div>

      <SelectionTooltip 
        position={tooltipPosition}
        onHighlight={handleHighlight}
        onCreateNote={handleCreateNote}
        onCopy={handleCopy}
        onSearch={handleSearch}
      />
    </div>
  );
}; 