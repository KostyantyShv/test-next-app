"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CollectionsSchool, RatingCheckmarks, truncateText } from "../Card";
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

const getStatusColor = (status: string) =>
  STATUS_OPTIONS.find((o) => o.status === status)?.color ?? "#787878";

const specialtyIcon = (specialty?: string) => {
  if (specialty === "hot")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z" fill="currentColor" />
      </svg>
    );
  if (specialty === "instant-book")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z" fill="currentColor" />
      </svg>
    );
  if (specialty === "sponsored")
    return (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    );
  return null;
};

const specialtyText = (s?: string) =>
  s === "hot" ? "High demand" : s === "instant-book" ? "Instant book" : s === "sponsored" ? "Sponsored" : "";

export interface CardTableMobileProps {
  schools: CollectionsSchool[];
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNote: (index: number) => void;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
}

export const CardTableMobile: React.FC<CardTableMobileProps> = ({
  schools,
  onRatingChange,
  onStatusChange,
  onCreateNote,
  onEditNote,
  onDeleteNote,
}) => {
  return (
    <div className="table-list collections-mobile-table-list flex flex-col gap-3 md:hidden">
      {schools.map((school, index) => (
        <MobileTableRow
          key={index}
          school={school}
          index={index}
          onRatingChange={onRatingChange}
          onStatusChange={onStatusChange}
          onCreateNote={onCreateNote}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};

const MobileTableRow: React.FC<{
  school: CollectionsSchool;
  index: number;
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNote: (index: number) => void;
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
}> = ({
  school,
  index,
  onRatingChange,
  onStatusChange,
  onCreateNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node))
        setIsStatusOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const statusClass = school.status ? school.status.toLowerCase().replace(/\s+/g, "-") : "add-status";
  const statusColor = getStatusColor(school.status);
  const truncatedStatus = truncateText(school.status || "Add Status", 10);

  return (
    <div className="table-row rounded-xl overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]" data-school-id={index}>
      <div className="row-header flex items-center gap-2.5 p-3 relative">
        <button
          type="button"
          className="expand-button w-8 h-8 shrink-0 rounded-md bg-[#F1F3F6] border-0 cursor-pointer flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
          onClick={() => onCreateNote(index)}
          aria-label={`Open notes for ${school.name}`}
        >
          <svg height="16" aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" className="stroke-[#6b7280]">
            <path d="M19 9l-7 7-7-7" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
        <div className="school-info flex flex-1 min-w-0">
          <Image
            src={school.avatar}
            alt={school.name}
            width={40}
            height={40}
            className="school-avatar w-10 h-10 rounded object-cover shrink-0 mr-2.5"
          />
          <div className="school-details flex flex-col min-w-0">
            <div className="school-name font-semibold text-[#464646] text-sm whitespace-nowrap overflow-hidden text-ellipsis mb-1">
              {truncateText(school.name, 25)}
            </div>
            {school.ranking ? (
              <div className="ranking-text text-[#089E68] text-[11px] whitespace-nowrap overflow-hidden text-ellipsis">
                {truncateText(school.ranking, 30)}
              </div>
            ) : null}
          </div>
        </div>
        <div className="options-button shrink-0 w-8 h-8 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#F5F5F7] transition-colors relative" onClick={(e) => e.stopPropagation()}>
          <SchoolCardContextMenu
            schoolName={school.name}
            buttonClassName="w-full h-full flex items-center justify-center text-[#5F5F5F]"
            iconClassName="w-[18px] h-[18px]"
            preferredPlacement="bottom"
          />
        </div>
      </div>
      <div className="row-body flex flex-wrap gap-3 px-3 pb-3">
        <div className="row-section flex-[1_0_45%] min-w-[120px]">
          <div className="section-label text-[11px] uppercase text-[#5F5F5F] mb-1 tracking-wide">
            Info
          </div>
          <div className="view-links flex flex-wrap gap-1">
            <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center relative group hover:bg-[#EBFCF4] transition-all">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-[#464646]">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462Z" />
              </svg>
              <div className="tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#333] text-white py-1.5 px-2 rounded text-[11px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                {school.schoolType}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#333]" />
              </div>
            </div>
            <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center relative group hover:bg-[#EBFCF4] transition-all">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-[#464646]">
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z" />
              </svg>
              <div className="tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#333] text-white py-1.5 px-2 rounded text-[11px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                {school.location}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#333]" />
              </div>
            </div>
            <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center relative group hover:bg-[#EBFCF4] transition-all" data-type="rating">
              <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 text-[#464646]">
                <path d="M16,5 C17.6740328,5 18.9572798,6.75906773 20.1820293,10.1965199 L20.2957597,10.523 L20.4998436,10.5278711 L21.0507134,10.5494869 C28.1449808,10.9055091 28.960836,14.0701247 23.052575,18.5927146 L22.9507597,18.668 L23.0057546,18.8463323 L23.1690896,19.4119807 C24.3257376,23.5767684 23.9360417,25.9878351 21.4504998,26.0868275 L21.2867597,26.089 L21.1083138,26.0851827 C19.9051473,26.0204373 18.3490735,25.3033501 16.3553435,23.9493995 L15.9977597,23.703 L15.9597677,23.730253 C13.813307,25.2266213 12.1555732,26.0179918 10.8883813,26.0861807 L10.71,26.0910004 C8.07790504,26.0910004 7.64622088,23.6665041 8.82882373,19.4121181 L9.04575967,18.669 L8.94545864,18.5935046 C2.88954892,13.9557014 3.90141196,10.7461499 11.5002374,10.5278713 L11.7017597,10.523 L11.817063,10.1971795 C13.0013762,6.86719608 14.2433134,5.11162438 15.843968,5.00515309 L16,5 Z M16,7 C15.4483404,7 14.4297044,8.57213104 13.3774237,11.8238846 C13.2439049,12.2364838 12.859665,12.516 12.426,12.516 L12.35,12.516 C8.95923652,12.516 7.16962692,12.9974599 7.00801334,13.5103086 C6.84379553,14.0314214 8.03222181,15.4827681 10.8001531,17.4800772 C11.1532939,17.7348997 11.3009239,18.1889596 11.1651678,18.6027389 C9.87644318,22.5307207 9.99002235,24.0910013 10.7105907,24.0910013 C11.5600344,24.0915023 13.1754133,23.2923662 15.4095743,21.6664487 C15.7601989,21.4112806 16.2353263,21.4111745 16.5860648,21.6661862 C18.821557,23.2915468 20.4371881,24.0905021 21.2854083,24.0900002 L21.3423144,24.0867854 C21.9752115,24.0111745 22.076985,22.5959402 21.0271933,19.2106468 L20.8327637,18.60153 C20.6970983,18.1877203 20.8448288,17.7336922 21.1980266,17.4789475 C23.9668282,15.4819435 25.1559237,14.0306914 24.9919187,13.5098428 C24.8359367,13.014474 23.1584346,12.5481273 19.9837548,12.517588 L19.574,12.516 C19.1405769,12.516 18.7564934,12.2367903 18.6227785,11.8245089 L18.4192276,11.2161124 C17.4386617,8.37656197 16.5136056,7 16,7 Z" />
              </svg>
              <div className="tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#333] text-white py-1.5 px-2 rounded text-[11px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                {school.rating}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#333]" />
              </div>
            </div>
            <div className="view-link w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center relative group hover:bg-[#EBFCF4] transition-all">
              <svg viewBox="0 0 32 32" width="16" height="16" fill="none" className="text-[#464646]">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z" fill="currentColor" />
              </svg>
              <div className="tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#333] text-white py-1.5 px-2 rounded text-[11px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                {school.dateSaved}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#333]" />
              </div>
            </div>
            {school.specialty ? (
              <div className={`specialty-badge-small w-8 h-8 rounded-full flex items-center justify-center relative group hover:-translate-y-0.5 transition-all ${school.specialty === "hot" ? "bg-[rgba(255,77,77,0.1)]" : school.specialty === "instant-book" ? "bg-[rgba(29,119,189,0.1)]" : "bg-[rgba(255,153,0,0.1)]"}`}>
                <span className={school.specialty === "hot" ? "text-[#FF4D4D]" : school.specialty === "instant-book" ? "text-[#1D77BD]" : "text-[#FF9900]"}>
                  {specialtyIcon(school.specialty)}
                </span>
                <div className="tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#333] text-white py-1.5 px-2 rounded text-[11px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                  {specialtyText(school.specialty)}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#333]" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="row-section flex-[1_0_45%] min-w-[120px]">
          <div className="section-label text-[11px] uppercase text-[#5F5F5F] mb-1 tracking-wide">
            Status
          </div>
          <div
            ref={statusRef}
            className={`status-dropdown collections-mobile-table-status relative cursor-pointer flex items-center py-1.5 px-2.5 rounded transition-all w-fit origin-left scale-[0.8] hover:bg-[#F5F5F7] ${isStatusOpen ? "open" : ""}`}
            onClick={(e) => { e.stopPropagation(); setIsStatusOpen((p) => !p); }}
          >
            <div className="status-indicator flex items-center gap-1">
              <svg className="status-icon w-3 h-3 shrink-0" viewBox="0 0 16 16" fill={statusColor}>
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
              </svg>
              <span className="status-text max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-[13px] font-medium" style={{ color: statusColor }}>
                {truncatedStatus}
              </span>
              <svg className="dropdown-arrow w-2.5 h-2.5 ml-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: statusColor }}>
                <path fill="currentColor" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </div>
            <div className="status-options absolute top-full left-0 w-[200px] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-2 mt-1 z-[100] transition-all">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.status || "clear"}
                  type="button"
                  className="status-option flex items-center py-2 px-3 text-[13px] text-[#4A4A4A] cursor-pointer w-full text-left hover:bg-[#F5F5F7] transition-all"
                  onClick={(e) => { e.stopPropagation(); onStatusChange(index, opt.status); setIsStatusOpen(false); }}
                >
                  <span className="status-color w-3 h-3 rounded-full mr-2 shrink-0" style={{ backgroundColor: opt.color }} />
                  <span>{opt.label ?? opt.status}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row-section flex-[1_0_45%] min-w-[120px]">
          <div className="section-label text-[11px] uppercase text-[#5F5F5F] mb-1 tracking-wide">
            Rating
          </div>
          <div className="rating-filter flex items-center">
            <RatingCheckmarks rating={school.myRating} onRatingChange={(r) => onRatingChange(index, r)} />
          </div>
        </div>
        <div className="row-section flex-[1_0_45%] min-w-[120px]">
          <div className="section-label text-[11px] uppercase text-[#5F5F5F] mb-1 tracking-wide">
            Notes
          </div>
          <button
            type="button"
            className="notes-count flex items-center gap-1.5 text-[13px] text-[#5F5F5F] cursor-pointer"
            onClick={() => onCreateNote(index)}
            aria-label={`View notes for ${school.name}`}
          >
            <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#089E68" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
              <path d="M16 7h4" />
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
            </svg>
            <span>{school.notes ? school.notes.length : 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
