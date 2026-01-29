import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CollectionsSchool, Note, RatingCheckmarks } from "../Card";
import { NotesModal } from "../../modals/NotesModal";

interface SchoolCardProps {
  school: CollectionsSchool;
  index: number;
  layout: string;
  onRatingChange: (index: number, rating: number) => void;
  onStatusChange: (index: number, status: string) => void;
  onCreateNote: (index: number) => void; // Updated to include content
  onEditNote: (index: number, noteId: number) => void;
  onDeleteNote: (index: number, noteId: number) => void;
}

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<boolean>(false);

  const handleModalClose = () => setIsModalOpen((prev) => !prev);

  // Debug school.notes to check if data is present
  useEffect(() => {
    console.log(`SchoolCard ${school.name} notes:`, school.notes);
  }, [school.notes]);

  const handleRatingClick = (rating: number) => {
    const newRating = school.myRating === rating && rating === 1 ? 0 : rating;
    onRatingChange(index, newRating);
  };

  const handleStatusSelect = (status: string) => {
    onStatusChange(index, status);
    setIsStatusDropdownOpen(false);
  };

  const truncateText = (
    text: string | undefined,
    maxLength: number
  ): string => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + ".." : text;
  };

  // Adjust card width based on layout prop
  const cardClass = layout === "grid" ? "w-full max-w-[384px]" : "w-full";

  return (
    <div>
      <div
        className={`group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${cardClass}`}
      >
        {/* Image Container */}
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={school.image}
            alt={school.name}
            layout="fill"
            objectFit="cover"
            className="school-image"
          />
          <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm z-10 flex items-center gap-1">
            {school.specialty === "hot" && (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-500"
                >
                  <path
                    d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18432 5.3522 8.41889 5.24055C8.83603 4.99258 9.8492 5.09796 9.47378 5.61251C9.75895 6.23245 9.98207 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
                    fill="currentColor"
                  ></path>
                </svg>
                High demand
              </>
            )}
            {school.specialty === "instant-book" && (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-600"
                >
                  <path
                    d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Instant book
              </>
            )}
            {school.specialty === "sponsored" && (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-yellow-500"
                >
                  <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z"></path>
                </svg>
                Sponsored
              </>
            )}
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:bg-green-100 hover:text-green-800 transition-all duration-200 z-10">
            <svg fill="none" viewBox="0 0 16 16" className="w-4 h-4">
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="currentColor"
                d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
              ></path>
            </svg>
          </div>
          <div className="absolute bottom-0 left-2.5 bg-white px-2 pt-1 text-[11px] font-semibold text-gray-600 uppercase rounded-t-md h-6 flex items-center shadow-[0_-1px_4px_rgba(0,0,0,0.1)] z-10">
            {school.schoolType}
          </div>
        </div>

        {/* School Content */}
        <div className="p-4 flex-grow">
          {school.ranking && school.ranking.trim() !== "" && (
            <div className="mb-2">
              <div className="text-green-600 text-xs font-medium truncate">
                {school.ranking}
              </div>
            </div>
          )}
          <h3 className="text-base font-semibold text-gray-700 mb-1.5">
            {school.name}
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gray-600"
              >
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
                <path
                  d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3
c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8
C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1
c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1
C18.6,5.5,19.8,8.4,19.2,11.2z"
                ></path>
              </svg>
              <span className="text-gray-700">{school.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.49L12 4.72 9.978 9.806l-5.71.49 4.254 3.89-1.166 5.519L12 16.599Zm-9.733-6.102c-.513-.527-.257-1.58.512-1.58l6.147-.528 2.306-5.797c.256-.79 1.28-.79 1.536 0l2.306 5.797 6.147.527c.769 0 1.025 1.054.512 1.581l-4.61 4.216 1.28 6.061c.257.79-.512 1.318-1.28 1.054L12 18.404l-5.123 3.425c-.768.527-1.537-.263-1.280-1.054l1.280-6.06z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{school.rating}</span>
            </div>
          </div>
        </div>

        {/* School Footer */}
        <div className="p-4 border-t border-green-100/10 flex items-center justify-between h-[60px] bg-white z-20">
          <div className="flex items-center">
            <RatingCheckmarks
              rating={school.myRating}
              onRatingChange={(rating) => onRatingChange(index, rating)}
            />
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-gray-600"
          >
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-green-600"
            >
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
              <path d="M16 7h4"></path>
              <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3"></path>
            </svg>
            <span>{school.notes?.length || 0}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute top-0 left-0 w-full h-[calc(100%-60px)] bg-white p-6 opacity-0 invisible transition-all duration-300 flex flex-col z-10 rounded-t-xl group-hover:opacity-100 group-hover:visible">
          <div className="flex gap-3 mb-3 flex-shrink-0">
            <Image
              src={school.avatar}
              alt={school.name}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <div className="flex flex-1 justify-between items-start">
              <div
                className="text-base font-semibold text-gray-700 hover:text-green-800 hover:underline hover:decoration-green-800 cursor-pointer"
                onClick={() => console.log("View school details")}
              >
                {school.name}
              </div>
              <div
                className="min-w-6 h-6 flex items-center justify-center cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-700 rounded transition-all duration-200 relative"
                onClick={() => setIsTooltipOpen(!isTooltipOpen)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-4 h-4"
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                </svg>
                <div
                  className={`absolute top-full right-0 bg-white rounded-lg shadow-lg p-2 min-w-[150px] z-50 transition-all duration-200 ${
                    isTooltipOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="absolute top-[-6px] right-2.5 w-3 h-3 bg-white rotate-45 shadow-[-2px_-2px_5px_rgba(0,0,0,0.06)]"></div>
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                    Share
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                    Add to Comparison
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                    View Details
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-4 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>{school.dateSaved}</span>
            </div>
            <div
              className="relative status-dropdown"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              <div className="flex items-center px-2.5 py-1.5 rounded hover:bg-gray-100 transition-all duration-200">
                <svg
                  className={`w-4 h-4 mr-2 ${
                    school.status
                      ? school.status.toLowerCase().replace(/\s+/g, "-")
                      : "add-status"
                  }`}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
                <span
                  className={`text-xs ${
                    school.status
                      ? school.status.toLowerCase().replace(/\s+/g, "-")
                      : "add-status"
                  }`}
                >
                  {truncateText(school.status, 11)}
                </span>
                <svg
                  className="w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div
                className={`absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg p-2 mt-1 z-50 transition-all duration-200 ${
                  isStatusDropdownOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                {[
                  "Researching",
                  "Scheduled Tour",
                  "Visited Campus",
                  "Started Application",
                  "Applied",
                  "Accepted",
                  "Enrolled",
                  "",
                ].map((status) => (
                  <div
                    key={status}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusSelect(status)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        status
                          ? status.toLowerCase().replace(/\s+/g, "-")
                          : "clear-status"
                      }`}
                    ></div>
                    <span>{status || "Clear Status"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto mb-2 min-h-[130px] max-h-[65%]">
            {school.notes && school.notes.length > 0 ? (
              school.notes.map((note) => (
                <Note
                  note={note}
                  onDelete={() => onDeleteNote(index, note.id)}
                  onEdit={() => onEditNote(index, note.id)}
                  key={note.id}
                />
              ))
            ) : (
              <div className="note-placeholder text-sm text-gray-600 my-2.5">
                No notes yet
              </div>
            )}
          </div>
          <div
            className="text-sm font-medium text-blue-600 cursor-pointer hover:underline flex items-center mt-auto mb-2"
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
