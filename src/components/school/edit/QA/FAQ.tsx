"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import QuestionList from "./QuestionList";
import { Question } from "./types/question";
import QAModal from "./QAModal";

const initialQuestions: Question[] = [
  {
    id: 1,
    title: "What prerequisites are required for this course?",
    answer:
      "Basic understanding of programming concepts and JavaScript fundamentals...",
    pinned: true,
  },
];

const sortQuestions = (questions: Question[]) => {
  return [...questions].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return a.id - b.id;
  });
};

export default function FAQ() {
  const isMobile = useIsMobile();
  const [questions, setQuestions] = useState<Question[]>(sortQuestions(initialQuestions));

  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileEditingQuestionId, setMobileEditingQuestionId] = useState<number | null>(
    null
  );
  const [mobileQuestionTitle, setMobileQuestionTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [draggedQuestionId, setDraggedQuestionId] = useState<number | null>(null);

  const answerEditorRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showMobileToast = (message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 3000);
  };

  const handleTogglePin = (id: number) => {
    setQuestions((prev) => {
      const target = prev.find((q) => q.id === id);
      if (!target) return prev;

      const willPin = !target.pinned;
      const updated = prev.map((q) => {
        if (q.id === id) return { ...q, pinned: willPin };
        if (willPin) return { ...q, pinned: false };
        return q;
      });

      const sorted = sortQuestions(updated);
      if (isMobile) {
        showMobileToast(willPin ? "Question pinned to top" : "Question unpinned");
      }
      return sorted;
    });
  };

  const openMobileDrawerForCreate = () => {
    setMobileEditingQuestionId(null);
    setMobileQuestionTitle("");
    if (answerEditorRef.current) {
      answerEditorRef.current.innerHTML = "";
    }
    setIsMobileDrawerOpen(true);
  };

  const openMobileDrawerForEdit = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;
    setMobileEditingQuestionId(question.id);
    setMobileQuestionTitle(question.title);
    setIsMobileDrawerOpen(true);
    requestAnimationFrame(() => {
      if (answerEditorRef.current) {
        answerEditorRef.current.innerHTML = question.answer;
      }
    });
  };

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
    setMobileEditingQuestionId(null);
    setMobileQuestionTitle("");
    if (answerEditorRef.current) {
      answerEditorRef.current.innerHTML = "";
    }
  };

  const handleDesktopEdit = (id: number) => {
    const questionToEdit = questions.find((q) => q.id === id) || null;
    setCurrentQuestion(questionToEdit);
    setIsDesktopModalOpen(true);
  };

  const handleDesktopAdd = () => {
    setCurrentQuestion(null);
    setIsDesktopModalOpen(true);
  };

  const handleSaveQuestion = (formData: Omit<Question, "id">) => {
    if (currentQuestion) {
      setQuestions((prev) =>
        sortQuestions(
          prev.map((q) => (q.id === currentQuestion.id ? { ...q, ...formData } : q))
        )
      );
    } else {
      const newQuestion: Question = {
        id: Date.now(),
        ...formData,
      };
      setQuestions((prev) => sortQuestions([...prev, newQuestion]));
    }

    setIsDesktopModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleDeleteDesktopQuestion = () => {
    if (!currentQuestion) return;
    setQuestions((prev) => prev.filter((q) => q.id !== currentQuestion.id));
    setIsDesktopModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleSaveMobileQuestion = (e: FormEvent) => {
    e.preventDefault();

    const title = mobileQuestionTitle.trim();
    const answer = answerEditorRef.current?.innerHTML.trim() || "";
    if (!title) {
      showMobileToast("Please enter a question title");
      return;
    }

    if (mobileEditingQuestionId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === mobileEditingQuestionId ? { ...q, title, answer } : q
        )
      );
      showMobileToast("Question updated successfully");
    } else {
      const newQuestion: Question = {
        id: Date.now(),
        title,
        answer,
        pinned: false,
      };
      setQuestions((prev) => [...prev, newQuestion]);
      showMobileToast("Question added successfully");
    }

    closeMobileDrawer();
  };

  const handleDeleteMobileQuestion = () => {
    if (!mobileEditingQuestionId) return;
    setQuestions((prev) => prev.filter((q) => q.id !== mobileEditingQuestionId));
    closeMobileDrawer();
    showMobileToast("Question deleted successfully");
  };

  const handleMobileEditorCommand = (command: "bold" | "italic" | "underline" | "link") => {
    const editor = answerEditorRef.current;
    if (!editor) return;
    editor.focus();

    if (command === "link") {
      const url = window.prompt("Enter URL:");
      if (!url) return;
      document.execCommand("createLink", false, url);
      return;
    }

    document.execCommand(command, false);
  };

  const reorderMobileQuestions = (dragId: number, targetId: number) => {
    if (dragId === targetId) return;
    setQuestions((prev) => {
      const dragIndex = prev.findIndex((q) => q.id === dragId);
      const targetIndex = prev.findIndex((q) => q.id === targetId);
      if (dragIndex === -1 || targetIndex === -1) return prev;

      const next = [...prev];
      const [dragged] = next.splice(dragIndex, 1);
      next.splice(targetIndex, 0, dragged);
      return next;
    });
  };

  const mobileEditingQuestion = mobileEditingQuestionId
    ? questions.find((q) => q.id === mobileEditingQuestionId) || null
    : null;

  return (
    <>
      <div className="hidden md:flex faq-container mx-auto gap-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <div className="max-w-[350px] pr-6">
          <h1 className="mb-3 text-2xl font-semibold text-[#1A1A1A]">FAQ</h1>
          <p className="w-[350px] text-base leading-relaxed text-[#5F5F5F]">
            Add frequently asked questions and their answers to help students
            better understand your school.
          </p>
        </div>

        <div className="faq-right w-full rounded-lg bg-white p-6 shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)]">
          <QuestionList
            questions={questions}
            onTogglePin={handleTogglePin}
            onEdit={handleDesktopEdit}
            onAddQuestion={handleDesktopAdd}
          />
        </div>
      </div>

      <div
        className="md:hidden"
        style={{
          backgroundColor: "var(--background-color)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div className="p-4">
          <div className="mb-4">
            <h1 className="mb-2 text-2xl font-semibold text-[#1A1A1A]">FAQ</h1>
            <p className="text-sm text-[#5F5F5F]">
              Add frequently asked questions and their answers to help students
              better understand your school.
            </p>
          </div>

          <div
            className="flex flex-col rounded-lg bg-white p-4"
            style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="mb-4 flex-1">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`mb-3 flex items-center rounded-lg p-4 ${
                    question.pinned
                      ? "border border-[#D7F7E9] bg-[#EBFCF4]"
                      : "bg-[#F8F9FA]"
                  } ${draggedQuestionId === question.id ? "opacity-50" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!draggedQuestionId) return;
                    reorderMobileQuestions(draggedQuestionId, question.id);
                  }}
                >
                  <button
                    type="button"
                    draggable
                    onDragStart={() => setDraggedQuestionId(question.id)}
                    onDragEnd={() => {
                      setDraggedQuestionId(null);
                      showMobileToast("Question order updated");
                    }}
                    className="mr-3 flex cursor-grab flex-col justify-center"
                    style={{ touchAction: "none" }}
                    aria-label="Reorder question"
                  >
                    <span className="grid h-[14px] w-[14px] grid-cols-2 grid-rows-3 gap-[2px]">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={`${question.id}-dot-${index}`}
                          className="h-[3px] w-[3px] rounded-full bg-[#5F5F5F]"
                        />
                      ))}
                    </span>
                  </button>

                  <div className="flex-1 text-sm font-semibold text-[#1B1B1B]">
                    {question.title}
                  </div>

                  <div className="ml-auto flex gap-2">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white"
                      onClick={() => handleTogglePin(question.id)}
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-[#5F5F5F]">
                        <path
                          d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.5 12.5L3.75 16.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12.084 3.33398L16.6673 7.91732"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white"
                      onClick={() => openMobileDrawerForEdit(question.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 text-[#5F5F5F]">
                        <path
                          fill="currentColor"
                          d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={openMobileDrawerForCreate}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1B1B1B] px-4 py-3 text-sm font-medium text-white"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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
        </div>
      </div>

      {isMobileDrawerOpen && (
        <>
          <div
            className={`fixed inset-0 z-[1000] bg-black/50 transition-opacity duration-300 ${
              isMobileDrawerOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
            onClick={closeMobileDrawer}
          />
          <div
            className={`fixed bottom-0 left-1/2 z-[1001] flex max-h-[90%] w-full max-w-[358px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
              isMobileDrawerOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-[#E5E5E5] bg-white px-5 py-4">
              <h2 className="text-lg font-semibold text-[#464646]">
                {mobileEditingQuestion ? "Edit Question" : "Create Question"}
              </h2>
              <button
                type="button"
                onClick={closeMobileDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#5F5F5F]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"></line>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveMobileQuestion} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="mb-4">
                  <label htmlFor="mobileQuestionTitle" className="mb-2 block text-sm font-semibold text-[#4A4A4A]">
                    Question
                  </label>
                  <input
                    id="mobileQuestionTitle"
                    type="text"
                    value={mobileQuestionTitle}
                    onChange={(e) => setMobileQuestionTitle(e.target.value)}
                    placeholder="Enter question title"
                    required
                    className="w-full rounded-lg border border-[#E5E5E5] px-3 py-3 text-sm text-[#4A4A4A] outline-none focus:border-[#02C5AF]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#4A4A4A]">Answer</label>
                  <div className="flex gap-2 rounded-t-lg border border-b-0 border-[#E5E5E5] bg-[#F8F9FA] p-2">
                    <button type="button" className="rounded p-1.5 text-[#4A4A4A]" onMouseDown={(e) => { e.preventDefault(); handleMobileEditorCommand("bold"); }}>B</button>
                    <button type="button" className="rounded p-1.5 text-[#4A4A4A]" onMouseDown={(e) => { e.preventDefault(); handleMobileEditorCommand("italic"); }}>I</button>
                    <button type="button" className="rounded p-1.5 text-[#4A4A4A]" onMouseDown={(e) => { e.preventDefault(); handleMobileEditorCommand("underline"); }}>U</button>
                    <button type="button" className="rounded p-1.5 text-[#4A4A4A]" onMouseDown={(e) => { e.preventDefault(); handleMobileEditorCommand("link"); }}>🔗</button>
                  </div>
                  <div
                    ref={answerEditorRef}
                    contentEditable
                    className="min-h-[180px] rounded-b-lg border border-[#E5E5E5] p-3 text-sm text-[#4A4A4A] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#E5E5E5] bg-white px-5 py-4">
                <button
                  type="button"
                  onClick={handleDeleteMobileQuestion}
                  className={`flex items-center gap-2 text-sm ${mobileEditingQuestion ? "visible text-[#f93a37]" : "invisible"}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      fill="#f93a37"
                      d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
                    ></path>
                  </svg>
                  Delete
                </button>
                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    onClick={closeMobileDrawer}
                    className="rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] px-4 py-3 text-sm font-semibold text-[#4A4A4A]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#02C5AF] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-[2000] w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[#EBFCF4] px-4 py-3 text-center text-sm text-[#0B6333] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
        }`}
      >
        {toastMessage}
      </div>

      <QAModal
        isOpen={!isMobile && isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
        onSave={handleSaveQuestion}
        onDelete={handleDeleteDesktopQuestion}
        currentQuestion={currentQuestion}
      />
    </>
  );
}
