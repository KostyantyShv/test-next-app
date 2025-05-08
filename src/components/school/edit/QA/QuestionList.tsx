"use client";

import QuestionItem from "./QuestionItem";
import { Question } from "./types/question";

interface QuestionListProps {
  questions: Question[];
  onTogglePin: (id: number) => void;
  onEdit: (id: number) => void;
  onAddQuestion: () => void;
}

export default function QuestionList({
  questions,
  onTogglePin,
  onEdit,
  onAddQuestion,
}: QuestionListProps) {
  return (
    <div>
      <div className="mt-6">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onTogglePin={onTogglePin}
            onEdit={onEdit}
          />
        ))}
      </div>

      <button
        className="inline-flex max-md:w-full justify-center items-center gap-2 px-5 py-3 mt-4 bg-[#1B1B1B] text-white border-none rounded-md text-base font-medium cursor-pointer transition-all duration-200 hover:bg-[#2D2D2D]"
        onClick={onAddQuestion}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4V16M4 10H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Add Question
      </button>
    </div>
  );
}
