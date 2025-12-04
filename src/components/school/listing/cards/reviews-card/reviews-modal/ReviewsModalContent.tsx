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
      <div className="px-6 md:px-8 py-6 border-b border-black/8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
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
              {review.hasReply && (
                <>
                  <div className="mt-4 h-px bg-[#E1E7EE] w-full"></div>
                  <button
                    onClick={() => toggleReply(index)}
                    className="mt-3 w-full flex items-center justify-between cursor-pointer p-1.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Image
                        src="https://i.ibb.co/J8QjpbD/school1.webp"
                        alt="School"
                        className="w-6 h-6 rounded-full object-cover"
                        width={24}
                        height={24}
                      />
                      <div className="text-[#464646] font-semibold text-sm">
                        School`s Response
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
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
                    className={`mt-3 p-4 bg-[#F8F9FA] rounded-lg border border-[#E1E7EE] ${
                      expandedReplies[index] ? "block" : "hidden"
                    } animate-fade-in`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={review.replyAvatar!}
                        alt={review.replyAuthor!}
                        className="w-8 h-8 rounded-full object-cover"
                        width={32}
                        height={32}
                      />
                      <div className="flex-1">
                        <div className="text-[#016853] font-semibold text-sm mb-1">
                          {review.replyAuthor}
                        </div>
                        <div className="text-[#5F5F5F] text-xs">
                          {review.replyDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-[#5F5F5F] text-sm leading-6">
                      {review.replyContent}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
