"use client";

import React, { useEffect, useState } from "react";
import { CollectionsSchool, Note } from "../Card/Card";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: CollectionsSchool;
  index: number;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
  onCreateNote: (index: number) => void;
}

const NotesListBody: React.FC<{
  school: CollectionsSchool;
  index: number;
  onClose: () => void;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
  onCreateNote: (index: number) => void;
}> = ({ school, index, onClose, onEditNote, onDeleteNote, onCreateNote }) => {
  const notes = school.notes ?? [];
  const handleEdit = (noteId: number) => {
    onClose();
    onEditNote(index, noteId);
  };

  const handleDelete = (noteId: number) => {
    onClose();
    onDeleteNote(index, noteId);
  };

  return (
  <>
    <div className="min-h-0 flex-1 overflow-y-auto pr-1 max-h-[min(60vh,520px)] md:mb-5 md:max-h-[60vh] md:pr-2 scrollbar-thin scrollbar-track-[#F0F2F5] scrollbar-thumb-[#CED4DA] hover:scrollbar-thumb-[#ADB5BD] scrollbar-thumb-rounded">
      {notes.length === 0 ? (
        <div className="px-2 py-8 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4 h-20 w-20 text-[#E5E7EB]"
          >
            <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          <p className="mb-6 text-[15px] text-[#9CA3AF]">
            No notes yet. Tap Create Note to add one.
          </p>
        </div>
      ) : (
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onEdit={() => handleEdit(note.id)}
            onDelete={() => handleDelete(note.id)}
          />
        ))
      )}
    </div>

    <button
      type="button"
      onClick={() => {
        onClose();
        onCreateNote(index);
      }}
      className="mt-auto flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border-none bg-[#EBFCF4] p-3 text-[15px] font-medium text-[#016853] shadow-[0_2px_4px_rgba(1,104,83,0.1)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#D7F7E9]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#016853]"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      Create Note
    </button>
  </>
);
};

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  school,
  index,
  onCreateNote,
  onDeleteNote,
  onEditNote,
}) => {
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const noteCount = school.notes?.length ?? 0;

  if (!isOpen) return null;

  const headerTitle = (
    <h3 className="flex items-center gap-2 text-xl font-semibold text-[#016853]">
      <svg
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        className="h-5 w-5"
      >
        <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
        <path d="M16 7h4" />
        <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
      </svg>
      Notes
      {noteCount > 0 && (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#00DF8B] text-xs font-semibold text-white">
          {noteCount}
        </span>
      )}
    </h3>
  );

  return (
    <>
      {isDesktopViewport ? (
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <div className="flex max-h-[85vh] w-full max-w-[550px] flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
            <div className="mb-5 flex items-center justify-between border-b border-[#EFF2F7] pb-4">
              {headerTitle}
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#5F5F5F] transition-all duration-200 ease-in-out hover:bg-[#F5F5F7] hover:text-[#1B1B1B]"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
            <NotesListBody
              school={school}
              index={index}
              onClose={onClose}
              onCreateNote={onCreateNote}
              onDeleteNote={onDeleteNote}
              onEditNote={onEditNote}
            />
          </div>
        </DesktopModal>
      ) : (
        <MobileDrawer isOpen={isOpen} onClose={onClose} title="Notes">
          <div className="flex max-h-[min(85dvh,800px)] flex-col gap-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-1">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
              <div className="min-w-0 flex-1 text-[var(--bold-text)]">{headerTitle}</div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--subtle-text)] transition-colors hover:bg-[var(--hover-bg)]"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
            <NotesListBody
              school={school}
              index={index}
              onClose={onClose}
              onCreateNote={onCreateNote}
              onDeleteNote={onDeleteNote}
              onEditNote={onEditNote}
            />
          </div>
        </MobileDrawer>
      )}
    </>
  );
};
