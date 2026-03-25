"use client";

import { FC } from "react";

const NotesGlyph: FC<{ className?: string }> = ({ className }) => (
      <svg
        aria-hidden
        className={className}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
        <path d="M16 7h4" />
        <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
      </svg>
    );

export interface CollectionsCreateNoteFooterButtonProps {
  onClick: () => void;
  noteCount: number;
  className?: string;
}

/** Footer CTA visible without hover — use for Grid / Card / List layouts on touch and desktop. */
export const CollectionsCreateNoteFooterButton: FC<
  CollectionsCreateNoteFooterButtonProps
> = ({ onClick, noteCount, className = "" }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={`Notes, ${noteCount} saved. Open notes list`}
      className={`inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg border border-[rgba(1,104,83,0.2)] bg-[#EBFCF4] px-3 py-2 text-sm font-medium text-[#016853] shadow-sm transition-colors hover:bg-[#D7F7E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#016853] focus-visible:ring-offset-2 ${className}`}
    >
      <NotesGlyph className="h-4 w-4 shrink-0 text-[#089E68]" />
      <span className="tabular-nums text-[#464646]">{noteCount}</span>
      <span className="truncate">Create Note</span>
    </button>
  );
};
