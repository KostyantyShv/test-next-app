"use client";

import React, { useState, useEffect } from "react";
import { CollectionsSchool, Note } from "../Card/Card";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: CollectionsSchool;
  index: number;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
  onCreateNote: (index: number) => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  school,
  index,
  onCreateNote,
  onDeleteNote,
  onEditNote,
}) => {
  const updateNoteCounts = () => school.notes.length;

  const noteCount = updateNoteCounts();

  return (
    <DesktopModal isOpen={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] opacity-100 visible transition-all duration-300 ease-in-out"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="w-full max-w-[550px] max-h-[85vh] bg-white rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#EFF2F7]">
            <h3 className="text-xl font-semibold text-[#016853] flex items-center gap-2">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
                <path d="M16 7h4"></path>
                <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3"></path>
              </svg>
              Notes
              {noteCount > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#00DF8B] text-white text-xs font-semibold rounded-full">
                  {noteCount}
                </span>
              )}
            </h3>
            <div
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-all duration-200 ease-in-out hover:bg-[#F5F5F7] hover:text-[#1B1B1B]"
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
            </div>
          </div>

          <div className="overflow-y-auto flex-grow mb-5 pr-2 max-h-[60vh] scrollbar-thin scrollbar-track-[#F0F2F5] scrollbar-thumb-[#CED4DA] hover:scrollbar-thumb-[#ADB5BD] scrollbar-thumb-rounded">
            {school.notes.length === 0 ? (
              <div className="text-center py-8 px-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-20 h-20 text-[#E5E7EB] mb-4 mx-auto"
                >
                  <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <p className="text-[15px] text-[#9CA3AF] mb-6">
                  No notes yet. Click `Create Note` to add one.
                </p>
              </div>
            ) : (
              school.notes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  onEdit={() => onEditNote(index, note.id)}
                  onDelete={() => onDeleteNote(index, note.id)}
                />
              ))
            )}
          </div>

          <button
            onClick={() => onCreateNote(index)}
            className="p-3 bg-[#EBFCF4] text-[#016853] border-none rounded-lg cursor-pointer font-medium text-[15px] flex items-center gap-2 justify-center mt-auto transition-all duration-200 ease-in-out shadow-[0_2px_4px_rgba(1,104,83,0.1)] hover:bg-[#D7F7E9] hover:-translate-y-0.5"
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
        </div>
      </div>
    </DesktopModal>
  );
};
