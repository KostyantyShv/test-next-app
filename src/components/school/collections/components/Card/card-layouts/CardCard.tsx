import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CollectionsSchool, RatingCheckmarks } from "../Card";
import { SchoolCardContextMenu } from "@/components/school/explore/SchoolCardContextMenu";

interface SchoolCardProps {
  school: CollectionsSchool;
  index: number;
  layout: string;
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNote: (index: number) => void;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
}

const STATUS_OPTIONS = [
  { value: "Researching", label: "Researching", color: "#395da0" },
  { value: "Scheduled Tour", label: "Scheduled Tour", color: "#008ac2" },
  { value: "Visited Campus", label: "Visited Campus", color: "#00817c" },
  { value: "Started Application", label: "Started Application", color: "#009666" },
  { value: "Applied", label: "Applied", color: "#068c2e" },
  { value: "Accepted", label: "Accepted", color: "#4f8a2a" },
  { value: "Enrolled", label: "Enrolled", color: "#e27800" },
  { value: "", label: "Clear Status", color: "#787878" },
] as const;

const STATUS_COLORS: Record<string, string> = {
  researching: "#395da0",
  "scheduled-tour": "#008ac2",
  "visited-campus": "#00817c",
  "started-application": "#009666",
  applied: "#068c2e",
  accepted: "#4f8a2a",
  enrolled: "#e27800",
  "clear-status": "#787878",
  "add-status": "#787878",
};

const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}..` : text;
};

const truncateWords = (text: string | undefined, maxWords = 3): string => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const formatSchoolTypeLabel = (label: string): string => {
  if (!label) return "";
  return label
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const SpecialtyLabel = ({ specialty, fallbackLabel }: { specialty?: string; fallbackLabel?: string }) => {
  if (!specialty) {
    if (!fallbackLabel) return null;
    return (
      <div className="specialty-badge no-specialty absolute left-0 right-0 top-0 z-[5] flex items-center gap-1.5 rounded-t-[12px] bg-[rgba(107,114,128,0.12)] px-3 py-2 text-xs font-medium text-[#6B7280]">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z"
          />
        </svg>
        <span className="max-w-full truncate whitespace-nowrap">{formatSchoolTypeLabel(fallbackLabel)}</span>
      </div>
    );
  }

  if (specialty === "hot") {
    return (
      <div className="specialty-badge hot absolute left-0 right-0 top-0 z-[5] flex items-center gap-1.5 rounded-t-[12px] bg-[rgba(255,77,77,0.1)] px-3 py-2 text-xs font-medium text-[#FF4D4D]">
        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
            fill="currentColor"
          />
        </svg>
        High demand
      </div>
    );
  }

  if (specialty === "instant-book") {
    return (
      <div className="specialty-badge instant-book absolute left-0 right-0 top-0 z-[5] flex items-center gap-1.5 rounded-t-[12px] bg-[rgba(29,119,189,0.1)] px-3 py-2 text-xs font-medium text-[#1D77BD]">
        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
            fill="currentColor"
          />
        </svg>
        Instant book
      </div>
    );
  }

  if (specialty === "sponsored") {
    return (
      <div className="specialty-badge sponsored absolute left-0 right-0 top-0 z-[5] flex items-center gap-1.5 rounded-t-[12px] bg-[rgba(255,153,0,0.1)] px-3 py-2 text-xs font-medium text-[#FF9900]">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
        </svg>
        Sponsored
      </div>
    );
  }

  return null;
};

export const CardCard: React.FC<SchoolCardProps> = ({
  school,
  index,
  layout,
  onRatingChange,
  onStatusChange,
  onCreateNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number } | null>(null);

  const statusClass = school.status
    ? school.status.toLowerCase().replace(/\s+/g, "-")
    : "add-status";
  const statusColor = STATUS_COLORS[statusClass] || STATUS_COLORS["add-status"];

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
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isStatusDropdownOpen) {
      updatePortalPosition();
      window.addEventListener("scroll", updatePortalPosition, true);
      window.addEventListener("resize", updatePortalPosition);
      return () => {
        window.removeEventListener("scroll", updatePortalPosition, true);
        window.removeEventListener("resize", updatePortalPosition);
      };
    }
  }, [isStatusDropdownOpen, updatePortalPosition]);

  return (
    <div className="relative h-full w-full">
      <article
        data-layout={layout}
        className="group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      >
        <SpecialtyLabel specialty={school.specialty} fallbackLabel={school.schoolType} />

        <div className={`card-header flex items-start gap-4 px-4 pb-3 pr-[26px] ${school.specialty || school.schoolType ? "pt-10" : "pt-4"}`}>
          <Image
            src={school.avatar}
            alt={school.name}
            width={72}
            height={48}
            className="school-thumbnail h-12 w-[72px] shrink-0 rounded-lg object-cover"
          />
          <div className="school-info flex w-full max-w-[calc(100%-10px)] flex-1 flex-col overflow-hidden">
            <h3 className="school-name mb-1 text-base font-semibold leading-[1.3] text-[#464646]">
              {truncateWords(school.name, 3)}
            </h3>
            {school.ranking ? (
              <div className="ranking-text max-w-full truncate text-xs font-medium leading-[1.4] text-[#089E68]">
                {school.ranking}
              </div>
            ) : null}
            <div className="school-type-badge mt-2 inline-flex w-fit max-w-full shrink-0 items-center gap-1.5 whitespace-nowrap rounded-2xl bg-[#E5E7EB] px-2 py-1 text-xs font-medium text-[#464646]">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z"
                  fill="currentColor"
                />
              </svg>
              <span className="max-w-full truncate whitespace-nowrap">{formatSchoolTypeLabel(school.schoolType)}</span>
            </div>
          </div>
        </div>

        <div className="school-content flex-grow p-4">
          <div className="school-stats mb-4 flex flex-wrap gap-3">
            <div className="stat flex items-center gap-1.5 text-[13px] font-[450] tracking-[0.01em] text-[#5F5F5F]">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 text-[#565656]">
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z" />
              </svg>
              <span className="text-[#464646]">{school.location}</span>
            </div>
            <div className="stat flex items-center gap-1.5 text-[13px] font-[450] tracking-[0.01em] text-[#5F5F5F]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 text-[#565656]">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.49L12 4.72 9.978 9.806l-5.71.49 4.254 3.89-1.166 5.519L12 16.599Zm-9.733-6.102c-.513-.527-.257-1.58.512-1.58l6.147-.528 2.306-5.797c.256-.79 1.28-.79 1.536 0l2.306 5.797 6.147.527c.769 0 1.025 1.054.512 1.581l-4.61 4.216 1.28 6.061c.257.79-.512 1.318-1.28 1.054L12 18.404l-5.123 3.425c-.768.527-1.537-.263-1.28-1.054l1.28-6.06z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[#464646]">{school.rating}</span>
            </div>
          </div>
        </div>

        <div className="school-footer relative z-20 flex h-[54px] items-center justify-between border-t border-[rgba(1,104,83,0.1)] bg-white px-4 py-3">
          <div className="rating-filter flex items-center">
            <RatingCheckmarks rating={school.myRating} onRatingChange={(rating) => onRatingChange(index, rating)} />
          </div>
          <button
            type="button"
            aria-label="Create or view notes"
            className="notes-count flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] text-[#5F5F5F] transition-colors hover:bg-[#F5F5F7] hover:text-[#089E68]"
            onClick={() => onCreateNote(index)}
          >
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#089E68]"
            >
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
              <path d="M16 7h4"></path>
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3"></path>
            </svg>
            <span>{school.notes ? school.notes.length : 0}</span>
          </button>
        </div>

        <div className="hover-overlay invisible absolute left-0 top-0 z-30 flex h-[calc(100%-54px)] w-full flex-col rounded-t-[12px] bg-[rgba(255,255,255,0.98)] p-6 opacity-0 transition-[opacity,visibility] duration-300 group-hover:visible group-hover:opacity-100">
          <div className="hover-header mb-3 flex shrink-0 gap-3">
            <Image
              src={school.avatar}
              alt={school.name}
              width={40}
              height={40}
              className="school-avatar h-10 w-10 rounded-lg object-cover"
            />
            <div className="hover-name-row flex flex-1 items-start justify-between">
              <div className="hover-school-name mr-2 text-base font-semibold text-[#464646] transition-colors duration-200 hover:cursor-pointer hover:text-[#016853] hover:underline hover:decoration-[#016853]">
                {truncateWords(school.name, 3)}
              </div>
              <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                <SchoolCardContextMenu
                  schoolName={school.name}
                  buttonClassName="flex h-6 min-w-6 items-center justify-center rounded text-[#5F5F5F] transition-all duration-200 hover:bg-[#F5F5F7] hover:text-[#464646]"
                  iconClassName="h-4 w-4"
                  preferredPlacement="bottom"
                />
              </div>
            </div>
          </div>

          <div className="hover-stats mb-4 flex shrink-0 gap-3">
            <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5F5F5F]">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>{school.dateSaved}</span>
            </div>

            <div ref={statusDropdownRef} className="status-dropdown relative">
              <button
                ref={triggerRef}
                type="button"
                className="hover-stat flex items-center rounded px-2.5 py-1.5 transition-all duration-200 hover:bg-[#F5F5F7]"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsStatusDropdownOpen((prev) => !prev);
                }}
              >
                <svg className="status-icon h-4 w-4" viewBox="0 0 16 16" fill={statusColor}>
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
                <span className="status-text ml-1.5 text-[13px]" style={{ color: statusColor }}>
                  {truncateText(school.status || "Add Status", 11)}
                </span>
                <svg className="dropdown-arrow ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path
                    fill={statusColor}
                    d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              {isStatusDropdownOpen && portalPos && createPortal(
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
                      width: 192,
                      background: 'white',
                      borderRadius: 8,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      padding: '8px 0',
                    }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        data-status={option.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          fontSize: 14,
                          color: '#4A4A4A',
                          width: '100%',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          borderRadius: 4,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F7')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={(event) => {
                          event.stopPropagation();
                          onStatusChange(index, option.value);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: option.color, flexShrink: 0 }} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>

          <div className="notes-container mb-3 flex min-h-[50px] max-h-[65%] flex-1 flex-col overflow-y-auto">
            {school.notes && school.notes.length > 0 ? (
              school.notes.map((note) => (
                <div key={note.id} className="note mb-3 rounded-lg border border-[#EAEDF2] bg-[#F8F9FB] p-3 last:mb-0">
                  <div className="note-header mb-2 flex justify-between">
                    <span className="note-author text-[13px] font-medium text-[#464646]">{note.author}</span>
                    <div className="note-actions flex gap-2">
                      <button type="button" className="note-action bg-none p-0 text-xs text-[#346DC2]" onClick={() => onEditNote(index, note.id)}>
                        EDIT
                      </button>
                      <button type="button" className="note-action bg-none p-0 text-xs text-[#346DC2]" onClick={() => onDeleteNote(index, note.id)}>
                        DELETE
                      </button>
                    </div>
                  </div>
                  <div className="note-content text-sm leading-[1.5] text-[#4A4A4A]">{note.content}</div>
                  <div className="note-timestamp mt-1 text-right text-[11px] text-[#9CA3AF]">
                    <span className="time-display mr-1 inline-block text-xs text-[#5F5F5F]">{note.timestamp}</span>
                    <span className="time-display inline-block text-xs text-[#5F5F5F]">{note.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="note-placeholder my-2.5 text-sm text-[#9CA3AF]">No notes yet</div>
            )}
          </div>

          <button
            type="button"
            className="create-note mb-2 mt-auto inline-flex items-center text-left text-sm font-medium text-[#346DC2] hover:underline"
            onClick={() => onCreateNote(index)}
          >
            Create Note
          </button>
        </div>
      </article>
    </div>
  );
};
