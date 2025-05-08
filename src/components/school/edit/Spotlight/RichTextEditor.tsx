"use client";

import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleCommand = (command: string) => {
    document.execCommand(command, false, undefined);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
      <div className="flex p-2 border-b border-[#E5E5E5] bg-[#f8f9fa]">
        <button
          type="button"
          onClick={() => handleCommand("bold")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6V4zm0 8h9a4 4 0 014 4 4 4 0 01-4 4H6v-8z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleCommand("italic")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M10 4v2h2.6l-3.2 12H6v2h8v-2h-2.6l3.2-12H18V4h-8z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleCommand("underline")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 21h12v-2H6v2zm6-4c3.3 0 6-2.7 6-6V3h-2.5v8c0 1.9-1.6 3.5-3.5 3.5S8.5 12.9 8.5 11V3H6v8c0 3.3 2.7 6 6 6z"
            />
          </svg>
        </button>
        <div className="w-[1px] h-6 bg-[#E5E5E5] mx-2" />
        <button
          type="button"
          onClick={() => handleCommand("insertUnorderedList")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleCommand("insertOrderedList")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
            />
          </svg>
        </button>
        <div className="w-[1px] h-6 bg-[#E5E5E5] mx-2" />
        <button
          type="button"
          onClick={() => handleCommand("justifyLeft")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleCommand("justifyCenter")}
          className="w-8 h-8 rounded hover:bg-[#e9ecef] flex items-center justify-center"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"
            />
          </svg>
        </button>
      </div>
      <div
        ref={editorRef}
        className="p-3 min-h-[200px] max-h-[400px] overflow-y-auto focus:outline-none"
        contentEditable
        onInput={() => onChange(editorRef.current?.innerHTML || "")}
      />
    </div>
  );
}
