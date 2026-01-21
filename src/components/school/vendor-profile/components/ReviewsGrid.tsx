"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Review = {
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  product: string;
  productRating: number;
  helpfulCount: number;
};

interface ReviewsGridProps {
  reviews?: Review[];
}

const ICONS = {
  helpful: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
  ),
  report: (
    <svg viewBox="0 0 512 512" fill="currentColor" width="14" height="14">
      <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"></path>
    </svg>
  ),
};

const mockReviews: Review[] = [
  {
    author: "Emily Johnson",
    rating: 5.0,
    date: "Oct 15, 2024",
    title: "Excellent Course Material & Delivery",
    content: `The course exceeded my expectations. The instructor's approach to explaining complex concepts was clear and effective.`,
    product: "Advanced Chemistry Fundamentals",
    productRating: 3.7,
    helpfulCount: 24,
  },
  {
    author: "Michael Chen",
    rating: 4.8,
    date: "Oct 11, 2024",
    title: "Comprehensive Coverage of Topics",
    content:
      "The depth of content is impressive. Every concept is explained thoroughly with practical examples.",
    product: "Organic Chemistry Masterclass",
    productRating: 4.5,
    helpfulCount: 18,
  },
  {
    author: "Michael Chen",
    rating: 4.8,
    date: "Oct 11, 2024",
    title: "Comprehensive Coverage of Topics",
    content:
      "The depth of content is impressive. Every concept is explained thoroughly with practical examples.",
    product: "Organic Chemistry Masterclass",
    productRating: 2.5,
    helpfulCount: 19,
  },
  {
    author: "Michael Chen",
    rating: 4.8,
    date: "Oct 11, 2024",
    title: "Comprehensive Coverage of Topics",
    content:
      "The depth of content is impressive. Every concept is explained thoroughly with practical examples.",
    product: "Organic Chemistry Masterclass",
    productRating: 1.2,
    helpfulCount: 30,
  },
  {
    author: "Michael Chen",
    rating: 4.8,
    date: "Oct 11, 2024",
    title: "Comprehensive Coverage of Topics",
    content: "The depth of content is impressive.",
    product: "Organic Chemistry Masterclass",
    productRating: 1.7,
    helpfulCount: 8,
  },
  {
    author: "Michael Chen",
    rating: 4.8,
    date: "Oct 11, 2024",
    title: "Comprehensive Coverage of Topics",
    content:
      "The depth of content is impressive. Every concept is explained thoroughly with practical examples.",
    product: "Organic Chemistry Masterclass",
    productRating: 4.5,
    helpfulCount: 18,
  },
];

const avatarImages = [
  "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
  "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
  "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
];

const productImages = [
  "https://i.ibb.co/LJwrLdW/coaching-image.webp",
  "https://i.ibb.co/Csdq4rd/newsletter-image.png",
  "https://i.ibb.co/jJ4GHXP/img1.jpg",
];

const ReviewCard: React.FC<{
  review: Review;
  avatarUrl: string;
  productImageUrl: string;
}> = ({ review, avatarUrl, productImageUrl }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [isHelpfulActive, setIsHelpfulActive] = useState(false);
  const [isReportActive, setIsReportActive] = useState(false);

  const handleHelpfulClick = () => {
    setIsHelpfulActive((prev) => {
      const next = !prev;
      setHelpfulCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
      return next;
    });
  };

  const handleReportClick = () => {
    if (!isReportActive) {
      setIsReportActive(true);
      setTimeout(() => {
        setIsReportActive(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">
            {review.author}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="text-xs text-[#00DF8B] font-medium flex items-center gap-1">
              ★{" "}
              <span className="text-xs text-black font-medium">
                {review.rating.toFixed(1)}
              </span>
            </div>
            <span className="ml-1">{review.date}</span>
          </div>
        </div>
      </div>

      <div className="text-[15px] font-semibold text-gray-800 mb-2 leading-snug">
        {review.title}
      </div>
      <div className="text-sm text-gray-600 line-clamp-3 mb-4">
        {review.content}
      </div>

      <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-3 mb-4 hover:scale-[1.02] transition-transform">
        <img
          src={productImageUrl}
          alt="product"
          className="w-[50px] h-[50px] rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-800 truncate">
            {review.product}
          </div>
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(review.productRating)
                    ? "text-[#00DF8B]"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500">
              ({review.productRating})
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between text-xs text-gray-500 font-medium">
      <div
        onClick={handleHelpfulClick}
        className={`
          review-action helpful-action
          cursor-pointer flex items-center gap-1 select-none
          text-sm font-medium text-gray-500
          rounded-md px-2.5 py-1.5
          transition-colors duration-200
          hover:bg-gray-100 hover:text-[#016853]
          ${isHelpfulActive ? "bg-[#0168531a] text-[#016853] font-semibold" : ""}
        `}
        style={{ userSelect: "none" }}
      >
        {ICONS.helpful}
        Helpful ({helpfulCount})
      </div>

        <div
          onClick={handleReportClick}
          className={`
            review-action report-action
            cursor-pointer flex items-center gap-1 select-none
            text-sm font-medium text-gray-500
            rounded-md px-2.5 py-1.5
            transition-colors duration-200
            hover:bg-gray-100 hover:text-[#016853]
            ${isReportActive ? "bg-[#0168531a] text-[#016853]" : ""}
          `}
          style={{ userSelect: "none" }}
        >
          {ICONS.report}
          Report
        </div>
      </div>
    </div>
  );
};

const ReviewsGrid: React.FC<ReviewsGridProps> = ({ reviews = mockReviews }) => {
  return (
    <div className={`${inter.className} text-[#4A4A4A]`}>
      <div className="mx-auto">
        <div className="md:bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 md:pt-8 px-4 md:px-0">
            {reviews.map((review, idx) => (
              <ReviewCard
                key={idx}
                review={review}
                avatarUrl={avatarImages[idx % avatarImages.length]}
                productImageUrl={productImages[idx % productImages.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsGrid;
