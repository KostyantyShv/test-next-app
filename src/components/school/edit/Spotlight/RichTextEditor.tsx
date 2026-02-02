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
  const isInternalUpdate = useRef(false);
  const selectionRef = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== content) {
        editorRef.current.innerHTML = content;
      }
    }
    isInternalUpdate.current = false;
  }, [content]);

  const ensureSelectionInEditor = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = document.getSelection();
    if (!selection) return;

    const anchorNode = selection.anchorNode;
    const isInside =
      anchorNode && (anchorNode === editor || editor.contains(anchorNode));

    if (selection.rangeCount > 0 && isInside) return;

    // Put caret at the end of the editor.
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    selectionRef.current = range.cloneRange();
  };

  const saveSelection = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const anchorNode = selection.anchorNode;
    if (!anchorNode) return;

    // Only save selection if it's inside this editor.
    if (!editor.contains(anchorNode)) return;

    selectionRef.current = range.cloneRange();
  };

  const restoreSelection = () => {
    const selection = document.getSelection();
    if (!selection) return;

    const range = selectionRef.current;
    if (!range) {
      ensureSelectionInEditor();
      return;
    }

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const applyCommand = (command: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    // Ensure we have a valid caret/selection inside the editor, then apply.
    ensureSelectionInEditor();
    restoreSelection();
    editor.focus();

    document.execCommand(command, false, undefined);

    isInternalUpdate.current = true;
    onChange(editor.innerHTML || "");
    saveSelection();
  };

  const makeToolbarHandler =
    (command: string) => (e: React.MouseEvent | React.TouchEvent) => {
      // Prevent focus from moving to the toolbar button (important for execCommand).
      e.preventDefault();
      applyCommand(command);
    };

  return (
    <div
      className="spotlight-richtext border border-theme max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg overflow-hidden"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div
        className="flex p-2 max-md:p-2 border-b border-theme max-md:border-b max-md:border-[#E5E5E5] bg-surface-secondary max-md:bg-[#f8f9fa] overflow-x-auto max-md:overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface-secondary)' }}
      >
        <button
          type="button"
          onMouseDown={makeToolbarHandler("bold")}
          onTouchStart={makeToolbarHandler("bold")}
          className="w-8 h-8 max-md:w-8 max-md:h-8 rounded max-md:rounded flex items-center justify-center flex-shrink-0"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
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
          onMouseDown={makeToolbarHandler("italic")}
          onTouchStart={makeToolbarHandler("italic")}
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
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
          onMouseDown={makeToolbarHandler("underline")}
          onTouchStart={makeToolbarHandler("underline")}
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 21h12v-2H6v2zm6-4c3.3 0 6-2.7 6-6V3h-2.5v8c0 1.9-1.6 3.5-3.5 3.5S8.5 12.9 8.5 11V3H6v8c0 3.3 2.7 6 6 6z"
            />
          </svg>
        </button>
        <div className="w-[1px] h-6 max-md:h-6 mx-2 max-md:mx-2 flex-shrink-0" style={{ backgroundColor: 'var(--border-color)' }} />
        <button
          type="button"
          onMouseDown={makeToolbarHandler("insertUnorderedList")}
          onTouchStart={makeToolbarHandler("insertUnorderedList")}
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
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
          onMouseDown={makeToolbarHandler("insertOrderedList")}
          onTouchStart={makeToolbarHandler("insertOrderedList")}
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
            />
          </svg>
        </button>
        <div className="w-[1px] h-6 max-md:h-6 mx-2 max-md:mx-2 flex-shrink-0" style={{ backgroundColor: 'var(--border-color)' }} />
        <button
          type="button"
          onMouseDown={makeToolbarHandler("justifyLeft")}
          onTouchStart={makeToolbarHandler("justifyLeft")}
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
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
          onMouseDown={makeToolbarHandler("justifyCenter")}
          onTouchStart={makeToolbarHandler("justifyCenter")}
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ color: 'var(--text-default)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
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
        className="spotlight-richtext__content p-3 max-md:p-3 min-h-[200px] max-md:min-h-[120px] max-h-[400px] max-md:max-h-[200px] overflow-y-auto max-md:overflow-y-auto focus:outline-none"
        style={{ 
          color: 'var(--text-default)',
          backgroundColor: 'var(--surface-color)',
          borderColor: 'var(--border-color)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}
        contentEditable
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onTouchEnd={saveSelection}
        onInput={() => {
          if (editorRef.current) {
            isInternalUpdate.current = true;
            onChange(editorRef.current.innerHTML || "");
            saveSelection();
          }
        }}
        onFocus={(e) => {
          saveSelection();
          const container = e.currentTarget.parentElement;
          if (container) {
            (container as HTMLDivElement).style.borderColor = '#02C5AF';
            (container as HTMLDivElement).style.boxShadow = '0 0 0 2px rgba(2, 197, 175, 0.1)';
          }
        }}
        onBlur={(e) => {
          const container = e.currentTarget.parentElement;
          if (container) {
            (container as HTMLDivElement).style.borderColor = 'var(--border-color)';
            (container as HTMLDivElement).style.boxShadow = 'none';
          }
        }}
      />
    </div>
  );
}
