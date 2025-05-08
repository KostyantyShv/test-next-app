"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Question } from "./types/question";

interface QAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: Omit<Question, "id">) => void;
  onDelete: () => void;
  currentQuestion: Question | null;
}

export default function QAModalContent({
  isOpen,
  onClose,
  onSave,
  onDelete,
  currentQuestion,
}: QAModalProps) {
  const [title, setTitle] = useState("");
  const answerEditorRef = useRef<HTMLDivElement>(null);
  const isEdit = !!currentQuestion;

  useEffect(() => {
    if (currentQuestion) {
      setTitle(currentQuestion.title);
      if (answerEditorRef.current) {
        answerEditorRef.current.innerHTML = currentQuestion.answer;
      }
    } else {
      setTitle("");
      if (answerEditorRef.current) {
        answerEditorRef.current.innerHTML = "";
      }
    }
  }, [currentQuestion, isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSave({
      title,
      answer: answerEditorRef.current?.innerHTML || "",
      pinned: currentQuestion?.pinned || false,
    });
  };

  const handleEditorCommand = (command: string) => {
    if (command === "link") {
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false, "");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-[#E5E5E5]">
        <h2 className="text-2xl font-bold text-[#262B3D]">
          {isEdit ? "Edit Question" : "Create Question"}
        </h2>
        <button
          className="p-2 hover:bg-[#E1E7EE] rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          <svg fill="none" viewBox="0 0 12 12" width="12" height="12">
            <path
              fill="#646464"
              d="M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z"
            ></path>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label
            className="block font-semibold text-[#4A4A4A] mb-2 text-sm"
            htmlFor="questionTitle"
          >
            Question
          </label>
          <input
            type="text"
            id="questionTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] bg-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Answer
          </label>
          <div className="flex gap-2 p-2 bg-[#F8F9FA] border border-[#E5E5E5] border-b-0 rounded-t-lg">
            <button
              type="button"
              className="p-1.5 bg-transparent border-none rounded cursor-pointer text-[#4A4A4A] hover:bg-[#EDF2F7]"
              onClick={() => handleEditorCommand("bold")}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              className="p-1.5 bg-transparent border-none rounded cursor-pointer text-[#4A4A4A] hover:bg-[#EDF2F7]"
              onClick={() => handleEditorCommand("italic")}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              className="p-1.5 bg-transparent border-none rounded cursor-pointer text-[#4A4A4A] hover:bg-[#EDF2F7]"
              onClick={() => handleEditorCommand("underline")}
              title="Underline"
            >
              U
            </button>
            <button
              type="button"
              className="p-1.5 bg-transparent border-none rounded cursor-pointer text-[#4A4A4A] hover:bg-[#EDF2F7]"
              onClick={() => handleEditorCommand("link")}
              title="Link"
            >
              🔗
            </button>
          </div>
          <div
            ref={answerEditorRef}
            contentEditable
            className="min-h-[200px] p-3 border border-[#E5E5E5] rounded-b-lg"
          ></div>
        </div>
      </form>
      <div className="flex justify-between items-center p-6 border-t border-[#E5E5E5]">
        {isEdit && (
          <button
            type="button"
            className="flex items-center gap-2 text-[#f93a37] bg-transparent border-none cursor-pointer text-sm"
            onClick={onDelete}
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#f93a37"
                d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            Delete
          </button>
        )}
        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#F8F9FA] border border-[#E5E5E5] text-[#4A4A4A]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="qaForm"
            className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#02C5AF] text-white border-none"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
