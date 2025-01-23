'use client';

import { FC, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  answer?: string;
}

interface QuestionsListProps {
  questions: Question[];
}

export const QuestionsList: FC<QuestionsListProps> = ({ questions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon 
            name="question-chat" 
            size="sm"
            className="text-primary"
          />
        </div>
        <h2 className="font-medium">Questions</h2>
      </div>

      {/* Questions List */}
      <div className="space-y-0">
        {questions.map((question) => (
          <div 
            key={question.id}
            className="border-t border-gray-200"
          >
            <button 
              onClick={() => toggleQuestion(question.id)}
              className="w-full py-4 text-left flex items-center justify-between group"
            >
              <span className="text-gray-700 group-hover:text-gray-900">
                {question.text}
              </span>
              <Icon 
                name={expandedId === question.id ? "chevron-up" : "chevron-down"} 
                size="sm"
                className={cn(
                  "text-gray-400 transition-transform",
                  expandedId === question.id && "transform rotate-180"
                )}
              />
            </button>
            
            {expandedId === question.id && question.answer && (
              <div className="pb-2">
                <p className="text-gray-600">{question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 