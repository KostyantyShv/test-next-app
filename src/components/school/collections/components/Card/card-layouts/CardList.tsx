import { useState } from "react";
import {
  CollectionsSchool,
  Note,
  RatingCheckmarks,
  truncateText,
} from "../Card";
import Image from "next/image";
import { NotesModal } from "../../modals/NotesModal";

export const CardList: React.FC<{
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
  layout,
  onRatingChange,
  onStatusChange,
  onCreateNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => setIsModalOpen((prev) => !prev);

  const specialtyText =
    school.specialty === "hot"
      ? "High demand"
      : school.specialty === "instant-book"
      ? "Instant book"
      : school.specialty === "sponsored"
      ? "Sponsored"
      : "";
  const specialtyIcon =
    school.specialty === "hot" ? (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
          fill="currentColor"
        />
      </svg>
    ) : school.specialty === "instant-book" ? (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
          fill="currentColor"
        />
      </svg>
    ) : school.specialty === "sponsored" ? (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
      </svg>
    ) : null;

  const statusClass = school.status
    ? school.status.toLowerCase().replace(/\s+/g, "-")
    : "clear-status";

  return (
    <div>
      <div className="school-card relative flex bg-white rounded-lg overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] z-[1] max-w-full lg:flex-row flex-col">
        <div className="image-section w-full lg:w-[280px] flex flex-col pt-6 pr-0 lg:pr-6 pb-0 relative">
          {school.specialty && (
            <div
              className={`specialty-label absolute top-9 left-6 h-8 bg-white rounded-full flex items-center px-3 cursor-pointer transition-all duration-200 z-[2] text-xs font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${
                school.specialty === "hot"
                  ? "text-red-500"
                  : school.specialty === "instant-book"
                  ? "text-blue-600"
                  : "text-orange-500"
              }`}
            >
              {specialtyIcon}
              <span className="ml-1">{specialtyText}</span>
            </div>
          )}
          <Image
            src={school.avatar}
            alt={school.name}
            width={250}
            height={148}
            className="school-image h-[9.25rem] w-full object-cover rounded-lg lg:ml-3 ml-0"
          />
          <div className="image-buttons flex gap-2 pt-3 pb-0 lg:ml-3 ml-0 w-full">
            <div className="image-button compare-button flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium text-center cursor-pointer transition-all duration-200 hover:bg-gray-200">
              Compare
            </div>
            <div className="image-button tour-button flex-1 py-2 px-4 rounded-lg bg-green-50 text-green-700 text-sm font-medium text-center cursor-pointer transition-all duration-200 hover:bg-green-100">
              Virtual Tour
            </div>
          </div>
        </div>
        <div className="content-section flex-1 p-6 flex flex-col">
          {school.ranking && (
            <div className="ranking-text text-sm text-green-600 font-medium mb-2">
              {school.ranking}
            </div>
          )}
          <div className="school-name-container flex items-center mb-3">
            <h3 className="school-name text-xl font-semibold text-gray-700 leading-tight cursor-pointer transition-all duration-200 hover:text-green-700 hover:underline hover:decoration-green-700 flex-1">
              {school.name}
            </h3>
            <div
              className="more-options w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 relative ml-2"
              onClick={() => setIsTooltipOpen(!isTooltipOpen)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                className={`tooltip absolute top-full right-0 mt-2 w-44 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden z-50 transition-all duration-200 ${
                  isTooltipOpen ? "block" : "hidden"
                }`}
              >
                <div className="tooltip-item flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add to Dashboard
                </div>
                <div className="tooltip-item flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 2.5C17.8978 2.10217 18.4374 1.87868 19 1.87868C19.5626 1.87868 20.1022 2.10217 20.5 2.5C20.8978 2.89783 21.1213 3.43739 21.1213 4C21.1213 4.56261 20.8978 5.10217 20.5 5.5L12 14L8 15L9 11L17.5 2.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Edit School
                </div>
                <div className="tooltip-item flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6H5H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Remove
                </div>
              </div>
            </div>
          </div>
          <div className="stats-section flex flex-wrap gap-6 mb-4">
            <div className="stat flex items-center gap-2 text-sm text-gray-600">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gray-600"
              >
                <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
                <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z" />
              </svg>
              <span className="text-gray-700 font-medium">
                {school.location}
              </span>
            </div>
            <div className="stat flex items-center gap-2 text-sm text-gray-600">
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
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Added {school.dateSaved}
              </span>
            </div>
            <div className="stat flex items-center gap-2 text-sm text-gray-600">
              <svg
                viewBox="0 0 256 256"
                fill="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.50s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z" />
              </svg>
              <span className="text-gray-700 font-medium">
                <strong>{school.rating.split(" ")[0]}</strong> (
                {school.notes.length} reviews)
              </span>
            </div>
            <div className="stat flex items-center gap-2 text-sm text-gray-600">
              <svg
                onClick={() => setIsModalOpen(true)}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gray-600"
              >
                <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                <path d="M16 7h4" />
                <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
              </svg>
              <span className="text-gray-700 font-medium">
                {school.notes.length}{" "}
                <span
                  className="create-note-inline text-blue-600 text-sm font-medium cursor-pointer transition-colors duration-200 hover:underline"
                  data-school-id={index}
                  onClick={() => onCreateNote(index)}
                >
                  (Create Note)
                </span>
              </span>
            </div>
          </div>
          <div className="notes-container flex-1 min-h-[40px] max-h-[60px] flex flex-col overflow-y-auto mb-3">
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
              <div className="note-placeholder mt-2.5 text-sm text-gray-400 text-center">
                No notes yet
              </div>
            )}
          </div>
          <div className="footer-section flex flex-col lg:flex-row items-start lg:items-center justify-between mt-auto z-20">
            <div className="metrics flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div
                className="status-dropdown relative cursor-pointer z-[200]"
                data-school-id={index}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                <div className="status-indicator flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-gray-100">
                  <svg
                    className={`status-icon ${statusClass} w-4 h-4`}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                  </svg>
                  <span
                    className={`status-text ${statusClass} font-semibold text-sm`}
                  >
                    {truncateText(school.status || "Add Status", 10)}
                  </span>
                  <svg
                    className={`status-dropdown-icon ${statusClass} w-3 h-3 ml-1`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className={`status-options absolute top-full left-0 w-48 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-2 mt-1 z-[9999] max-h-[300px] overflow-y-auto transition-all duration-200 ${
                    isStatusOpen ? "block" : "hidden"
                  }`}
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
                      key={status}
                      className="status-option flex items-center px-4 py-2.5 text-sm text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-100"
                      data-status={status}
                      onClick={() => {
                        onStatusChange(index, status);
                        setIsStatusOpen(false);
                      }}
                    >
                      <div
                        className={`status-color w-3 h-3 rounded-full mr-2 ${
                          status.toLowerCase().replace(/\s+/g, "-") ||
                          "clear-status"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                      <span>{label || status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <RatingCheckmarks
                rating={school.myRating}
                onRatingChange={(rating) => onRatingChange(index, rating)}
              />
              <div className="school-type flex items-center text-sm text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-md">
                <span className="ml-1.5">{school.schoolType}</span>
              </div>
            </div>
            <div className="actions flex gap-3 mt-4 lg:mt-0">
              <div className="action-button apply-button flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-green-100">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 489.8 489.8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6 C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6 c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z" />
                  <path d="M337.4,232.7h-80.3v-80.3c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v80.3h-80.3c-6.8,0-12.3,5.5-12.3,12.2 c0,6.8,5.5,12.3,12.3,12.3h80.3v80.3c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-80.3h80.3c6.8,0,12.3-5.5,12.3-12.3 C349.7,238.1,344.2,232.7,337.4,232.7z" />
                </svg>
                Apply Now
              </div>
            </div>
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
