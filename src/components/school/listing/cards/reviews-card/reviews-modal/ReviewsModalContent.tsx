"use client";
import Image from "next/image";
import { REVIEWS } from "../mock";
import { useState } from "react";

interface ReviewsModalContentProps {
  onClose: () => void;
}

export function ReviewsModalContent({ onClose }: ReviewsModalContentProps) {
  const [expandedReplies, setExpandedReplies] = useState<
    Record<number, boolean>
  >({});

  const toggleReply = (index: number) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating));
  };

  const averageRating =
    REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length;

  return (
    <>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-black/8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1B1B1B]">
            <span className="text-2xl font-bold tracking-tight">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-[#5F5F5F] font-extrabold mx-1">·</span>
            <span className="text-2xl font-bold text-[#5F5F5F]">
              {REVIEWS.length} Reviews
            </span>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center text-[#5F5F5F] rounded-full hover:bg-black/5 hover:text-[#1B1B1B] transition-all md:ml-2"
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="flex flex-row gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-3 py-2 border border-black/10 rounded-lg bg-white text-[#464646] text-sm font-medium flex items-center justify-between gap-2 hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:text-[#0B6333] transition-all">
              Rating
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button className="flex-1 md:flex-none px-3 py-2 border border-black/10 rounded-lg bg-white text-[#464646] text-sm font-medium flex items-center justify-between gap-2 hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:text-[#0B6333] transition-all">
              Most Relevant
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 overflow-y-auto">
        {REVIEWS.map((review, index) => (
          <div
            key={review.author + review.date}
            className="py-5 md:py-6 border-b border-black/8 last:border-b-0"
          >
            <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
              <Image
                src={review.avatar}
                alt={`${review.author} avatar`}
                width={44}
                height={44}
                className="rounded-lg object-cover w-11 h-11 md:w-12 md:h-12"
              />
              <div className="flex-1">
                <div className="text-[#016853] font-semibold mb-1 flex items-center flex-wrap gap-2">
                  {review.author}
                </div>
                <div className="flex items-center flex-wrap gap-2 text-[#089E68] text-xs md:text-sm font-medium">
                  <span className="font-bold text-[#00DF8B]">
                    {renderStars(review.rating)}
                  </span>
                  <span>{review.rating.toFixed(1)}</span>
                  <span className="text-[#5F5F5F]">{review.published}</span>
                </div>
              </div>
            </div>
            <div className="font-medium text-[#464646] text-sm md:text-base mb-2 md:mb-3">
              {review.title}
            </div>
            <p className="text-[#5F5F5F] text-sm md:text-base leading-relaxed mb-3 md:mb-4">
              {review.content}
            </p>
            <div className="flex gap-4 md:gap-6 mt-4">
              <button className="flex items-center gap-1.5 md:gap-2 text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#016853] p-1.5 md:p-2 rounded-md transition-colors">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="md:w-4 md:h-4"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="font-medium text-[13px] md:text-sm">
                  Helpful ({review.helpful})
                </span>
              </button>
              <button className="flex items-center gap-1.5 cursor-pointer transition-all duration-200 py-1.5 px-2 md:px-2.5 rounded-md text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#016853]">
                <svg viewBox="0 0 512 512" className="w-3.5 h-3.5">
                  <path
                    d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-medium text-xs md:text-sm">
                  Not Helpful
                </span>
              </button>
            </div>
            {review.hasReply && (
              <>
                <div className="mt-4 h-px bg-[#E1E7EE] w-full"></div>
                <button
                  onClick={() => toggleReply(index)}
                  className="mt-3 md:mt-3 w-full flex items-center justify-between cursor-pointer p-1.5 md:p-1.5"
                >
                  <div className="flex items-center gap-2.5 md:gap-2.5">
                    <Image
                      src="https://i.ibb.co/J8QjpbD/school1.webp"
                      alt="School"
                      className="w-6 md:w-6 h-6 md:h-6 rounded-full object-cover"
                      width={24}
                      height={24}
                    />
                    <div className="text-[#464646] font-semibold text-sm md:text-sm">
                      School`s Response
                    </div>
                  </div>
                  <svg
                    className={`w-5 md:w-5 h-5 md:h-5 transition-transform duration-300 ${
                      expandedReplies[index] ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#464646"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`mt-3 md:mt-3 p-3.5 md:p-4 bg-[#F8F9FA] rounded-lg border border-[#E1E7EE] ${
                    expandedReplies[index] ? "block" : "hidden"
                  } animate-fade-in`}
                >
                  <div className="flex items-center gap-2.5 md:gap-3 mb-2.5 md:mb-3">
                    <Image
                      src={review.replyAvatar!}
                      alt={review.replyAuthor!}
                      className="w-6 md:w-8 h-6 md:h-8 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                    <div className="flex-1">
                      <div className="text-[#016853] font-semibold text-sm md:text-sm mb-0.5 md:mb-1">
                        {review.replyAuthor}
                      </div>
                      <div className="text-[#5F5F5F] text-xs md:text-xs">
                        {review.replyDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#5F5F5F] text-xs md:text-sm leading-6">
                    {review.replyContent}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
