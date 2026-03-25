import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CollectionImage } from "../CollectionImage";
import { CollectionsSchool, Note, RatingCheckmarks } from "../Card";
import { NotesModal } from "../../modals/NotesModal";
import { SchoolCardContextMenu } from "@/components/school/explore/SchoolCardContextMenu";
import { MetaClockIcon, MetaStarIcon } from "./MetaIcons";

interface SchoolCardProps {
  school: CollectionsSchool;
  index: number;
  onStatusChange: (index: number, status: string) => void;
  onRatingChange: (index: number, rating: number) => void;
  onCreateNote: (index: number) => void;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
}

export const CardTable: React.FC<SchoolCardProps> = ({
  school,
  index,
  onStatusChange,
  onRatingChange,
  onCreateNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusTriggerRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number } | null>(null);

  const updatePortalPosition = useCallback(() => {
    if (statusTriggerRef.current) {
      const rect = statusTriggerRef.current.getBoundingClientRect();
      setPortalPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideTrigger = statusTriggerRef.current?.contains(target);
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
  const truncateText = (
    text: string | undefined,
    maxLength: number,
    addEllipsis: boolean = true
  ): string => {
    if (!text) return "";
    if (text.length > maxLength) {
      return addEllipsis
        ? text.substring(0, maxLength) + ".."
        : text.substring(0, maxLength);
    }
    return text;
  };

  const formatSchoolTypeLabel = (label: string): string => {
    if (!label) return "";
    return label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const handleModalClose = () => setIsModalOpen((prev) => !prev);

  const toggleStatusDropdown = (): void => {
    setIsStatusOpen((prev) => !prev);
  };

  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleStatusChange = (status: string): void => {
    onStatusChange(index, status);
    setIsStatusOpen(false);
  };

  const specialtyIcons: Record<string, React.ReactElement> = {
    hot: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <path d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z" />
      </svg>
    ),
    "instant-book": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <path d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z" />
      </svg>
    ),
    sponsored: (
      <svg width="16" height="16" viewBox="0 0 20 20" className="fill-current">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.950-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    ),
  };

  const specialtyText: Record<string, string> = {
    hot: "High demand",
    "instant-book": "Instant book",
    sponsored: "Sponsored",
  };

  const specialtyIcon = school.specialty ? specialtyIcons[school.specialty] : null;
  const specialtyBadgeSmall = school.specialty && specialtyIcon ? (
    <div
      className={`specialty-badge-small flex items-center justify-center w-8 h-8 rounded-full border-2 border-white relative group ${school.specialty === "hot"
          ? "bg-[rgba(255,77,77,0.1)]"
          : school.specialty === "instant-book"
            ? "bg-[rgba(29,119,189,0.1)]"
            : "bg-[rgba(255,153,0,0.1)]"
        } hover:-translate-y-0.5 transition-all duration-200`}
    >
      {React.cloneElement(specialtyIcon as React.ReactElement<{ className?: string }>, {
        className: `fill-current ${school.specialty === "hot"
            ? "text-[#FF4D4D]"
            : school.specialty === "instant-book"
              ? "text-[#1D77BD]"
              : "text-[#FF9900]"
          }`,
      })}
      <div className="tooltip absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#333] text-white text-xs rounded px-2.5 py-1.5 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
        {specialtyText[school.specialty] || school.specialty}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-[#333]" />
      </div>
    </div>
  ) : null;

  const statusClass: string = school.status
    ? school.status.toLowerCase().replace(/\s+/g, "-")
    : "add-status";

  return (
    <div className="collections-table-card">
      <table className="w-full border-collapse">
        <tbody>
          <tr
            className={`main-row ${isExpanded ? "expanded" : ""}`}
            data-item-id={index}
          >
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <button
                className="expand-button w-8 h-8 rounded-md bg-[#F1F3F6] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB] transition-colors duration-200"
                onClick={toggleExpand}
                aria-label={`Expand Row ${index}`}
              >
                <svg
                  height="16"
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`stroke-[#6b7280] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                    }`}
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </td>
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <div className="item-info flex items-center">
                <div className="relative mr-3 h-10 w-10 shrink-0">
                  <CollectionImage
                    src={school.avatar}
                    alt={school.name}
                    width={40}
                    height={40}
                    className="item-avatar h-10 w-10 rounded object-cover bg-[#f9fafb]"
                  />
                  {school.schoolType ? (
                    <div className="absolute bottom-0 left-0 z-[2] max-w-[96px] truncate rounded-t-[4px] bg-white px-1.5 py-[2px] text-[9px] font-semibold uppercase tracking-[0.02em] text-[#464646] shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
                      {formatSchoolTypeLabel(school.schoolType)}
                    </div>
                  ) : null}
                </div>
                <div className="item-details flex flex-col relative overflow-visible">
                  <div
                    className="item-title font-semibold text-[#464646] mb-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] cursor-pointer relative z-10 group"
                    data-full-title={school.name}
                  >
                    {truncateText(school.name, 20)}
                    <div className="absolute top-[-30px] left-0 bg-[#333] text-white px-2.5 py-1 rounded text-xs whitespace-nowrap z-20 hidden group-hover:block">
                      {school.name}
                    </div>
                    <div className="absolute top-[-10px] left-[10px] border-5 border-transparent border-t-[#333] rotate-180 hidden group-hover:block z-20" />
                  </div>
                  {school.ranking && (
                    <div className="ranking-text text-[#089E68] text-xs font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                      {truncateText(school.ranking, 30)}
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <div className="view-links flex flex-wrap items-center max-w-[180px] gap-1">
                <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center mr-1 mb-1 border-2 border-white relative group cursor-pointer hover:-translate-y-0.5 hover:bg-[#EBFCF4] transition-all duration-200">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="fill-current text-[#464646] group-hover:text-[#016853]"
                  >
                    <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
                    <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
                  </svg>
                  <div className="tooltip absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#333] text-white text-xs rounded px-2.5 py-1.5 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
                    {school.location}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-[#333]" />
                  </div>
                </div>
                <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center mr-1 mb-1 border-2 border-white relative group cursor-pointer hover:-translate-y-0.5 hover:bg-[#EBFCF4] transition-all duration-200">
                  <MetaStarIcon className="w-4 h-4 text-[#464646] group-hover:text-[#016853]" />
                  <div className="tooltip absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#333] text-white text-xs rounded px-2.5 py-1.5 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
                    {school.rating}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-[#333]" />
                  </div>
                </div>
                <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center mr-1 mb-1 border-2 border-white relative group cursor-pointer hover:-translate-y-0.5 hover:bg-[#EBFCF4] transition-all duration-200">
                  <MetaClockIcon className="w-4 h-4 text-[#464646] group-hover:text-[#016853]" />
                  <div className="tooltip absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#333] text-white text-xs rounded px-2.5 py-1.5 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
                    {school.dateSaved}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-[#333]" />
                  </div>
                </div>
                {specialtyBadgeSmall}
              </div>
            </td>
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <div
                ref={statusTriggerRef}
                onClick={toggleStatusDropdown}
                className={`status-dropdown relative cursor-pointer flex items-start px-2.5 py-1.5 rounded transition-all duration-200 hover:bg-[#F5F5F7] `}
                data-school-id={index}
              >
                <div className="stat flex items-center">
                  <svg
                    className={`status-icon ${statusClass} w-4 h-4 mr-1.5`}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                  </svg>
                  <span
                    className={`status-text ${statusClass} text-[#4A4A4A] text-sm`}
                  >
                    {truncateText(school.status, 12, false)}
                  </span>
                  <svg
                    className="dropdown-arrow w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                {isStatusOpen && portalPos && createPortal(
                  <div
                    ref={portalRef}
                    style={{
                      position: 'absolute',
                      top: portalPos.top,
                      left: portalPos.left,
                      zIndex: 99999,
                    }}
                  >
                    <div
                      style={{
                        width: 200,
                        background: 'var(--surface-color, #FFFFFF)',
                        border: '1px solid var(--border-color, rgba(0,0,0,0.1))',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        padding: '8px 0',
                      }}
                    >
                      {[
                        { status: "Researching", color: "#395da0" },
                        { status: "Scheduled Tour", color: "#008ac2" },
                        { status: "Visited Campus", color: "#00817c" },
                        { status: "Started Application", color: "#009666" },
                        { status: "Applied", color: "#068c2e" },
                        { status: "Accepted", color: "#4f8a2a" },
                        { status: "Enrolled", color: "#e27800" },
                        { status: "", color: "#787878", label: "Clear Status" },
                      ].map(({ status, color, label }) => (
                        <div
                          key={status || "clear"}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 12px',
                            fontSize: 14,
                            color: 'var(--text-default, #4A4A4A)',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg, #F5F5F7)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          data-status={status}
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(status); }}
                        >
                          <div
                            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: color, marginRight: 8, flexShrink: 0 }}
                          />
                          <span>{label || status}</span>
                        </div>
                      ))}
                    </div>
                  </div>,
                  document.body
                )}
              </div>
            </td>
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <div className="rating-filter flex items-center">
                <RatingCheckmarks
                  rating={school.myRating}
                  onRatingChange={(rating) => onRatingChange(index, rating)}
                />
              </div>
            </td>
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <div
                onClick={() => setIsModalOpen(true)}
                className="notes-count flex items-center gap-1.5 text-sm text-[#5F5F5F]"
              >
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#089E68"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                  <path d="M16 7h4" />
                  <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
                </svg>
                <span>{school.notes ? school.notes.length : 0}</span>
              </div>
            </td>
            <td className="p-4 bg-white border-b border-[#e5e7eb]">
              <SchoolCardContextMenu
                schoolName={school.name}
                buttonClassName="options-button w-8 h-8 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#F5F5F7] transition-colors duration-200 relative text-[#5F5F5F]"
              />
            </td>
          </tr>
          <tr
            className={`expanded-content ${isExpanded ? "" : "hidden"}`}
            data-item-id={index}
          >
            <td
              colSpan={7}
              className="expanded-cell p-0 border-0 bg-transparent"
            >
              <div className="edit-panel bg-[var(--surface-secondary)] p-6 m-4 mt-0 rounded-lg border border-[var(--border-color)] border-t-0 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="notes-section mt-4">
                  <div className="notes-header flex justify-between items-center mb-3">
                    <h3 className="notes-title font-semibold text-[var(--bold-text)] text-base flex items-center">
                      Notes ({school.notes ? school.notes.length : 0})
                    </h3>
                    <button
                      className="create-note-btn px-3 py-1.5 bg-[var(--apply-button-bg)] text-[var(--header-green)] rounded border-none cursor-pointer font-medium text-sm flex items-center gap-1.5 hover:bg-[var(--apply-button-hover)] transition-colors duration-200"
                      data-school-id={index}
                      onClick={() => onCreateNote(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Add Note
                    </button>
                  </div>
                  <div className="notes-container">
                    {school.notes.length > 0 ? (
                      school.notes.map((note) => (
                        <Note
                          key={note.id}
                          note={note}
                          onEdit={() => onEditNote(index, note.id)}
                          onDelete={() => onDeleteNote(index, note.id)}
                        />
                      ))
                    ) : (
                      <div className="note-placeholder mt-2.5 text-sm text-[var(--subtle-text)]">
                        No notes yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <NotesModal
        onClose={handleModalClose}
        isOpen={isModalOpen}
        index={index}
        onCreateNote={onCreateNote}
        onDeleteNote={onDeleteNote}
        onEditNote={onEditNote}
        school={school}
      />
    </div>
  );
};
