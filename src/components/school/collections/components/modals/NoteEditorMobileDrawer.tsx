"use client";

import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

export interface NoteEditorMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  noteText: string;
  onChange: (text: string) => void;
  onSave: () => void;
}

export function NoteEditorMobileDrawer({
  isOpen,
  onClose,
  title,
  noteText,
  onChange,
  onSave,
}: NoteEditorMobileDrawerProps) {
  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold leading-tight text-[var(--bold-text)]">
            {title}
          </h2>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--subtle-text)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-default)]"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <textarea
          className="min-h-[140px] w-full resize-y rounded-lg border border-[var(--border-color)] bg-[var(--surface-secondary)] p-3 font-sans text-sm text-[var(--text-default)] placeholder:text-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--header-green)]"
          placeholder="Enter your note here..."
          value={noteText}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex justify-end gap-3 border-t border-[var(--border-color)] pt-4">
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--text-default)] transition-colors hover:bg-[var(--hover-bg)]"
            style={{ backgroundColor: "var(--gray-100)" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--btn-primary-bg)" }}
            onClick={onSave}
          >
            Save Note
          </button>
        </div>
      </div>
    </MobileDrawer>
  );
}
