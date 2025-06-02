import React, { JSX, useState } from "react";
import { CollectionsSchool, Note, RatingCheckmarks } from "../Card";
import { NotesModal } from "../../modals/NotesModal";

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

export const CardClassic: React.FC<Props> = ({
  school,
  index,
  onCreateNote,
  onDeleteNote,
  onEditNote,
  onRatingChange,
  onStatusChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);

  const handleModalClose = () => setIsModalOpen((prev) => !prev);

  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + ".." : text;
  };

  const truncateName = (name: string): string => {
    if (name.length > 28) {
      const shortened = name.substring(0, 26);
      return shortened.substring(0, shortened.lastIndexOf(" ")) + "..";
    }
    return name;
  };

  const getStatusColor = (status?: string): string => {
    const statusColors: Record<string, string> = {
      researching: "#3952a0",
      "scheduled-tour": "#008ac2",
      "visited-campus": "#00817c",
      "started-application": "#009666",
      applied: "#068c2e",
      accepted: "#4f8a2a",
      enrolled: "#e27800",
      "clear-status": "#787878",
    };
    const statusKey = status
      ? status.toLowerCase().replace(/\s+/g, "-")
      : "clear-status";
    return statusColors[statusKey] || statusColors["clear-status"];
  };

  interface StatusOption {
    label: string;
    value: string;
    color: string;
  }

  const statusOptions: StatusOption[] = [
    { label: "Researching", value: "Researching", color: "#3952a0" },
    { label: "Scheduled Tour", value: "Scheduled Tour", color: "#008ac2" },
    { label: "Visited Campus", value: "Visited Campus", color: "#00817c" },
    {
      label: "Started Application",
      value: "Started Application",
      color: "#009666",
    },
    { label: "Applied", value: "Applied", color: "#068c2e" },
    { label: "Accepted", value: "Accepted", color: "#4f8a2a" },
    { label: "Enrolled", value: "Enrolled", color: "#e27800" },
    { label: "Clear Status", value: "", color: "#787878" },
  ];

  interface SpecialtyStyle {
    bg: string;
    text: string;
  }

  const specialtyStyles: Record<string, SpecialtyStyle> = {
    hot: { bg: "bg-red-100", text: "text-red-500" },
    "instant-book": { bg: "bg-blue-100", text: "text-blue-600" },
    sponsored: { bg: "bg-yellow-100", text: "text-yellow-600" },
  };

  const specialtyIcons: Record<string, JSX.Element> = {
    hot: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5 dishwasher0214 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
          fill="currentColor"
        />
      </svg>
    ),
    "instant-book": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
          fill="currentColor"
        />
      </svg>
    ),
    sponsored: (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    ),
  };

  return (
    <div>
      <div className="group relative bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-teal-200 hover:z-10">
        {/* Specialty Badge or Empty Placeholder */}
        {school.specialty ? (
          <div
            className={`absolute top-0 left-0 right-0 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-t-xl ${
              specialtyStyles[school.specialty].bg
            } ${specialtyStyles[school.specialty].text}`}
          >
            {specialtyIcons[school.specialty]}
            {school.specialty === "hot"
              ? "High demand"
              : school.specialty === "instant-book"
              ? "Instant book"
              : "Sponsored"}
          </div>
        ) : (
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl z-[1]"></div>
        )}

        {/* Card Header */}
        <div className="flex items-start gap-3 px-4 pt-10 pb-3 h-[108px]">
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {school.grade}
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-700 line-clamp-2">
              {truncateName(school.name)}
            </div>
            {school.ranking && (
              <div className="text-xs font-medium text-teal-600 line-clamp-2">
                {school.ranking}
              </div>
            )}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative px-3 pt-3">
          <img
            src={school.image}
            alt={school.name}
            className="w-full h-[140px] object-cover rounded-lg"
          />
          <div className="absolute bottom-1 left-[18px] bg-white px-2 pt-1 text-[11px] font-semibold text-gray-700 uppercase rounded-t-md h-6 flex items-center shadow-[0_-1px_4px_rgba(0,0,0,0.1)] z-[2]">
            {school.schoolType}
          </div>
        </div>

        {/* School Content */}
        <div className="p-4 flex flex-col">
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
              <svg
                className="w-4 h-4 text-teal-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
              </svg>
              <div className="flex flex-col">
                <div className="text-[10px] text-gray-500">Location</div>
                <div className="text-xs text-gray-700 font-medium">
                  {school.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
              <svg
                className="w-4 h-4 text-teal-600 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
              <div className="flex flex-col">
                <div className="text-[10px] text-gray-500">Rating</div>
                <div className="text-xs text-gray-700 font-medium">
                  <strong>{school.rating}</strong> ({school.reviews})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center gap-2">
          <RatingCheckmarks
            rating={school.myRating || 0}
            onRatingChange={(rating) => onRatingChange(index, rating)}
          />
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            <svg
              className="w-4 h-4 text-teal-600"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
              <path d="M16 7h4"></path>
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3"></path>
            </svg>
            <span>{school.notes ? school.notes.length : 0}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute top-0 left-0 w-full h-[calc(100%-60px)] bg-white p-6 opacity-0 invisible transition-all duration-300 flex flex-col z-10 rounded-t-xl group-hover:visible group-hover:opacity-100">
          <div className="flex items-center gap-3 mb-3 relative w-full">
            <img
              src={school.avatar}
              alt={school.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="text-base font-semibold text-gray-700 cursor-pointer hover:text-teal-700 hover:underline max-w-[calc(100%-50px)] line-clamp-2">
              {truncateText(school.name, 25)}
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-auto flex-shrink-0"
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
              {showTooltip && (
                <div className="absolute top-full right-0 w-44 bg-white rounded-lg shadow-lg z-[1000]">
                  <div className="flex items-center gap-2 p-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                    Add to Dashboard
                  </div>
                  <div className="flex items-center gap-2 p-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Share School
                  </div>
                  <div className="flex items-center gap-2 p-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    </svg>
                    Hide School
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 relative group/date-added">
              <svg
                className="w-4 h-4 text-teal-400"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5 5 5C14.5555 5 13.1251 5 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                  fill="currentColor"
                />
              </svg>
              <span>{(school.dateAdded || "Unknown").substring(0, 7)}</span>
              <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded invisible group-hover/date-added:visible z-[1000] whitespace-nowrap">
                Added {school.dateAdded || "Unknown date"}
              </div>
            </div>
            <div
              className="relative flex items-center cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100"
              onClick={() => setShowStatusOptions(!showStatusOptions)}
            >
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill={getStatusColor(school.status)}
                  width="16"
                  height="16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 0 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
                <span
                  className="text-sm max-w-[95px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ color: getStatusColor(school.status) }}
                >
                  {truncateText(school.status || "Add Status", 8)}
                </span>
                <svg
                  className="w-3 h-3 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={getStatusColor(school.status)}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {showStatusOptions && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg z-[9999]">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 p-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={() => onStatusChange(index, option.value)}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: option.color }}
                      ></div>
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-[100px] flex flex-col overflow-y-auto mb-3">
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
              <div className="text-gray-400 text-sm my-2.5">No notes yet</div>
            )}
          </div>
          <div
            className="text-sm font-medium text-blue-600 cursor-pointer hover:underline mt-auto mb-2"
            onClick={() => onCreateNote(index)}
          >
            Create Note
          </div>
        </div>
      </div>
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
