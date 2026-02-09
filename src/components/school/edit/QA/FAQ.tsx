"use client";

import { useState } from "react";
import QuestionList from "./QuestionList";
import { Question } from "./types/question";
import QAModal from "./QAModal";

export default function FAQ() {
  // Sample initial data
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: "What prerequisites are required for this course?",
      answer:
        "Basic understanding of programming concepts and JavaScript fundamentals...",
      pinned: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const handleTogglePin = (id: number) => {
    setQuestions((prev) => {
      const updated = prev.map((q) => {
        // Unpin all other questions
        if (q.id !== id) {
          return { ...q, pinned: false };
        }
        // Toggle the pin status of the selected question
        return { ...q, pinned: !q.pinned };
      });
      // Sort: pinned items first, then by id
      return updated.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return a.id - b.id;
      });
    });
  };

  const handleEditQuestion = (id: number) => {
    const questionToEdit = questions.find((q) => q.id === id) || null;
    setCurrentQuestion(questionToEdit);
    setIsModalOpen(true);
  };

  const handleAddQuestion = () => {
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (formData: Omit<Question, "id">) => {
    if (currentQuestion) {
      // Update existing question
      setQuestions(
        questions.map((q) =>
          q.id === currentQuestion.id ? { ...q, ...formData } : q
        )
      );
    } else {
      // Add new question
      const newQuestion: Question = {
        id: Date.now(),
        ...formData,
      };
      setQuestions([...questions, newQuestion]);
    }

    setIsModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleDeleteQuestion = () => {
    if (currentQuestion) {
      setQuestions(questions.filter((q) => q.id !== currentQuestion.id));
      setIsModalOpen(false);
      setCurrentQuestion(null);
    }
  };

  return (
    <>
      <div className="faq-container mx-auto flex gap-6 max-md:flex-col max-md:px-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        {/* Desktop Header */}
        <div className="max-w-[350px] max-md:hidden pr-6">
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>FAQ</h1>
          <p className="text-base text-[#5F5F5F] leading-relaxed w-[350px]">
            Add frequently asked questions and their answers to help students
            better understand your school.
          </p>
        </div>
        
        {/* Mobile Header */}
        <div className="faq-left hidden max-md:block pt-[18px] pb-4">
          <h1 className="section-title text-2xl font-semibold mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: 'var(--bold-text)' }}>
            FAQ
          </h1>
          <p className="section-description text-sm leading-6" style={{ color: 'var(--subtle-text)' }}>
            Add frequently asked questions and their answers to help students
            better understand your school.
          </p>
        </div>

        <div className="faq-right w-full bg-white max-md:bg-white rounded-lg max-md:rounded-lg shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)] max-md:shadow-none p-6 max-md:p-4">
          <QuestionList
            questions={questions}
            onTogglePin={handleTogglePin}
            onEdit={handleEditQuestion}
            onAddQuestion={handleAddQuestion}
          />
        </div>
      </div>
      <QAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuestion}
        onDelete={handleDeleteQuestion}
        currentQuestion={currentQuestion}
      />
    </>
  );
}
