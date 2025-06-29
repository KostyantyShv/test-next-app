import React from "react";
import { School } from "./types";
import Image from "next/image";

interface SchoolCardProps {
  school: School;
  layout: string;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, layout }) => {
  const isListLayout = layout === "list";
  const isHybridLayout = layout === "hybrid";
  const showHoverOverlay = layout === "grid" || layout === "classic";

  // Specialty Pin Component
  const SpecialtyPin = () =>
    school.specialty && (
      <div
        className={`specialty-pin absolute top-2 right-2 md:top-3 md:right-3 z-[10] flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-[11px] font-semibold tracking-[0.02em] uppercase ${
          school.specialty === "hot"
            ? "bg-[#FFEBEB] text-[#FF4D4D]"
            : school.specialty === "instant-book"
            ? "bg-[#E6F1FA] text-[#1D77BD]"
            : "bg-[#FFF4E5] text-[#FF9900]"
        }`}
      >
        {school.specialty === "hot" ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" className="md:w-3 md:h-3">
              <path
                d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
                fill="currentColor"
              />
            </svg>
            Hot
          </>
        ) : school.specialty === "instant-book" ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" className="md:w-3 md:h-3">
              <path
                d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
                fill="currentColor"
              />
            </svg>
            Book
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className="md:w-3 md:h-3">
              <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
            </svg>
            Ad
          </>
        )}
      </div>
    );

  return (
    <div
      className={`school-card group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out border border-[#E5E7EB] ${
        isListLayout
          ? "flex"
          : isHybridLayout
          ? "flex p-3 md:p-5 border-[1px] border-[rgba(0,0,0,0.08)]"
          : "flex flex-col"
      } relative hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] ${
        isHybridLayout ? "hover:border-[rgba(1,104,83,0.2)]" : ""
      }`}
    >
      {/* Specialty Pin */}
      <SpecialtyPin />

      {/* Image Section */}
      <div
        className={`image-container relative ${
          isListLayout
            ? "w-[280px] flex flex-col p-6 pr-0"
            : isHybridLayout
            ? "w-[60px] mr-5 flex-shrink-0 flex flex-col"
            : "w-full h-32 md:h-40 overflow-hidden"
        }`}
      >
        <Image
          height={720}
          width={720}
          src={school.image}
          alt={school.name}
          className={`school-image ${
            isListLayout
              ? "h-[9.25rem] w-full object-cover rounded-lg ml-3"
              : isHybridLayout
              ? `w-[60px] h-[60px] object-cover rounded-lg`
              : "absolute top-0 left-0 w-full h-full object-cover"
          }`}
        />

        {isListLayout && (
          <div className="image-buttons flex gap-2 pt-3 bg-transparent ml-3">
            <div className="image-button flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200 ease-in-out bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]">
              Compare
            </div>
            <div className="image-button flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200 ease-in-out bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]">
              Virtual Tour
            </div>
          </div>
        )}

        {!isListLayout && !isHybridLayout && (
          <div className="school-type-label absolute bottom-0 left-2 md:left-2.5 bg-white px-1.5 md:px-2 pt-1 text-[10px] md:text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-5 md:h-6 flex items-center z-10 uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
            {school.schoolType}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`school-content ${
          isListLayout
            ? "flex-1 p-6 flex flex-col"
            : isHybridLayout
            ? "flex-1 flex flex-col"
            : "p-3 md:p-4 flex-grow"
        }`}
      >
        <div className="ranking-text text-[#089E68] text-[11px] md:text-[13px] mb-1 md:mb-2 font-medium">
          {school.ranking}
        </div>
        <div
          className={`flex ${isListLayout ? "items-center gap-2" : "flex-col"}`}
        >
          <h3
            className={`school-name font-semibold text-[#464646] mb-1 md:mb-2 leading-[1.4] ${
              isListLayout
                ? "text-xl"
                : isHybridLayout
                ? "text-base mb-3"
                : "text-sm md:text-base"
            }`}
          >
            {school.name}
          </h3>
          {isListLayout && (
            <div className="verified-badge flex items-center justify-center w-6 h-6 bg-[rgba(29,119,189,0.1)] rounded-md mt-[-6px]">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-4 h-4 text-[#1D77BD]"
              >
                <path
                  fill="currentColor"
                  d="M8 0L9.95934 1.95934L12.5725 1.42462L13.1073 4.03778L15.7205 4.57246L15.1857 7.18566L17.1451 9.14505L15.1857 11.1044L15.7205 13.7176L13.1073 14.2523L12.5725 16.8655L9.95934 16.3308L8 18.2902L6.04066 16.3308L3.42746 16.8655L2.89274 14.2523L0.279539 13.7176L0.814259 11.1044L-1.14505 9.14505L0.814259 7.18566L0.279539 4.57246L2.89274 4.03778L3.42746 1.42462L6.04066 1.95934L8 0Z"
                />
                <path
                  fill="white"
                  d="M7.1001 11.6335L4.47076 8.91081L5.40410 7.99414L7.1001 9.70081L10.5961 6.17747L11.5301 7.09414L7.1001 11.6335Z"
                />
              </svg>
            </div>
          )}
        </div>

        <div
          className={`school-stats ${
            isListLayout
              ? "flex gap-6 mb-4"
              : isHybridLayout
              ? "flex flex-wrap gap-4 mb-3"
              : "flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4"
          }`}
        >
          <div className="stat flex items-center gap-1 md:gap-1.5 text-[11px] md:text-[13px] text-[#5F5F5F] font-[450]">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-3 h-3 md:w-4 md:h-4 text-[#565656]"
            >
              <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
              <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z" />
            </svg>
            <span className="text-[#464646]">{school.location}</span>
          </div>

          <div className="stat flex items-center gap-1 md:gap-1.5 text-[11px] md:text-[13px] text-[#5F5F5F] font-[450]">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-3 h-3 md:w-4 md:h-4 text-[#565656]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zM8 16c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C11.582 8 8 11.582 8 16s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM12 16c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[#464646]">{school.ratio}</span>
          </div>

          <div className="stat flex items-center gap-1 md:gap-1.5 text-[11px] md:text-[13px] text-[#5F5F5F] font-[450]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3 h-3 md:w-4 md:h-4 text-[#565656]"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[#464646]">{school.rating}</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      {showHoverOverlay && (
        <div className="hover-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="overlay-content text-white text-center">
            <div className="overlay-buttons flex gap-2">
              <button className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Compare
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolCard;
