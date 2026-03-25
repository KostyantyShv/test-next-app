import { useEffect, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { CollectionImage } from "../CollectionImage";
import { CollectionsSchool, Note, truncateText } from "../Card";
import { SchoolCardContextMenu } from "@/components/school/explore/SchoolCardContextMenu";
import { NoteEditorMobileDrawer } from "../../modals/NoteEditorMobileDrawer";
import { DeleteNoteConfirmMobileDrawer } from "../../modals/DeleteNoteConfirmMobileDrawer";
import { MetaClockIcon, MetaStarIcon } from "./MetaIcons";

interface CardListMobileProps {
  school: CollectionsSchool;
  index: number;
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNoteDirect: (index: number, text: string) => void;
  onEditNoteDirect: (index: number, noteId: number, text: string) => void;
  onDeleteNoteDirect: (index: number, noteId: number) => void;
}

const STATUS_OPTIONS = [
  { value: "Researching", color: "#395da0" },
  { value: "Scheduled Tour", color: "#008ac2" },
  { value: "Visited Campus", color: "#00817c" },
  { value: "Started Application", color: "#009666" },
  { value: "Applied", color: "#068c2e" },
  { value: "Accepted", color: "#4f8a2a" },
  { value: "Enrolled", color: "#e27800" },
  { value: "", color: "#787878", label: "Clear Status" },
] as const;

const getStatusColor = (status: string) =>
  STATUS_OPTIONS.find((option) => option.value === status)?.color ?? "#787878";

const specialtyIcon = (specialty?: string) => {
  if (specialty === "hot") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
        <path d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z" />
      </svg>
    );
  }

  if (specialty === "instant-book") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
        <path d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z" />
      </svg>
    );
  }

  if (specialty === "sponsored") {
    return (
      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    );
  }

  return null;
};

const specialtyText = (specialty?: string) => {
  if (specialty === "hot") return "Hot";
  if (specialty === "instant-book") return "Instant Book";
  if (specialty === "sponsored") return "Sponsored";
  return "";
};

const formatSchoolTypeLabel = (label: string): string => {
  if (!label) return "";
  return label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

const RatingCheckmarksMobile = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (rating: number) => void;
}) => (
  <div className="flex items-center gap-[2px]">
    {Array.from({ length: 5 }).map((_, idx) => {
      const star = idx + 1;
      const active = star <= rating;
      return (
        <svg
          key={star}
          className={`h-4 w-4 cursor-pointer ${active ? "fill-[#07BC44]" : "fill-[#BCC5D3]"}`}
          viewBox="0 0 24 24"
          onClick={(e) => {
            e.stopPropagation();
            onChange(star <= rating && rating === 1 ? 0 : star);
          }}
        >
          <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M10,17 L5,12 L6.41,10.59 L10,14.17 L17.59,6.58 L19,8 L10,17 Z" />
        </svg>
      );
    })}
  </div>
);

export const CardListMobile: React.FC<CardListMobileProps> = ({
  school,
  index,
  onRatingChange,
  onStatusChange,
  onCreateNoteDirect,
  onEditNoteDirect,
  onDeleteNoteDirect,
}) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useBodyScrollLock(isNotesOpen || isNoteModalOpen || isDeleteModalOpen);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (statusRef.current && !statusRef.current.contains(target)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (!isNotesOpen) {
      setIsStatusOpen(false);
    }
  }, [isNotesOpen]);

  const closeNotesPanel = () => {
    setIsNotesOpen(false);
    setIsStatusOpen(false);
  };

  const toggleNotesPanel = () => {
    setIsNotesOpen((open) => {
      if (open) {
        setIsStatusOpen(false);
      }
      return !open;
    });
  };

  const openCreateNote = () => {
    closeNotesPanel();
    setEditingNoteId(null);
    setNoteText("");
    setIsNoteModalOpen(true);
  };

  const openEditNote = (note: Note) => {
    closeNotesPanel();
    setEditingNoteId(note.id);
    setNoteText(note.content);
    setIsNoteModalOpen(true);
  };

  const openDeleteNote = (noteId: number) => {
    closeNotesPanel();
    setDeletingNoteId(noteId);
    setIsDeleteModalOpen(true);
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
    setEditingNoteId(null);
    setNoteText("");
  };

  const statusColor = getStatusColor(school.status);
  const displayDate = school.dateAdded || school.dateSaved;

  return (
    <>
      <article
        className={`collections-list-mobile-card school-card relative w-full max-w-full rounded-xl border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
          isStatusOpen ? "z-20" : "z-0"
        }`}
      >
        <div className="card-main relative flex items-start gap-3">
          <div className="image-wrapper relative h-[120px] w-[120px] shrink-0">
            <CollectionImage
              src={school.image}
              alt={school.name}
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-l-xl object-cover"
            />
            <div
              className="absolute left-2 top-2 z-[5]"
              onClick={(event) => event.stopPropagation()}
            >
              <SchoolCardContextMenu
                schoolName={school.name}
                iconVariant="list"
                buttonClassName="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-white p-0 shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-opacity active:opacity-90"
                iconClassName="h-4 w-4 text-[#666]"
              />
            </div>
            {school.specialty ? (
              <div
                className={`absolute bottom-[10px] left-0 z-[2] flex h-6 items-center gap-1 rounded-r-xl bg-white py-0 pl-2 pr-2.5 text-[11px] font-medium shadow-[1px_2px_4px_rgba(0,0,0,0.1)] ${
                  school.specialty === "hot"
                    ? "text-[#FF4D4D]"
                    : school.specialty === "instant-book"
                      ? "text-[#1D77BD]"
                      : "text-[#FF9900]"
                }`}
              >
                <span className="inline-flex shrink-0 items-center">{specialtyIcon(school.specialty)}</span>
                <span className="truncate">{specialtyText(school.specialty)}</span>
              </div>
            ) : null}
          </div>

          <div className="school-content flex min-w-0 flex-1 flex-col justify-between overflow-hidden rounded-tr-xl bg-white p-3">
            <div className="min-w-0">
              {school.ranking ? (
                <p className="mb-0.5 truncate text-xs font-medium leading-tight text-[#089E68]">
                  {truncateText(school.ranking, 40)}
                </p>
              ) : null}
              <h3 className="line-clamp-2 text-base font-semibold leading-[1.3] text-[#464646]">{school.name}</h3>
              {school.schoolType ? (
                <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.02em] text-[#787878]">
                  {formatSchoolTypeLabel(school.schoolType)}
                </p>
              ) : null}
              <p className="mt-1 truncate text-[13px] leading-tight text-[#5F5F5F]">{school.location}</p>
            </div>
            <div className="mt-1 flex w-full max-w-full items-center gap-3 overflow-hidden whitespace-nowrap">
              <div className="flex min-w-0 shrink basis-[55%] items-center gap-1.5 text-xs leading-none text-[#5F5F5F]">
                <MetaClockIcon className="h-3.5 w-3.5 shrink-0 text-[#565656]" />
                <span className="truncate font-medium text-[#464646]">{truncateText(displayDate, 14)}</span>
              </div>
              <div className="flex min-w-0 shrink basis-[45%] items-center gap-1.5 text-xs leading-none text-[#5F5F5F]">
                <MetaStarIcon className="h-3.5 w-3.5 shrink-0 text-[#565656]" />
                <span className="min-w-0 truncate font-medium text-[#464646]">
                  <span className="font-semibold">{school.rating.replace(/\s*\([^)]*\)\s*$/, "").trim()}</span>
                  {` (${school.reviews})`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer relative z-0 flex items-center justify-between rounded-b-xl border-t border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2.5">
          <div ref={statusRef} className="status-dropdown relative shrink-0">
            <button
              type="button"
              className="status-indicator flex cursor-pointer items-center gap-1.5 rounded-md bg-[#F5F5F7] px-2 py-1 text-[#787878]"
              onClick={(event) => {
                event.stopPropagation();
                setIsStatusOpen((prev) => !prev);
              }}
            >
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill={statusColor} aria-hidden>
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
              </svg>
              <span className="max-w-[120px] truncate text-xs font-medium" style={{ color: statusColor }}>
                {school.status || "Add Status"}
              </span>
              <svg className="ml-1 h-2.5 w-2.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 9L12 15L18 9"
                  stroke={statusColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`absolute left-0 top-full z-[1002] mt-1 w-[200px] overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${
                isStatusOpen ? "block" : "hidden"
              }`}
            >
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value || "clear"}
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#4A4A4A] hover:bg-[#F5F5F7]"
                  onClick={(event) => {
                    event.stopPropagation();
                    onStatusChange(index, option.value);
                    setIsStatusOpen(false);
                  }}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  {("label" in option ? option.label : undefined) || option.value}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-actions flex items-center gap-3">
            <RatingCheckmarksMobile
              rating={school.myRating}
              onChange={(rating) => onRatingChange(index, rating)}
            />
            <button
              type="button"
              className="notes-count flex cursor-pointer items-center gap-1 text-xs font-medium text-[#565656]"
              aria-expanded={isNotesOpen}
              aria-label={
                isNotesOpen ? `Hide notes for ${school.name}` : `Show notes for ${school.name}`
              }
              onClick={(event) => {
                event.stopPropagation();
                toggleNotesPanel();
              }}
            >
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px] shrink-0 text-[#565656]"
              >
                <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                <path d="M16 7h4" />
                <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
              </svg>
              <span>{school.notes.length}</span>
            </button>
          </div>
        </div>
      </article>

      <div
        className={`fixed inset-0 z-[3100] bg-black/50 transition-opacity md:hidden ${
          isNotesOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        onClick={closeNotesPanel}
        aria-hidden={!isNotesOpen}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[3200] flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out md:hidden ${
          isNotesOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
          <h2 className="text-lg font-semibold text-[#464646]">Notes</h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280]"
            onClick={closeNotesPanel}
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

        <div className="max-h-[calc(80vh-130px)] flex-grow overflow-y-auto p-4">
          {school.notes.length > 0 ? (
            school.notes.map((note) => (
              <div
                key={note.id}
                className="mb-3 rounded-lg border border-[#EAEDF2] bg-[#F8F9FB] p-3"
              >
                <div className="mb-2 flex justify-between">
                  <span className="text-[13px] font-medium text-[#464646]">
                    {note.author}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-[11px] text-[#346DC2]"
                      onClick={() => openEditNote(note)}
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      className="text-[11px] text-[#346DC2]"
                      onClick={() => openDeleteNote(note.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
                <div className="text-sm leading-[1.5] text-[#4A4A4A]">{note.content}</div>
                <div className="mt-2 text-right text-[11px] text-[#9CA3AF]">
                  {note.timestamp} · {note.time}
                </div>
              </div>
            ))
          ) : (
            <div className="py-5 text-center text-sm text-[#6B7280]">No notes yet.</div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-[#E5E7EB] p-4">
          <button
            type="button"
            className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#4B5563]"
            onClick={closeNotesPanel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#1B1B1B] px-4 py-2 text-sm font-medium text-white"
            onClick={openCreateNote}
          >
            Add Note
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
