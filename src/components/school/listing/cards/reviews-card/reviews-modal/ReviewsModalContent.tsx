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

  const averageRating = 5.0; // From HTML example

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-6 md:px-8 py-6 border-b border-black/8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-2 text-[#1B1B1B]">
          <span className="text-2xl font-bold tracking-[-0.02em]">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-[#5F5F5F] font-extrabold mx-1">·</span>
          <span className="text-2xl font-bold text-[#5F5F5F]">
            {REVIEWS.length} Reviews
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-black/10 rounded-lg bg-white text-[#464646] text-sm font-medium flex items-center gap-2 hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:text-[#0B6333] transition-all">
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
          <button className="px-4 py-2 border border-black/10 rounded-lg bg-white text-[#464646] text-sm font-medium flex items-center gap-2 hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:text-[#0B6333] transition-all">
            Sort by: Most Relevant
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
          <button
            className="w-8 h-8 flex items-center justify-center text-[#5F5F5F] rounded-full hover:bg-black/5 hover:text-[#1B1B1B] transition-all"
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
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 py-6 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {REVIEWS.map((review, index) => (
            <div
              key={`${review.author}-${review.date}-${index}`}
              className="py-6 border-b border-black/8 last:border-b-0"
            >
              <div className="flex gap-4 mb-4">
                <Image
                  src={review.avatar}
                  alt={`${review.author} avatar`}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover w-12 h-12"
                />
                <div className="flex-1">
                  <div className="text-[#016853] font-semibold mb-1 flex items-center gap-2">
                    {review.author}
                    {review.location && (
                      <span className="text-sm text-[#5F5F5F] font-medium flex items-center gap-1">
                        {review.flagUrl && (
                          <Image
                            src={review.flagUrl}
                            alt="Country flag"
                            width={20}
                            height={14}
                            className="rounded-sm object-cover"
                          />
                        )}
                        {review.location}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[#089E68] text-sm font-medium">
                    <span className="font-bold text-[#00DF8B]">
                      {renderStars(review.rating)}
                    </span>
                    <span>{review.rating.toFixed(1)}</span>
                    <span className="text-[#5F5F5F]">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="font-medium text-[#464646] mb-3">
                {review.title}
              </div>
              <p className="text-[#5F5F5F] text-sm leading-relaxed mb-4">
                {review.content}
              </p>
              {review.tags && review.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {review.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 rounded-2xl bg-[#EBFCF4] text-[#0B6333] text-[13px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-6 mb-4">
                <button className="flex items-center gap-2 text-[#5F5F5F] hover:text-[#346DC2] transition-colors cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  <span className="font-medium text-sm">Helpful</span>
                </button>
                <button className="flex items-center gap-2 text-[#5F5F5F] hover:text-[#346DC2] transition-colors cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                  </svg>
                  <span className="font-medium text-sm">Not Helpful</span>
                </button>
                <button className="ml-auto p-2 rounded-full text-[#5F5F5F] hover:bg-black/5 hover:text-[#1B1B1B] transition-all cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                </button>
              </div>
              {review.hasReply && review.replyAvatar && review.replyAuthor && review.replyDate && review.replyContent && (
                <div
                  className={`mt-5 px-5 py-[18px] rounded-xl border cursor-pointer transition-all duration-200 ease-in-out ${
                    expandedReplies[index]
                      ? "bg-gradient-to-br from-[#F8FAFB] to-[#EBFCF4] border-[rgba(11,99,51,0.25)] shadow-[0_2px_12px_rgba(11,99,51,0.08)]"
                      : "bg-gradient-to-br from-[#F8FAFB] to-[#F0FBF6] border-[rgba(11,99,51,0.12)] hover:border-[rgba(11,99,51,0.25)] hover:shadow-[0_2px_12px_rgba(11,99,51,0.08)]"
                  }`}
                  onClick={() => toggleReply(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[14px] flex-1">
                      <Image
                        src={review.replyAvatar}
                        alt={review.replyAuthor}
                        className="w-[42px] h-[42px] rounded-[10px] object-cover border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                        width={42}
                        height={42}
                      />
                      <div className="flex-1">
                        <div className="text-[#016853] font-semibold text-sm mb-[3px] flex items-center gap-2">
                          {review.replyAuthor}
                          <svg
                            className="w-[18px] h-[18px] flex-shrink-0 relative top-[2px]"
                            viewBox="0 0 30 30"
                          >
                            <path
                              fill="#1D77BD"
                              d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"
                            />
                            <path
                              fill="white"
                              d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                            />
                          </svg>
                        </div>
                        <div className="text-[#5F5F5F] text-xs">
                          {review.replyDate}
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-[22px] h-[22px] text-[#089E68] transition-transform duration-300 ease-in-out flex-shrink-0 ${
                        expandedReplies[index] ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  <div
                    className={`mt-[14px] text-[14px] leading-[1.7] ${
                      expandedReplies[index]
                        ? "text-[#464646] pt-[14px] border-t border-[rgba(11,99,51,0.1)]"
                        : "text-[#5F5F5F] line-clamp-1"
                    }`}
                  >
                    {review.replyContent}
                  </div>
                  {!expandedReplies[index] && (
                    <div className="mt-[10px] text-[13px] text-[#089E68] font-medium flex items-center gap-1">
                      <span>Read full response</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
