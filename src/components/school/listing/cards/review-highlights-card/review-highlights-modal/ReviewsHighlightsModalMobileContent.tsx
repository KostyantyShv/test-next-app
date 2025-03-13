import React from "react";
import { reviewsData } from "../mock";
import Image from "next/image";

const ReviewsHighlightsModalMobile = () => {
  return (
    <>
      {/* Drawer Header */}
      <div className="border-b border-black/10 px-5 pb-4">
        <div className="mt-1 text-center text-lg font-bold text-gray-800">
          Review Highlights
        </div>
      </div>

      {/* Drawer Content */}
      <div className="px-5 py-4">
        {reviewsData.map((review, index) => (
          <div
            key={review.id}
            className={`py-5 ${
              index !== reviewsData.length - 1 ? "border-b border-black/10" : ""
            }`}
          >
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={review.avatar}
                alt={review.author}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="mb-1 text-base font-semibold text-gray-800">
                  {review.author}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <span className="font-bold text-green-500">★★★★★</span>
                    <span>{review.rating}</span>
                  </div>
                  <div>{review.date}</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-5 text-sm leading-relaxed text-gray-600">
              {review.content}
            </div>

            {/* Footer */}
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-800">
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
                  Helpful ({review.helpfulCount})
                </button>
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-800">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewsHighlightsModalMobile;
