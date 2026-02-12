import React, { useEffect, useRef, useState } from "react";
import { CollectionsSchool, Note, RatingCheckmarks } from "../Card";
import { NotesModal } from "../../modals/NotesModal";
import Image from "next/image";
import { SchoolCardContextMenu } from "@/components/school/explore/SchoolCardContextMenu";

interface Props {
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
  { label: "Researching", value: "Researching", color: "#395da0" },
  { label: "Scheduled Tour", value: "Scheduled Tour", color: "#008ac2" },
  { label: "Visited Campus", value: "Visited Campus", color: "#00817c" },
  { label: "Started Application", value: "Started Application", color: "#009666" },
  { label: "Applied", value: "Applied", color: "#068c2e" },
  { label: "Accepted", value: "Accepted", color: "#4f8a2a" },
  { label: "Enrolled", value: "Enrolled", color: "#e27800" },
  { label: "Clear Status", value: "", color: "#787878" },
] as const;

const getStatusColor = (status?: string): string => {
  const statusMap: Record<string, string> = {
    researching: "#395da0",
    "scheduled-tour": "#008ac2",
    "visited-campus": "#00817c",
    "started-application": "#009666",
    applied: "#068c2e",
    accepted: "#4f8a2a",
    enrolled: "#e27800",
    "clear-status": "#787878",
  };
  const key = status ? status.toLowerCase().replace(/\s+/g, "-") : "clear-status";
  return statusMap[key] || statusMap["clear-status"];
};

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}..` : text;
};

const truncateName = (name: string): string => {
  if (name.length > 28) {
    const shortened = name.substring(0, 26);
    const cutAt = shortened.lastIndexOf(" ");
    return `${(cutAt > 0 ? shortened.substring(0, cutAt) : shortened)}..`;
  }
  return name;
};

const truncateNameByWords = (text: string | undefined, maxWords = 3): string => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const formatSchoolTypeLabel = (label: string): string => {
  if (!label) return "";
  return label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

const specialtyStyles: Record<string, { bg: string; text: string; label: string }> = {
  hot: {
    bg: "bg-[rgba(255,77,77,0.1)]",
    text: "text-[#FF4D4D]",
    label: "High demand",
  },
  "instant-book": {
    bg: "bg-[rgba(29,119,189,0.1)]",
    text: "text-[#1D77BD]",
    label: "Instant book",
  },
  sponsored: {
    bg: "bg-[rgba(255,153,0,0.1)]",
    text: "text-[#FF9900]",
    label: "Sponsored",
  },
};

const specialtyIcon = (specialty?: string) => {
  if (specialty === "hot") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (specialty === "instant-book") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (specialty === "sponsored") {
    return (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    );
  }
  return null;
};



export const CardClassic: React.FC<Props> = ({
  school,
  index,
  onCreateNote,
  onDeleteNote,
  onEditNote,
  onRatingChange,
  onStatusChange,
}) => {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (statusRef.current && !statusRef.current.contains(target)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const statusColor = getStatusColor(school.status);
  const shortDate = (school.dateAdded || school.dateSaved || "Unknown").substring(0, 7);
  const ratingValue = school.rating ? school.rating.split(" ")[0] : "4.9";

  return (
    <div className="relative">
      <div className="group relative z-[1] flex flex-col overflow-visible rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(1,104,83,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:z-10">
        {school.specialty ? (
          <div
            className={`absolute left-0 right-0 top-0 z-[2] flex items-center justify-center gap-1.5 rounded-t-[12px] px-3 py-2 text-[13px] font-medium ${specialtyStyles[school.specialty]?.bg || "bg-gray-100"
              } ${specialtyStyles[school.specialty]?.text || "text-[#4A4A4A]"}`}
          >
            {specialtyIcon(school.specialty)}
            {specialtyStyles[school.specialty]?.label || ""}
          </div>
        ) : (
          school.schoolType ? (
            <div className="absolute left-0 right-0 top-0 z-[2] flex items-center justify-center gap-1.5 rounded-t-[12px] bg-[rgba(107,114,128,0.12)] px-3 py-2 text-[13px] font-medium text-[#6B7280]">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833Z" fill="currentColor" />
              </svg>
              {formatSchoolTypeLabel(school.schoolType)}
            </div>
          ) : (
            <div className="absolute left-0 right-0 top-0 z-[1] h-8 rounded-t-[12px] bg-[#F5F5F7]" />
          )
        )}

        <div className="flex h-[108px] items-start gap-3 px-4 pb-3 pt-10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00DF8B] text-sm font-semibold text-white">
            {school.grade}
          </div>
          <div className="min-w-0 flex-1">
            <div className="line-clamp-2 text-base font-semibold leading-[1.3] text-[#464646]">
              {truncateNameByWords(school.name, 3)}
            </div>
            {school.ranking ? (
              <div className="line-clamp-2 text-xs font-medium leading-[1.4] text-[#089E68]">
                {school.ranking}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative px-3 pt-3">
          <Image
            src={school.image}
            alt={school.name}
            width={560}
            height={280}
            className="h-[140px] w-full rounded-lg object-cover"
          />
          <div className="absolute bottom-0 left-[18px] z-[2] flex h-6 items-center rounded-t-[4px] bg-white px-2 text-[11px] font-semibold uppercase tracking-[0.02em] text-[#464646] shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
            {formatSchoolTypeLabel(school.schoolType)}
          </div>
        </div>

        <div className="flex flex-col p-4">
          <div className="mb-4 grid gap-[10px]" style={{ gridTemplateColumns: '3fr 2fr' }}>
            <div className="flex items-center gap-2 rounded-lg bg-[#F9FAFB] p-2.5">
              <svg className="h-4 w-4 shrink-0 text-[#089E68]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] leading-none text-[#5F5F5F]">Location</span>
                <span className="text-xs font-medium leading-[1.3] text-[#464646]">{school.location && school.location.trim().split(/\s+/).length > 2 ? school.location.trim().split(/\s+/).slice(0, 2).join(" ") + "..." : school.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#F9FAFB] p-2.5">
              <svg
                className="h-4 w-4 shrink-0 text-[#089E68]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] leading-none text-[#5F5F5F]">Rating</span>
                <span className="text-xs font-medium leading-[1.3] text-[#464646]">
                  <strong>{ratingValue}</strong> ({school.reviews})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-[rgba(0,0,0,0.06)] px-4 py-3">
          <RatingCheckmarks rating={school.myRating || 0} onRatingChange={(rating) => onRatingChange(index, rating)} />
          <button
            type="button"
            onClick={() => setIsNotesModalOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#464646]"
          >
            <svg
              className="h-4 w-4 text-[#089E68]"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
              <path d="M16 7h4" />
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
            </svg>
            <span>{school.notes?.length || 0}</span>
          </button>
        </div>

        <div
          className="invisible absolute left-0 top-0 z-10 flex w-full flex-col rounded-t-[12px] bg-[rgba(255,255,255,0.98)] p-6 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100"
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="mb-3 flex w-full items-center gap-3">
            <Image
              src={school.avatar}
              alt={school.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="max-w-[calc(100%-88px)] cursor-pointer text-base font-semibold leading-[1.2] text-[#464646] transition-colors hover:text-[#016853] hover:underline">
              {school.name}
            </div>
            <div className="relative ml-auto">
              <SchoolCardContextMenu
                schoolName={school.name}
                preferredPlacement="top"
                buttonClassName="flex h-8 w-8 items-center justify-center rounded-full text-[#5F5F5F] transition-colors hover:bg-[#F5F5F7] hover:text-[#464646] cursor-pointer"
              />
            </div>
          </div>

          <div className="mb-4 flex gap-3">
            <div className="relative flex items-center gap-1.5 text-[13px] text-[#5F5F5F]" title={`Added ${school.dateAdded || school.dateSaved || "Unknown date"}`}>
              <svg className="h-4 w-4 text-[#089E68]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                  fill="currentColor"
                />
              </svg>
              <span>{shortDate}</span>
            </div>

            <div ref={statusRef} className="relative">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-[rgba(0,0,0,0.05)]"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsStatusOpen((prev) => !prev);
                }}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill={statusColor} width="16" height="16" aria-hidden="true">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                </svg>
                <span className="max-w-[95px] whitespace-nowrap overflow-hidden text-ellipsis text-[13px]" style={{ color: statusColor }}>
                  {truncateText(school.status || "Add Status", 8)}
                </span>
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={statusColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                className={`absolute left-0 top-[calc(100%+4px)] z-[9999] w-[200px] overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${isStatusOpen ? "block" : "hidden"
                  }`}
              >
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={`${option.label}-${option.value}`}
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#4A4A4A] transition-colors hover:bg-[#F5F5F7]"
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange(index, option.value);
                      setIsStatusOpen(false);
                    }}
                  >
                    <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: option.color }} />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-3 flex min-h-[100px] flex-1 flex-col overflow-y-auto">
            {school.notes && school.notes.length > 0 ? (
              school.notes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  onEdit={() => onEditNote(index, note.id)}
                  onDelete={() => onDeleteNote(index, note.id)}
                />
              ))
            ) : (
              <div className="my-2.5 text-sm text-[#9CA3AF]">No notes yet</div>
            )}
          </div>

          <button
            type="button"
            className="mb-2 mt-auto flex items-center text-left text-sm font-medium text-[#346DC2] hover:underline"
            onClick={() => onCreateNote(index)}
          >
            Create Note
          </button>
        </div>
      </div>

      <NotesModal
        onClose={() => setIsNotesModalOpen(false)}
        isOpen={isNotesModalOpen}
        index={index}
        onCreateNote={onCreateNote}
        onDeleteNote={onDeleteNote}
        onEditNote={onEditNote}
        school={school}
      />
    </div>
  );
};
