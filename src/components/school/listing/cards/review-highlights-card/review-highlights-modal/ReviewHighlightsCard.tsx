// ReviewCard.tsx
import Image from "next/image";
import { useState } from "react";
import CardWrapper from "../../../card-wrapper/CardWrapper";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import ReviewsHighlightsModalMobile from "./ReviewsHighlightsModalMobileContent";

interface ReviewCardProps {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  id: string;
}

const ReviewHighlightsCard: React.FC<ReviewCardProps> = ({
  author,
  avatar,
  rating,
  date,
  content,
  helpfulCount,
  id,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <CardWrapper id={id}>
      {/* Title */}
      <p className="mb-5 text-lg font-semibold text-gray-800 md:mb-6 md:text-xl">
        See what people love about this school
      </p>

      {/* Review Card */}
      <div className="relative flex items-center">
        <div className="w-full rounded-xl md:border md:border-gray-200 bg-white transition-all duration-300 md:rounded-2xl md:p-8">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4">
            <Image
              src={avatar}
              alt={author}
              width={48}
              height={48}
              className="rounded-full object-cover md:h-14 md:w-14"
            />
            <div className="flex-1">
              <div className="mb-1 text-base font-semibold text-gray-800 md:text-lg">
                {author}
              </div>
              <div className="flex flex-row gap-3 text-sm text-gray-500 md:flex-row md:items-center md:gap-4">
                <div className="flex items-center gap-1 text-sm font-medium text-[#00e28f]">
                  <span className="font-bold text-[#00e28f]">★★★★★</span>
                  <span>{rating}</span>
                </div>
                <div>{date}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-5 text-sm leading-relaxed text-gray-600 md:mb-6 md:text-base">
            {content}
          </div>

          {/* Footer */}
          <div className="flex justify-between border-t border-gray-200 pt-4 md:pt-5">
            <div className="flex gap-3 md:gap-4">
              <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 md:gap-2 md:px-4 md:py-2">
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
                Helpful ({helpfulCount})
              </button>
              <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 md:gap-2 md:px-4 md:py-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* View All Button (Mobile Only) */}
          <div className="mt-5 text-center md:hidden">
            <button
              onClick={handleOpenDrawer}
              className="inline-flex items-center gap-1.5 rounded-full border-none bg-transparent px-4 py-2 text-sm font-semibold text-[#346DC2] transition-colors duration-200 hover:bg-blue-100/50"
            >
              <span>VIEW ALL HIGHLIGHTS</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Arrow (Desktop Only) */}
        <div className="absolute -right-4 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-200 hover:translate-x-0.5 hover:shadow-lg md:flex">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div className="block md:hidden">
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
          <ReviewsHighlightsModalMobile />
        </MobileDrawer>
      </div>
    </CardWrapper>
  );
};

export default ReviewHighlightsCard;
