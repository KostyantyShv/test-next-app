"use client";
import React from "react";

interface RatingFilterProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  rating,
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
              star <= rating ? "text-[#00DF8B] filled" : "text-[#D1D5DB]"
            }`}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-text text-[13px] text-text-default ml-2">
        {rating > 0 ? `${rating}+ Rating` : "Any"}
      </span>
    </div>
  );
};
