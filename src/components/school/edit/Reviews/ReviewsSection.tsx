import { useState, useEffect, useCallback } from "react";
import ReviewTable from "./ReviewTable";
import { initialReviews } from "./mock/reviews";
import { Review } from "./types/review";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }, []);

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
    <div className="text-gray-700">
      <div className="container mx-auto">
        <div className="md:flex md:gap-6">
          {/* Desktop Header */}
          <div className="md:max-w-[350px] max-md:hidden">
            <h1 className="text-gray-900 text-2xl font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              Reviews
            </h1>
            <p className="text-gray-600 text-base leading-6 w-[350px]">
              Manage student feedback and respond to reviews. Keep track of
              important comments and highlight exceptional experiences.
            </p>
          </div>
          
          {/* Mobile Header */}
          <div className="hidden max-md:block px-4 pt-4 pb-4">
            <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: 'var(--bold-text)' }}>
              Reviews
            </h1>
            <p className="text-sm leading-6" style={{ color: 'var(--subtle-text)' }}>
              Manage student feedback and respond to reviews. Keep track of
              important comments and highlight exceptional experiences.
            </p>
          </div>
          
          <div className="w-full bg-white max-md:bg-transparent rounded-xl max-md:rounded-none shadow-sm max-md:shadow-none p-6 max-md:p-4">
            <h1 className="text-gray-900 text-2xl font-semibold tracking-tight mb-6 max-md:hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              Review Manager
            </h1>
            <ReviewTable reviews={reviews} setReviews={setReviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
