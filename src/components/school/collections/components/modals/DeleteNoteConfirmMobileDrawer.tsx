"use client";

import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

export interface DeleteNoteConfirmMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Runs delete logic; parent should close and reset state after. */
  onConfirm: () => void;
}

export function DeleteNoteConfirmMobileDrawer({
  isOpen,
  onClose,
  onConfirm,
}: DeleteNoteConfirmMobileDrawerProps) {
  return (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Note"
      showPullIndicator
      variant="sheet"
      lockTouchMove={false}
    >
      <div className="flex flex-col gap-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold leading-tight text-[var(--bold-text)]">
            Delete Note
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
        <p className="text-sm leading-relaxed text-[var(--text-default)]">
          Are you sure you want to delete this note? This action cannot be undone.
        </p>
        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-color)] pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="w-full rounded-lg bg-[var(--surface-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--text-default)] transition-colors hover:bg-[var(--hover-bg)] sm:w-auto"
            onClick={onClose}
          >
            No, Keep It
          </button>
          <button
            type="button"
            className="w-full rounded-lg bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </MobileDrawer>
  );
}
