import React, { useMemo, useState } from "react";
import Image from "next/image";
import { CollectionsSchool, Note, RatingCheckmarks } from "../Card";
import { SchoolCardContextMenu } from "../../../../explore/SchoolCardContextMenu";

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
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);

  const specialtyText = useMemo(() => {
    if (school.specialty === "hot") return "High demand";
    if (school.specialty === "instant-book") return "Instant book";
    if (school.specialty === "sponsored") return "Sponsored";
    return "";
  }, [school.specialty]);

  const openCreateNote = () => {
    setEditingNoteId(null);
    setNoteText("");
    setIsNoteModalOpen(true);
  };

  const openEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteText(note.content);
    setIsNoteModalOpen(true);
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

  const openInfoDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <article
        className="relative flex flex-col overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        onClick={() => setIsDrawerOpen(true)}
      >
        <div className="relative h-[140px] w-full overflow-hidden">
          <Image src={school.image} alt={school.name} fill className="object-cover" />

          {school.specialty ? (
            <div
              className={`absolute left-3 top-3 z-[2] flex h-8 items-center rounded-2xl bg-white px-3 text-xs font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${
                school.specialty === "hot"
                  ? "text-[#FF4D4D]"
                  : school.specialty === "instant-book"
                  ? "text-[#1D77BD]"
                  : "text-[#FF9900]"
              }`}
            >
              {specialtyIcon(school.specialty)}
              <span className="ml-1">{specialtyText}</span>
            </div>
          ) : null}

          <div className="absolute bottom-0 left-[10px] z-[2] flex h-6 items-center rounded-t-[4px] bg-white px-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.02em] text-[#464646] shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
            {school.schoolType}
          </div>

          <div
            className="absolute right-3 top-3 z-10"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SchoolCardContextMenu
              schoolName={school.name}
              buttonClassName="more-options flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent p-0 text-[#5F5F5F] shadow-none transition-colors hover:bg-[#F5F5F7] hover:text-[#464646] active:bg-[#F5F5F7]"
              iconClassName="h-[16px] w-[16px] rotate-90 fill-current text-current"
            />
          </div>
        </div>

        <div className="flex-grow p-4">
          {school.ranking ? (
            <div className="mb-2 text-[13px] font-medium text-[#089E68]">
              {school.ranking}
            </div>
          ) : null}
          <h3 className="mb-[6px] text-base font-semibold leading-[1.4] text-[#464646]">
            {school.name}
          </h3>
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-[13px] font-[450] text-[#5F5F5F]">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 text-[#565656]">
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5z"></path>
              </svg>
              <span className="text-[#464646]">{school.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-[450] text-[#5F5F5F]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#565656]">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.49L12 4.72 9.978 9.806l-5.71.49 4.254 3.89-1.166 5.519L12 16.599Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[#464646]">{school.rating}</span>
            </div>
          </div>
        </div>

        <footer
          className="relative z-[3] flex h-[52px] items-center justify-between border-t border-[rgba(1,104,83,0.1)] bg-white px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <RatingCheckmarks
            rating={school.myRating}
            onRatingChange={(rating) => onRatingChange(index, rating)}
          />
          <div className="flex items-center gap-2 text-[13px] text-[#5F5F5F]">
            <button
              type="button"
              aria-label={`Open info for ${school.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F7] text-[#4A4A4A] transition-colors hover:bg-[#EBFCF4] hover:text-[#016853]"
              onClick={openInfoDrawer}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  d="M10 6V10"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  d="M10 13.1094H10.0067"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                />
              </svg>
            </button>
            <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" className="h-4 w-4 text-[#089E68]">
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
              <path d="M16 7h4"></path>
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3"></path>
            </svg>
            <span>{school.notes?.length || 0}</span>
          </div>
        </footer>
      </article>

      <div
        className={`fixed inset-0 z-[1000] bg-black/50 transition-opacity ${
          isDrawerOpen ? "visible opacity-100" : "invisible opacity-0"
        } md:hidden`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[1001] flex max-h-[80%] w-full translate-y-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform ${
          isDrawerOpen ? "translate-y-0" : ""
        } md:hidden`}
      >
        <div className="mx-auto my-3 h-[5px] w-10 rounded-[2.5px] bg-[#E5E7EB]" />
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 pb-4">
          <div className="flex items-center gap-3">
            <Image
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
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
          <div className="mb-4 flex flex-wrap gap-3 border-b border-[#F0F0F0] pb-4">
            <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
              <svg viewBox="0 0 32 32" className="h-4 w-4">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{school.dateSaved}</span>
            </div>
            <div className="relative">
              <button
                type="button"
                className="flex items-center rounded px-2.5 py-1.5 text-[13px]"
                onClick={() => setIsStatusOpen((prev) => !prev)}
              >
                <svg className={`h-4 w-4 ${statusClassName(school.status)}`} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z"></path>
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
                  isStatusOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value || "clear"}
                    type="button"
                    className="flex w-full items-center px-3 py-2 text-left text-[13px] text-[#4A4A4A]"
                    onClick={() => {
                      onStatusChange(index, opt.value);
                      setIsStatusOpen(false);
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
                    <span className="text-[13px] font-medium text-[#464646]">
                      {note.author}
                    </span>
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
                        onClick={() => {
                          setDeletingNoteId(note.id);
                          setIsDeleteModalOpen(true);
                        }}
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

      <div
        className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 transition-all ${
          isNoteModalOpen ? "visible opacity-100" : "invisible opacity-0"
        } md:hidden`}
      >
        <div className="w-[90%] rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#1B1B1B]">
              {editingNoteId ? "Edit Note" : "Create Note"}
            </h3>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#5F5F5F]"
              onClick={() => setIsNoteModalOpen(false)}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <textarea
            className="mb-4 min-h-[120px] w-full resize-none rounded-lg border border-[#E5E7EB] p-3 text-sm"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter your note here..."
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-md bg-[#F5F5F7] px-4 py-2 text-sm font-medium text-[#464646]"
              onClick={() => setIsNoteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-[#016853] px-4 py-2 text-sm font-medium text-white"
              onClick={saveNote}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[2100] flex items-center justify-center bg-black/50 transition-all ${
          isDeleteModalOpen ? "visible opacity-100" : "invisible opacity-0"
        } md:hidden`}
      >
        <div className="w-[90%] rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <h3 className="mb-4 text-lg font-semibold text-[#1B1B1B]">Delete Note</h3>
          <p className="mb-6 text-sm leading-[1.5] text-[#4A4A4A]">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-md bg-[#F5F5F7] px-4 py-2 text-sm font-medium text-[#464646]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingNoteId(null);
              }}
            >
              No, Keep It
            </button>
            <button
              type="button"
              className="rounded-md bg-[#FF3B30] px-4 py-2 text-sm font-medium text-white"
              onClick={() => {
                if (deletingNoteId !== null) {
                  onDeleteNoteDirect(index, deletingNoteId);
                }
                setIsDeleteModalOpen(false);
                setDeletingNoteId(null);
              }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
