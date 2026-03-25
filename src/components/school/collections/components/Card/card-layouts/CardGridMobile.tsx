import React, { useEffect, useMemo, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { CollectionImage } from "../CollectionImage";
import { CollectionsSchool, Note, RatingCheckmarks, truncateText } from "../Card";
import { SchoolCardContextMenu } from "../../../../explore/SchoolCardContextMenu";
import { NoteEditorMobileDrawer } from "../../modals/NoteEditorMobileDrawer";
import { DeleteNoteConfirmMobileDrawer } from "../../modals/DeleteNoteConfirmMobileDrawer";
import { MetaClockIcon, MetaStarIcon } from "./MetaIcons";

interface CardGridMobileProps {
  school: CollectionsSchool;
  index: number;
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNoteDirect: (index: number, text: string) => void;
  onEditNoteDirect: (index: number, noteId: number, text: string) => void;
  onDeleteNoteDirect: (index: number, noteId: number) => void;
}

const STATUS_OPTIONS = [
  { value: "Researching", cls: "researching", color: "#395da0" },
  { value: "Scheduled Tour", cls: "scheduled-tour", color: "#008ac2" },
  { value: "Visited Campus", cls: "visited-campus", color: "#00817c" },
  { value: "Started Application", cls: "started-application", color: "#009666" },
  { value: "Applied", cls: "applied", color: "#068c2e" },
  { value: "Accepted", cls: "accepted", color: "#4f8a2a" },
  { value: "Enrolled", cls: "enrolled", color: "#e27800" },
  { value: "", cls: "add-status", color: "#787878", label: "Clear Status" },
] as const;

const specialtyIcon = (type?: string) => {
  if (type === "hot") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path
          d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (type === "instant-book") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path
          d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (type === "sponsored") {
    return (
      <svg width="16" height="16" viewBox="0 0 20 20">
        <path
          d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return null;
};

const statusClassName = (status: string) =>
  status ? status.toLowerCase().replace(/\s+/g, "-") : "add-status";

const formatSchoolTypeLabel = (label: string): string => {
  if (!label) return "";
  return label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

export const CardGridMobile: React.FC<CardGridMobileProps> = ({
  school,
  index,
  onRatingChange,
  onStatusChange,
  onCreateNoteDirect,
  onEditNoteDirect,
  onDeleteNoteDirect,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerStatusOpen, setIsDrawerStatusOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
  const drawerStatusRef = useRef<HTMLDivElement | null>(null);

  useBodyScrollLock(isDrawerOpen || isNoteModalOpen || isDeleteModalOpen);

  const specialtyText = useMemo(() => {
    if (school.specialty === "hot") return "High demand";
    if (school.specialty === "instant-book") return "Instant book";
    if (school.specialty === "sponsored") return "Sponsored";
    return "";
  }, [school.specialty]);

  const openCreateNote = () => {
    setIsDrawerOpen(false);
    setIsDrawerStatusOpen(false);
    setEditingNoteId(null);
    setNoteText("");
    setIsNoteModalOpen(true);
  };

  const openEditNote = (note: Note) => {
    setIsDrawerOpen(false);
    setIsDrawerStatusOpen(false);
    setEditingNoteId(note.id);
    setNoteText(note.content);
    setIsNoteModalOpen(true);
  };

  const openDeleteNote = (noteId: number) => {
    setIsDrawerOpen(false);
    setIsDrawerStatusOpen(false);
    setDeletingNoteId(noteId);
    setIsDeleteModalOpen(true);
  };

  const closeNotesDrawer = () => {
    setIsDrawerOpen(false);
    setIsDrawerStatusOpen(false);
  };

  const toggleNotesDrawer = () => {
    setIsDrawerOpen((open) => {
      if (open) {
        setIsDrawerStatusOpen(false);
      }
      return !open;
    });
  };

  const saveNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;

    if (editingNoteId === null) {
      onCreateNoteDirect(index, trimmed);
    } else {
      onEditNoteDirect(index, editingNoteId, trimmed);
    }

    setIsNoteModalOpen(false);
    setNoteText("");
    setEditingNoteId(null);
  };

  const displayDate = school.dateAdded || school.dateSaved;

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (drawerStatusRef.current && !drawerStatusRef.current.contains(target)) {
        setIsDrawerStatusOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) {
      setIsDrawerStatusOpen(false);
    }
  }, [isDrawerOpen]);

  return (
    <>
      <article className="collections-grid-mobile-card school-card relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative h-[140px] w-full bg-[#E8EAED]">
          <CollectionImage
            src={school.image}
            alt={school.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          {school.specialty ? (
            <div
              className={`absolute left-2 top-2 z-[5] flex max-w-[min(100%,220px)] items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold shadow-md backdrop-blur-sm ${
                school.specialty === "hot"
                  ? "bg-white/95 text-[#FF4D4D]"
                  : school.specialty === "instant-book"
                    ? "bg-white/95 text-[#1D77BD]"
                    : "bg-white/95 text-[#FF9900]"
              }`}
            >
              {specialtyIcon(school.specialty)}
              <span className="truncate">{specialtyText}</span>
            </div>
          ) : null}
          <div className="absolute right-2 top-2 z-[5]" onClick={(e) => e.stopPropagation()}>
            <SchoolCardContextMenu
              schoolName={school.name}
              buttonClassName="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-0 bg-white/95 p-0 text-[#464646] shadow-md backdrop-blur-sm"
              iconClassName="h-4 w-4 rotate-90 fill-current text-current"
            />
          </div>
        </div>

        <div className="p-4">
          {school.ranking ? (
            <p className="mb-1.5 line-clamp-2 text-xs font-medium text-[#089E68]">
              {truncateText(school.ranking, 52)}
            </p>
          ) : null}
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-[#464646]">{school.name}</h3>
          {school.schoolType ? (
            <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.02em] text-[#787878]">
              {formatSchoolTypeLabel(school.schoolType)}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px]">
            <span className="inline-flex min-w-0 max-w-full items-center gap-1.5 font-medium text-[#464646]">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#565656]" aria-hidden>
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z" />
              </svg>
              <span className="min-w-0 break-words">{school.location}</span>
            </span>
            <span className="inline-flex min-w-0 items-center gap-1 font-semibold text-[#464646]">
              <MetaStarIcon className="h-3.5 w-3.5 shrink-0 text-[#565656]" />
              <span className="min-w-0">{school.rating}</span>
            </span>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <RatingCheckmarks
            rating={school.myRating}
            onRatingChange={(rating) => onRatingChange(index, rating)}
          />
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#5F5F5F]"
            aria-expanded={isDrawerOpen}
            aria-label={
              isDrawerOpen ? `Hide notes for ${school.name}` : `Show notes for ${school.name}`
            }
            onClick={(e) => {
              e.stopPropagation();
              toggleNotesDrawer();
            }}
          >
            <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" className="h-4 w-4 text-[#089E68]" aria-hidden>
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
              <path d="M16 7h4" />
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
            </svg>
            <span>{school.notes?.length || 0}</span>
          </button>
        </footer>
      </article>

      <div
        className={`fixed inset-0 z-[3100] bg-black/50 transition-opacity md:hidden ${
          isDrawerOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        onClick={closeNotesDrawer}
        aria-hidden={!isDrawerOpen}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[3200] flex max-h-[85dvh] w-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out md:hidden ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto my-3 h-[5px] w-10 rounded-[2.5px] bg-[#E5E7EB]" />
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 pb-4">
          <div className="flex items-center gap-3">
            <CollectionImage
              src={school.avatar}
              alt={school.name}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <div className="text-base font-semibold text-[#464646]">{school.name}</div>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#5F5F5F]"
            onClick={closeNotesDrawer}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
          <div className="mb-4 flex flex-wrap gap-3 border-b border-[#F0F0F0] pb-4">
            <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
              <MetaClockIcon className="h-4 w-4 text-[#5F5F5F]" />
              <span>{displayDate}</span>
            </div>
            <div ref={drawerStatusRef} className="relative">
              <button
                type="button"
                className="flex items-center rounded px-2.5 py-1.5 text-[13px]"
                onClick={() => setIsDrawerStatusOpen((prev) => !prev)}
              >
                <svg className={`h-4 w-4 ${statusClassName(school.status)}`} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" />
                </svg>
                <span className={`ml-2 ${statusClassName(school.status)}`}>
                  {school.status || "Add Status"}
                </span>
                <svg viewBox="0 0 24 24" className="ml-2 h-4 w-4">
                  <path fill="currentColor" d="M5.29289 9.29289L12 14.5858l6.7071-5.2929 1.4142 1.4142-7.4142 5.9999a1 1 0 0 1-1.4142 0l-7.4142-6z" />
                </svg>
              </button>
              <div
                className={`absolute left-0 top-full z-50 mt-1 w-[200px] rounded-lg bg-white py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all ${
                  isDrawerStatusOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value || "clear"}
                    type="button"
                    className="flex w-full items-center px-3 py-2 text-left text-[13px] text-[#4A4A4A]"
                    onClick={() => {
                      onStatusChange(index, opt.value);
                      setIsDrawerStatusOpen(false);
                    }}
                  >
                    <span
                      className="mr-2 inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: opt.color }}
                    />
                    {("label" in opt ? opt.label : undefined) || opt.value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-3 text-[15px] font-semibold text-[#464646]">Notes</div>
          <div className="mb-4">
            {school.notes.length > 0 ? (
              school.notes.map((note) => (
                <div
                  key={note.id}
                  className="mb-3 rounded-lg border border-[#EAEDF2] bg-[#F8F9FB] p-3"
                >
                  <div className="mb-2 flex justify-between">
                    <span className="text-[13px] font-medium text-[#464646]">{note.author}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="text-xs text-[#346DC2]"
                        onClick={() => openEditNote(note)}
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        className="text-xs text-[#346DC2]"
                        onClick={() => openDeleteNote(note.id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                  <div className="text-sm leading-[1.5] text-[#4A4A4A]">{note.content}</div>
                  <div className="mt-1 text-right text-[11px] text-[#9CA3AF]">
                    {note.timestamp} {note.time}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-[#5F5F5F]">No notes yet</div>
            )}
          </div>

          <button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-[#EBFCF4] px-4 py-3 text-sm font-medium text-[#016853]"
            onClick={openCreateNote}
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Note
          </button>
        </div>
      </div>

      <NoteEditorMobileDrawer
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title={editingNoteId ? "Edit Note" : "Create Note"}
        noteText={noteText}
        onChange={setNoteText}
        onSave={saveNote}
      />

      <DeleteNoteConfirmMobileDrawer
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingNoteId(null);
        }}
        onConfirm={() => {
          if (deletingNoteId !== null) {
            onDeleteNoteDirect(index, deletingNoteId);
          }
          setIsDeleteModalOpen(false);
          setDeletingNoteId(null);
        }}
      />
    </>
  );
};
