'use client';

import { FC } from 'react';
import { TextSelectionTooltip } from './TextSelectionTooltip';

interface ArticleContentProps {
  content: string;
}

export const ArticleContent: FC<ArticleContentProps> = ({ content }) => {
  const handleHighlight = (text: string) => {
    console.log('Highlight:', text);
  };

  const handleCreateHighlighter = (text: string) => {
    console.log('Create Highlighter:', text);
  };

  const handleCreateNote = (text: string) => {
    console.log('Create Note:', text);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSearch = (text: string, type: 'punchline' | 'google' | 'perplexity') => {
    console.log('Search:', type, text);
    
    // Implement different search behaviors based on type
    switch (type) {
      case 'punchline':
        // Search within your app
        break;
      case 'google':
        window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'perplexity':
        window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(text)}`, '_blank');
        break;
    }
  };

  const handlePostToX = (text: string) => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="relative mb-4">
      <div className="prose max-w-none">
        <p>{content}</p>
      </div>

      <TextSelectionTooltip
        onHighlight={handleHighlight}
        onCreateHighlighter={handleCreateHighlighter}
        onCreateNote={handleCreateNote}
        onCopyText={handleCopyText}
        onSearch={handleSearch}
        onPostToX={handlePostToX}
      />
    </div>
  );
}; 