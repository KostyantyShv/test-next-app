// ReviewCard.tsx
import Image from "next/image";

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
  return (
    <div
      id={id}
      className="flex justify-center bg-cardBackground my-cardMargin rounded-cardBorderRadius"
    >
      <div className="w-[875px] mx-auto">
        <div className="rounded-cardBorderRadius bg-cardBackground p-cardPadding shadow-cardShadow">
          <p className="mb-6 text-xl font-semibold text-[#1F2937]">
            See what people love about this school
          </p>
          <div className="relative flex items-center">
            <div className="flex-1 rounded-2xl bg-white p-8 border border-[#E5E7EB] transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={avatar}
                  alt={author}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-lg font-semibold text-[#1F2937] mb-1">
                    {author}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-1 text-[#089E68] text-sm font-medium">
                      <span className="font-bold text-[#00DF8B]">★★★★★</span>
                      <span>{rating}</span>
                    </div>
                    <div>{date}</div>
                  </div>
                </div>
              </div>
              <div className="text-base text-[#4B5563] leading-relaxed mb-6">
                {content}
              </div>
              <div className="flex justify-between items-center pt-5 border-t border-[#E5E7EB]">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937] transition-all duration-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    Helpful ({helpfulCount})
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937] transition-all duration-200">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-[#E5E7EB] cursor-pointer transition-all duration-200 hover:translate-x-0.5 hover:shadow-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewHighlightsCard;
