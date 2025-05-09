import { Inter } from "next/font/google";
import { useState, useEffect, useCallback } from "react";
import ReviewTable from "./ReviewTable";
import { initialReviews } from "./mock/reviews";
import { Review } from "./types/review";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Truncate text for author names and review titles
  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }, []);

  // Apply truncation on mount
  useEffect(() => {
    setReviews((prev) =>
      prev.map((review) => ({
        ...review,
        author: {
          ...review.author,
          name: truncateText(review.author.fullName, 12),
        },
        title: {
          ...review.title,
          short: truncateText(review.title.full, 25),
        },
      }))
    );
  }, [truncateText]);

  return (
    <div className={`min-h-screen text-[#4A4A4A]`}>
      <div className="w-full mx-auto flex gap-[25px]">
        <div className="max-w-[350px] w-full">
          <h1 className="text-[#1a1a19] text-2xl font-semibold mb-3">
            Reviews
          </h1>
          <p className="text-[#5F5F5F] text-base leading-6">
            Manage student feedback and respond to reviews. Keep track of
            important comments and highlight exceptional experiences.
          </p>
        </div>
        <div className="w-full bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-6">
          <div className="flex justify-between items-center mb-6 px-2">
            <h1 className="text-[#1B1B1B] text-2xl font-semibold tracking-tight">
              Review Manager
            </h1>
          </div>
          <ReviewTable reviews={reviews} setReviews={setReviews} />
        </div>
      </div>
    </div>
  );
}
