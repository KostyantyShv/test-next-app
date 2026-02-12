import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CollectionsSchool, Note, RatingCheckmarks, truncateText } from "../Card";
import { SchoolCardContextMenu } from "@/components/school/explore/SchoolCardContextMenu";

const STATUS_OPTIONS = [
  { status: "Researching", color: "#395da0" },
  { status: "Scheduled Tour", color: "#008ac2" },
  { status: "Visited Campus", color: "#00817c" },
  { status: "Started Application", color: "#009666" },
  { status: "Applied", color: "#068c2e" },
  { status: "Accepted", color: "#4f8a2a" },
  { status: "Enrolled", color: "#e27800" },
  { status: "", color: "#787878", label: "Clear Status" },
] as const;

const getStatusColor = (status: string) => {
  const found = STATUS_OPTIONS.find((option) => option.status === status);
  return found?.color ?? "#787878";
};

const specialtyIcon = (specialty?: string) => {
  if (specialty === "hot") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (specialty === "instant-book") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (specialty === "sponsored") {
    return (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    );
  }

  return null;
};

const specialtyText = (specialty?: string) => {
  if (specialty === "hot") return "High demand";
  if (specialty === "instant-book") return "Instant book";
  if (specialty === "sponsored") return "Sponsored";
  return "";
};

export const CardMagazine: React.FC<{
  school: CollectionsSchool;
  index: number;
  layout: string;
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNote: (index: number) => void;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
}> = ({
  school,
  index,
  layout: _layout,
  onRatingChange,
  onStatusChange,
  onCreateNote,
  onEditNote,
  onDeleteNote,
}) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const statusDropdownRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const [portalPos, setPortalPos] = useState<{ top: number; left: number } | null>(null);

    const updatePortalPosition = useCallback(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPortalPos({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    }, []);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node;
        const clickedInsideTrigger = statusDropdownRef.current?.contains(target);
        const clickedInsidePortal = portalRef.current?.contains(target);
        if (!clickedInsideTrigger && !clickedInsidePortal) {
          setIsStatusOpen(false);
        }
      };

      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    useEffect(() => {
      if (isStatusOpen) {
        updatePortalPosition();
        window.addEventListener("scroll", updatePortalPosition, true);
        window.addEventListener("resize", updatePortalPosition);
        return () => {
          window.removeEventListener("scroll", updatePortalPosition, true);
          window.removeEventListener("resize", updatePortalPosition);
        };
      }
    }, [isStatusOpen, updatePortalPosition]);

    const statusColor = getStatusColor(school.status);

    return (
      <div className="relative z-[1] w-full" data-layout={_layout}>
        <div className="relative z-[1] flex min-h-[280px] w-full overflow-visible rounded-xl border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <div className="flex min-w-0 flex-1 flex-col justify-between overflow-visible p-6">
            <div className="flex-1">
              {school.ranking ? (
                <div className="mb-2 text-[13px] font-medium text-[#089E68]">{school.ranking}</div>
              ) : null}

              <div className="mb-3 flex items-start gap-3">
                <div className="flex min-w-0 flex-1 items-center">
                  <h3 className="flex-1 cursor-pointer text-[20px] font-semibold leading-[1.4] text-[#464646] transition-colors hover:text-[#346DC2]">
                    {school.name}
                  </h3>

                  <div className="ml-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <SchoolCardContextMenu
                      schoolName={school.name}
                      buttonClassName="flex h-8 w-8 items-center justify-center rounded-full text-[#5F5F5F] transition-colors hover:bg-[#F5F5F7] hover:text-[#464646]"
                      iconClassName="w-5 h-5"
                      preferredPlacement="bottom"
                    />
                  </div>
                </div>

                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[rgba(29,119,189,0.1)]">
                  <svg width="16" height="16" viewBox="-2 0 24 24" fill="none" className="text-[#1D77BD]">
                    <path fill="currentColor" d="M10 0L12.4492 2.44922L15.7148 1.78125L16.3828 5.04688L19.6484 5.71484L18.9805 8.98047L21.4297 11.4297L18.9805 13.8789L19.6484 17.1445L16.3828 17.8125L15.7148 21.0781L12.4492 20.4102L10 22.8594L7.55078 20.4102L4.28516 21.0781L3.61719 17.8125L0.351562 17.1445L1.01953 13.8789L-1.42969 11.4297L1.01953 8.98047L0.351562 5.71484L3.61719 5.04688L4.28516 1.78125L7.55078 2.44922L10 0Z" />
                    <path fill="white" d="M8.90039 14.3086L5.68359 10.9766L6.82422 9.85352L8.90039 11.9434L13.1777 7.63281L14.3184 8.75586L8.90039 14.3086Z" />
                  </svg>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-[#5F5F5F]">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 text-[#565656]">
                    <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
                    <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z" />
                  </svg>
                  <span className="font-medium text-[#464646]">{school.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#5F5F5F]">
                  <svg viewBox="0 0 32 32" fill="none" className="h-4 w-4 text-[#565656]">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                    />
                  </svg>
                  <span className="font-medium text-[#464646]">Added {school.dateSaved}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#5F5F5F]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="h-4 w-4 text-[#565656]">
                    <path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Z" />
                  </svg>
                  <span className="font-medium text-[#464646]">
                    <strong>{school.rating.split(" ")[0]}</strong> ({school.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#5F5F5F]">
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[#565656]"
                  >
                    <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                    <path d="M16 7h4" />
                    <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
                  </svg>
                  <span className="font-medium text-[#464646]">
                    {school.notes.length}
                    <button
                      type="button"
                      className="ml-1 text-[13px] font-medium text-[#346DC2] transition-colors hover:underline"
                      onClick={() => onCreateNote(index)}
                    >
                      (Create Note)
                    </button>
                  </span>
                </div>
              </div>

              <div className="mb-3 flex min-h-[40px] max-h-[60px] flex-1 flex-col overflow-y-auto">
                {school.notes.length > 0 ? (
                  school.notes.map((note: Note) => (
                    <Note
                      key={note.id}
                      note={note}
                      onEdit={() => onEditNote(index, note.id)}
                      onDelete={() => onDeleteNote(index, note.id)}
                    />
                  ))
                ) : (
                  <div className="my-2.5 text-center text-sm text-[#9CA3AF]">No notes yet</div>
                )}
              </div>
            </div>

            <div className="relative z-20 mt-4 flex items-center justify-between border-t border-[#f0f0f0] pt-4">
              <div className="flex flex-wrap items-center gap-6">
                <div ref={statusDropdownRef} className="relative z-[200]">
                  <button
                    ref={triggerRef}
                    type="button"
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors hover:bg-[#F5F5F7]"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsStatusOpen((prev) => !prev);
                    }}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: statusColor }}>
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" />
                    </svg>
                    <span className="text-sm font-semibold" style={{ color: statusColor }}>
                      {truncateText(school.status || "Add Status", 10)}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: statusColor }}>
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isStatusOpen && portalPos && createPortal(
                    <div
                      ref={portalRef}
                      style={{
                        position: 'absolute',
                        top: portalPos.top - 4,
                        left: portalPos.left,
                        transform: 'translateY(-100%)',
                        zIndex: 99999,
                      }}
                    >
                      <div
                        style={{
                          width: 200,
                          maxHeight: 300,
                          overflowY: 'auto',
                          background: 'white',
                          borderRadius: 8,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          padding: '8px 0',
                        }}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <button
                            key={option.status || "clear-status"}
                            type="button"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '8px 16px',
                              fontSize: 14,
                              color: '#4A4A4A',
                              width: '100%',
                              border: 'none',
                              background: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F7')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            onClick={(event) => {
                              event.stopPropagation();
                              onStatusChange(index, option.status);
                              setIsStatusOpen(false);
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: option.color,
                                flexShrink: 0,
                              }}
                            />
                            {'label' in option ? option.label : option.status}
                          </button>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}
                </div>

                <RatingCheckmarks
                  rating={school.myRating}
                  onRatingChange={(rating) => onRatingChange(index, rating)}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-lg bg-[#EBFCF4] px-4 text-sm font-medium text-[#016853] transition-colors hover:bg-[#D7F7E9]"
                >
                  <svg width="16" height="16" viewBox="0 0 489.8 489.8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6C489.8,23.2,466.6,0,438.2,0z" />
                    <path d="M337.4,232.7h-80.3v-80.3c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v80.3h-80.3c-6.8,0-12.3,5.5-12.3,12.2c0,6.8,5.5,12.3,12.3,12.3h80.3v80.3c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-80.3h80.3c6.8,0,12.3-5.5,12.3-12.3C349.7,238.1,344.2,232.7,337.4,232.7z" fill="white" />
                  </svg>
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-r-xl">
            {school.specialty ? (
              <div
                className={`absolute right-0 top-6 z-[2] flex h-8 items-center rounded-l-xl bg-white px-2.5 text-xs font-medium shadow-[-1px_2px_2px_rgba(0,0,0,0.1)] ${school.specialty === "hot"
                  ? "text-[#FF4D4D]"
                  : school.specialty === "instant-book"
                    ? "text-[#1D77BD]"
                    : "text-[#FF9900]"
                  }`}
              >
                {specialtyIcon(school.specialty)}
                <span className="ml-1">{specialtyText(school.specialty)}</span>
              </div>
            ) : null}

            <div className="relative h-full w-full min-h-[280px]">
              <Image src={school.image} alt={school.name} fill className="object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-[rgba(0,0,0,0.8)] px-4 py-3 text-center text-[13px] font-medium text-white">
              {school.schoolType}
            </div>
          </div>
        </div>
      </div>
    );
  };
