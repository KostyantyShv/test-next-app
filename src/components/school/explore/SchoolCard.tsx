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
        className={`specialty-pin absolute top-3 right-3 z-[10] flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold tracking-[0.02em] uppercase ${
          school.specialty === "hot"
            ? "bg-[#FFEBEB] text-[#FF4D4D]"
            : school.specialty === "instant-book"
            ? "bg-[#E6F1FA] text-[#1D77BD]"
            : "bg-[#FFF4E5] text-[#FF9900]"
        }`}
      >
        {school.specialty === "hot" ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path
                d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
                fill="currentColor"
              />
            </svg>
            Hot
          </>
        ) : school.specialty === "instant-book" ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path
                d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
                fill="currentColor"
              />
            </svg>
            Book
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
              <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z" />
            </svg>
            Ad
          </>
        )}
      </div>
    );

  return (
    <div
      className={`school-card group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out border border-[#E5E7EB] ${
        isListLayout
          ? "flex"
          : isHybridLayout
          ? "flex p-5 border-[1px] border-[rgba(0,0,0,0.08)]"
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
            : "w-full h-40 overflow-hidden"
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
          <div className="school-type-label absolute bottom-0 left-2.5 bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-6 flex items-center z-10 uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
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
            : "p-4 flex-grow"
        }`}
      >
        <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium">
          {school.ranking}
        </div>
        <div
          className={`flex ${isListLayout ? "items-center gap-2" : "flex-col"}`}
        >
          <h3
            className={`school-name font-semibold text-[#464646] mb-2 leading-[1.4] ${
              isListLayout
                ? "text-xl"
                : isHybridLayout
                ? "text-base mb-3"
                : "text-base"
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
              : "flex flex-wrap gap-3 mb-4"
          }`}
        >
          <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450]">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-[#565656]"
            >
              <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z" />
              <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z" />
            </svg>
            <span className="text-[#464646]">{school.location}</span>
          </div>

          {(isListLayout || isHybridLayout) && (
            <>
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450]">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-4 h-4 text-[#565656]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-[#464646]">
                  {school.duration || "4 Year"}
                </span>
              </div>
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450]">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-4 h-4 text-[#565656]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-[#464646]">{school.price}/yr</span>
              </div>
            </>
          )}

          {!isListLayout && !isHybridLayout && (
            <>
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-4 h-4 text-[#565656]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.46497 2.65469L3.88834 5.94284C3.88112 5.9471 3.87383 5.95125 3.86648 5.95529C3.53431 6.13787 3.33341 6.48044 3.33341 6.8475V12.9174C3.33391 13.1 3.38341 13.2792 3.47675 13.4362C3.57021 13.5935 3.7042 13.7227 3.86471 13.8104C3.88028 13.8189 3.89558 13.8279 3.91059 13.8374L9.51062 17.3799C9.66161 17.4588 9.82953 17.5 10.0001 17.5C10.1706 17.5 10.3385 17.4588 10.4895 17.3799L16.0065 13.89C16.0242 13.8713 16.0454 13.8485 16.0692 13.8223C16.1476 13.7361 16.2503 13.6169 16.351 13.4827C16.4536 13.3459 16.542 13.2096 16.6016 13.0884C16.6598 12.9702 16.666 12.9159 16.6667 12.916C16.6667 12.916 16.6667 12.9168 16.6667 12.9183V6.84316C16.669 6.47367 16.4717 6.13196 16.1507 5.94942L16.1378 5.94193L10.5403 2.62526C10.421 2.55461 10.2347 2.51688 9.98782 2.53681C9.77125 2.55429 9.57557 2.61124 9.46497 2.65469ZM16.5351 14.5417L17.1194 15.1358C17.0772 15.1773 17.0307 15.2142 16.9806 15.2459L11.3556 18.8042C11.341 18.8134 11.3262 18.8222 11.3111 18.8305C10.9094 19.0511 10.4584 19.1667 10.0001 19.1667C9.54173 19.1667 9.0908 19.0511 8.68902 18.8305C8.67394 18.8222 8.65912 18.8134 8.64458 18.8042L3.04 15.2588C2.62874 15.0283 2.2852 14.6935 2.0441 14.2879C1.79804 13.874 1.66772 13.4015 1.66675 12.92L1.66675 12.9183V6.8475C1.66675 5.8708 2.19919 4.97552 3.05167 4.50135L8.66682 1.19049C8.6944 1.17423 8.72289 1.15957 8.75216 1.14659C9.01002 1.03219 9.40947 0.911399 9.85374 0.875543C10.2945 0.839973 10.8669 0.881526 11.3899 1.1914L16.8757 4.44191C16.981 4.48034 17.0764 4.53941 17.157 4.61423C17.8934 5.11464 18.3381 5.95164 18.3334 6.85072V12.9183C18.3334 13.2699 18.2128 13.5891 18.097 13.8244C17.9757 14.0708 17.8228 14.2982 17.6842 14.4829C17.5436 14.6702 17.4051 14.8305 17.3025 14.9434C17.2508 15.0003 17.2071 15.0463 17.1754 15.079C17.1701 15.0846 17.1651 15.0897 17.1604 15.0945C17.1512 15.1039 17.1435 15.1118 17.1372 15.1181L17.1256 15.1297L17.1218 15.1334L17.1204 15.1348L17.1194 15.1358C17.1193 15.1359 17.1194 15.1358 16.5351 14.5417Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.64306 5.97631C8.26818 5.35119 9.11603 5 10.0001 5C10.8841 5 11.732 5.35119 12.3571 5.97631C12.9822 6.60143 13.3334 7.44928 13.3334 8.33333C13.3334 9.21739 12.9822 10.0652 12.3571 10.6904C11.732 11.3155 10.8841 11.6667 10.0001 11.6667C9.11603 11.6667 8.26818 11.3155 7.64306 10.6904C7.01794 10.0652 6.66675 9.21739 6.66675 8.33333C6.66675 7.44928 7.01794 6.60143 7.64306 5.97631ZM10.0001 6.66667C9.55805 6.66667 9.13413 6.84226 8.82157 7.15482C8.50901 7.46738 8.33341 7.89131 8.33341 8.33333C8.33341 8.77536 8.50901 9.19929 8.82157 9.51185C9.13413 9.82441 9.55805 10 10.0001 10C10.4421 10 10.866 9.82441 11.1786 9.51185C11.4912 9.19929 11.6667 8.77536 11.6667 8.33333C11.6667 7.89131 11.4912 7.46738 11.1786 7.15482C10.866 6.84226 10.4421 6.66667 10.0001 6.66667Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.9273 14.5988L5.60407 15.9908C5.28698 16.3244 4.75951 16.3377 4.42594 16.0207C4.09237 15.7036 4.079 15.1761 4.39609 14.8425L5.77651 13.3904C5.81197 13.353 5.85082 13.3191 5.89255 13.289C6.60295 12.7758 7.45703 12.4998 8.33335 12.5M6.9273 14.5988C7.3415 14.3174 7.83122 14.1665 8.33308 14.1667L11.6667 14.1667C12.1682 14.1665 12.6578 14.3172 13.0718 14.5982L14.3962 15.9909C14.7133 16.3244 15.2408 16.3377 15.5743 16.0206C15.9078 15.7034 15.9211 15.1759 15.604 14.8424L14.2224 13.3895C14.1868 13.3521 14.1479 13.3182 14.1061 13.288C13.396 12.7755 12.5424 12.4998 11.6667 12.5C11.6666 12.5 11.6668 12.5 11.6667 12.5H8.33335"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-[#464646]">{school.ratio}</span>
              </div>
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-[#565656]"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[#464646]">{school.rating}</span>
              </div>
            </>
          )}
        </div>

        {isListLayout && (
          <div className="school-description text-sm leading-[1.6] text-[#4A4A4A] mb-4 line-clamp-2 overflow-hidden">
            {school.description}
          </div>
        )}

        {/* Footer Section */}
        <div
          className={`school-footer ${
            isListLayout
              ? "mt-auto flex items-center justify-between"
              : isHybridLayout
              ? "mt-auto pt-4 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between"
              : "p-4 border-t border-[rgba(1,104,83,0.1)] flex items-center justify-between"
          }`}
        >
          {isListLayout ? (
            <div className="metrics flex items-center gap-6">
              <div className="grade flex items-center gap-2">
                <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {school.grade}
                </div>
                <span className="grade-label font-semibold text-[#016853]">
                  Overall Grade
                </span>
              </div>
              <div className="reviews flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#00DF8B]"
                >
                  <path
                    fill="currentColor"
                    d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.49L12 4.72 9.978 9.806l-5.71.49 4.254 3.89-1.166 5.519L12 16.599Z"
                  />
                </svg>
                <span className="text-[#346DC2] font-medium cursor-pointer">
                  {school.reviews} reviews
                </span>
              </div>
              <div className="school-type flex items-center text-[13px] text-[#464646] font-medium bg-[#F5F5F7] py-1 px-3 rounded-md">
                {school.schoolType}
              </div>
            </div>
          ) : isHybridLayout ? (
            <div className="metrics flex items-center gap-4">
              <div className="grade flex items-center gap-2">
                <div className="grade-circle w-7 h-7 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[13px] font-semibold">
                  {school.grade}
                </div>
              </div>
              <div className="reviews flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                <div className="stars flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="star w-3.5 h-3.5 text-[#00DF8B]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    ))}
                </div>
                <span>{school.reviews} reviews</span>
              </div>
              <div className="verified-badge flex items-center gap-1.5 text-[12px] text-[#016853] bg-[#EBFCF4] px-2 py-1 rounded-md">
                <svg fill="none" viewBox="0 0 16 16" className="w-3.5 h-3.5">
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                  />
                </svg>
                Like
              </div>
            </div>
          ) : (
            <div className="grade flex items-center gap-2 font-semibold text-[#016853]">
              <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {school.grade}
              </div>
            </div>
          )}

          {isListLayout ? (
            <div className="actions flex gap-3">
              <div className="action-button py-2 px-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200 ease-in-out bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]">
                More Info
              </div>
              <div className="action-button py-2 px-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200 ease-in-out bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9] flex items-center gap-2">
                <svg fill="none" viewBox="0 0 16 16" className="w-4 h-4">
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                  />
                </svg>
                Like
              </div>
            </div>
          ) : !isHybridLayout ? (
            <div className="students-score flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="w-4 h-4 text-[#089E68]"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
                />
              </svg>
              <span>Students: {school.students}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Hover Overlay (only for grid/classic) */}
      {showHoverOverlay && (
        <div className="hover-overlay absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.98)] p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible flex transition-all duration-300 ease-in-out flex-col z-[1000]">
          <div className="hover-header flex gap-3 mb-3">
            <Image
              height={720}
              width={720}
              src={school.avatar}
              alt={school.name}
              className="school-avatar w-10 h-10 rounded-lg object-cover"
            />
            <div className="hover-school-name text-base font-semibold text-[#464646]">
              {school.name}
            </div>
          </div>
          <div className="hover-stats flex gap-3 mb-4">
            <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="w-4 h-4 text-[#089E68]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
                  fill="currentColor"
                />
              </svg>
              <span>{school.price}/yr</span>
            </div>
            <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 30"
                className="w-4 h-4 text-[#089E68]"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  d="M13.4473 15.0017C13.4473 15.4143 13.6112 15.8099 13.9029 16.1017C14.1946 16.3934 14.5903 16.5573 15.0028 16.5573C15.4154 16.5573 15.811 16.3934 16.1028 16.1017C16.3945 15.8099 16.5584 15.4143 16.5584 15.0017C16.5584 14.5892 16.3945 14.1935 16.1028 13.9018C15.811 13.6101 15.4154 13.4462 15.0028 13.4462C14.5903 13.4462 14.1946 13.6101 13.9029 13.9018C13.6112 14.1935 13.4473 14.5892 13.4473 15.0017Z"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  d="M15.0021 7.22391C13.4641 7.22391 11.9605 7.68007 10.6817 8.5347C9.40286 9.38933 8.40613 10.6041 7.81754 12.0253C7.22896 13.4465 7.07495 15.0103 7.37501 16.519C7.67507 18.0278 8.41571 19.4136 9.50328 20.5014C10.5908 21.5891 11.9765 22.3299 13.485 22.63C14.9935 22.9301 16.5571 22.7761 17.9781 22.1874C19.399 21.5987 20.6136 20.6018 21.4681 19.3228C22.3225 18.0437 22.7786 16.54 22.7786 15.0017"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  d="M16.5583 1.08729C13.6749 0.763756 10.7622 1.34439 8.22315 2.74889C5.68409 4.15339 3.64416 6.31233 2.38553 8.92707C1.12691 11.5418 0.7118 14.4831 1.19762 17.3441C1.68345 20.2051 3.0462 22.8445 5.09736 24.897C7.14853 26.9495 9.78673 28.3138 12.647 28.8012C15.5074 29.2885 18.4484 28.8748 21.0634 27.6173C23.6783 26.3598 25.8379 24.3206 27.2435 21.7819C28.649 19.2431 29.231 16.3302 28.909 13.4462"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  d="M19.6679 10.335V5.66837L24.3338 1.00171V5.66837H28.9997L24.3338 10.335H19.6679ZM19.6679 10.335L15.002 15.0017"
                />
              </svg>
              <span>Grades: {school.grades}</span>
            </div>
          </div>
          <div className="school-description text-sm leading-[1.6] text-[#4A4A4A] line-clamp-3 mb-3 overflow-hidden">
            {school.description}
          </div>
          <div className="review-count text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer">
            Read {school.reviews} reviews
          </div>
          <div className="hover-buttons flex gap-3 mt-auto">
            <div className="hover-button button-info flex-1 p-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200 ease-in-out bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]">
              More Info
            </div>
            <div className="hover-button button-like flex-1 p-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200 ease-in-out bg-[#298541] text-white hover:bg-[#237436] flex items-center justify-center gap-2">
              <svg
                fill="none"
                viewBox="0 0 16 16"
                className="like-icon w-4 h-4"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                />
              </svg>
              Like
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolCard;
