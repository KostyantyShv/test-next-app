"use client";
import React from "react";

interface RatingFilterProps {
  rating: number | undefined;
  setRating: (rating: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  rating = 0,
  setRating,
}) => {
  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="star-rating-option flex items-center justify-between p-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg cursor-pointer mr-[2px] ${
              star <= rating ? "text-[#00DF8B] filled" : "text-[var(--subtle-text)]"
            }`}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-text text-[13px] text-[var(--text-default)] ml-2">
        {rating > 0 ? `${rating}+ Rating` : "Any"}
      </span>
    </div>
  );
};
