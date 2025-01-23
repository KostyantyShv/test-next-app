'use client';

import { FC, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface Question {
  id: string;
  question: string;
  answer: string;
  votes: number;
  rating?: {
    upvoted?: boolean;
    downvoted?: boolean;
  };
}

interface QASectionProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
}

export const QASection: FC<QASectionProps> = ({ isOpen, onClose, questions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [questionsState, setQuestionsState] = useState(questions.map(q => ({
    ...q,
    rating: q.rating || { upvoted: false, downvoted: false }
  })));

  if (!isOpen) return null;

  const handleVote = (questionId: string, voteType: 'up' | 'down') => {
    setQuestionsState(prev => prev.map(q => {
      if (q.id !== questionId) return q;
      
      const newRating = { ...q.rating };
      if (voteType === 'up') {
        if (newRating.upvoted) {
          newRating.upvoted = false;
        } else {
          newRating.upvoted = true;
          newRating.downvoted = false;
        }
      } else {
        if (newRating.downvoted) {
          newRating.downvoted = false;
        } else {
          newRating.downvoted = true;
          newRating.upvoted = false;
        }
      }
      
      return { ...q, rating: newRating };
    }));
  };

  return (
    <div className="absolute right-0 top-full mt-2 z-50">
      <div className="w-[400px] bg-white shadow-xl border border-gray-200 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Icon name="question-chat" className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Q&A</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="text-primary hover:text-primary/90 text-sm font-medium"
              onClick={() => {/* Handle View All */}}
            >
              View All
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon name="close" className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="overflow-y-auto h-[40vh]">
          {questionsState.map((question) => (
            <div 
              key={question.id}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name="question-chat"
                    size="sm"
                    className="shrink-0 text-primary mt-0.5" 
                  />
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-gray-800 font-medium">
                        {question.question}
                      </h3>
                      <Icon 
                        name={expandedId === question.id ? 'chevron-up' : 'chevron-down'} 
                        className="w-5 h-5 text-gray-400 ml-4" 
                      />
                    </div>
                    {expandedId === question.id && (
                      <p className="mt-2 text-gray-600">
                        {question.answer}
                      </p>
                    )}
                    <div className="flex justify-end mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(question.id, 'up');
                          }}
                          className={`p-1 rounded hover:bg-gray-100 ${
                            question.rating.upvoted ? 'text-primary' : 'text-gray-500'
                          }`}
                        >
                          <Icon name="arrow-up" className="w-4 h-4" />
                        </button>
                        <span className="text-gray-700 min-w-[2ch] text-center">
                          {question.votes}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(question.id, 'down');
                          }}
                          className={`p-1 rounded hover:bg-gray-100 ${
                            question.rating.downvoted ? 'text-primary' : 'text-gray-500'
                          }`}
                        >
                          <Icon name="arrow-down" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 