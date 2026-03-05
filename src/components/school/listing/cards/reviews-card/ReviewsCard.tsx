// Reviews.tsx
import Image from "next/image";
import ReviewsModal from "./reviews-modal/ReviewsModal";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { useState } from "react";
import { RATING_DISTRIBUTION, REVIEWS } from "./mock";
import { formatVoteLabel, getReviewVoteCounts } from "./vote-utils";

export default function Reviews({ id }: { id: string }) {
  const [expandedReplies, setExpandedReplies] = useState<
    Record<number, boolean>
  >({});
  const [voteError, setVoteError] = useState<string | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState(() =>
    REVIEWS.map((review) => ({
      count: getReviewVoteCounts(review).helpful,
      hasVoted: false,
      isSubmitting: false,
    }))
  );

  const toggleReply = (index: number) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const submitHelpfulVote = async () => {
    // TODO: wire this to a real mutation when review voting API is available.
    return Promise.resolve();
  };

  const handleHelpfulVote = async (reviewIndex: number) => {
    const currentVote = helpfulVotes[reviewIndex];
    if (!currentVote || currentVote.hasVoted || currentVote.isSubmitting) return;

    setVoteError(null);
    setHelpfulVotes((prev) =>
      prev.map((vote, index) =>
        index === reviewIndex
          ? {
              ...vote,
              count: vote.count + 1,
              hasVoted: true,
              isSubmitting: true,
            }
          : vote
      )
    );

    try {
      await submitHelpfulVote();
      setHelpfulVotes((prev) =>
        prev.map((vote, index) =>
          index === reviewIndex ? { ...vote, isSubmitting: false } : vote
        )
      );
    } catch (error) {
      console.error("Failed to register helpful vote", error);
      setVoteError("Could not save vote. Please try again.");
      setHelpfulVotes((prev) =>
        prev.map((vote, index) =>
          index === reviewIndex
            ? {
                ...vote,
                count: Math.max(0, vote.count - 1),
                hasVoted: false,
                isSubmitting: false,
              }
            : vote
        )
      );
    }
  };

  return (
    <CardWrapper id={id}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 text-center tracking-tight">
        School Reviews
      </h2>
      <p className="text-center text-[#5F5F5F] text-sm md:text-base mb-6 md:mb-10 px-3 md:px-0">
        Read what other users think about{" "}
        <strong className="font-semibold text-[#464646]">
          Lincoln Academy
        </strong>
      </p>

      <div className="bg-[#EBFCF4] rounded-xl p-5 md:p-7 mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start border border-[#0B6333] border-opacity-10">
        <div className="w-full md:w-auto text-center md:text-left mb-6 md:mb-0">
          <div className="text-[42px] font-extrabold text-gray-800 mb-2 tracking-tight leading-none">
            4.3
          </div>
          <div className="text-[#089E68] mb-2 font-semibold text-lg md:text-lg">
            ★★★★☆
          </div>
          <div className="text-[#5F5F5F] text-sm md:text-sm font-medium mb-4">
            73 Reviews
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#"
              className="text-[#346DC2] no-underline text-sm flex items-center gap-1 font-medium hover:text-[#1D77BD] hover:underline transition-colors"
            >
              Write a review →
            </a>
            <a
              href="#"
              className="text-[#346DC2] no-underline text-sm flex items-center gap-1 font-medium hover:text-[#1D77BD] hover:underline transition-colors"
            >
              See all reviews →
            </a>
          </div>
        </div>

        <div className="w-full md:flex-1 md:max-w-[400px] md:pl-10">
          {RATING_DISTRIBUTION.map((rating, index) => (
            <div
              key={index}
              className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3"
            >
              <span className="min-w-[45px] md:min-w-[80px] text-[#089E68] text-xs md:text-sm">
                {rating.stars}
              </span>
              <span className="min-w-[60px] md:min-w-[70px] text-[#464646] text-xs md:text-sm font-medium">
                {rating.label}
              </span>
              <div className="flex-1 h-1.5 md:h-2 bg-[#E1E7EE] rounded overflow-hidden">
                <div
                  className="h-full bg-[#00DF8B] rounded"
                  style={{ width: rating.width }}
                ></div>
              </div>
              <span className="min-w-[24px] md:min-w-[32px] text-[#5F5F5F] text-xs md:text-sm text-right font-medium">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {voteError && (
        <div
          className="mb-4 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-sm text-[#B91C1C]"
          role="status"
          aria-live="polite"
        >
          {voteError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {REVIEWS.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-black border-opacity-5"
          >
            <div className="flex gap-3 md:gap-4 mb-4">
              <Image
                src={review.avatar}
                alt={review.author}
                className="w-11 md:w-12 h-11 md:h-12 rounded-full object-cover"
                width={48}
                height={48}
              />
              <div className="flex-1">
                <div className="text-[#016853] font-semibold mb-1 tracking-wide text-sm md:text-base">
                  {review.author}
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-[#089E68] text-xs md:text-sm font-medium">
                  <span className="font-bold text-[#00DF8B]">★</span>
                  <span>{review.rating}</span>
                  <span className="text-[#5F5F5F]">{review.date}</span>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-[#464646] mb-2 text-sm md:text-base">
              {review.title}
            </h3>
            <p className="text-[#5F5F5F] text-xs md:text-sm leading-6 mb-3 md:mb-4">
              {review.content}
            </p>
            <div className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
              {review.published}
            </div>
            <div className="flex gap-4 md:gap-6">
              <button
                type="button"
                onClick={() => handleHelpfulVote(index)}
                disabled={
                  helpfulVotes[index]?.hasVoted || helpfulVotes[index]?.isSubmitting
                }
                aria-pressed={helpfulVotes[index]?.hasVoted ?? false}
                className={`flex items-center gap-1.5 transition-all duration-200 py-1.5 px-2 md:px-2.5 rounded-md ${
                  helpfulVotes[index]?.hasVoted
                    ? "bg-[#EBFCF4] text-[#016853] cursor-not-allowed"
                    : "text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#016853] cursor-pointer"
                } ${helpfulVotes[index]?.isSubmitting ? "opacity-80" : ""}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={helpfulVotes[index]?.hasVoted ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 stroke-2"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span className="font-medium text-xs md:text-sm">
                  {formatVoteLabel(
                    "Helpful",
                    helpfulVotes[index]?.count ?? getReviewVoteCounts(review).helpful
                  )}
                </span>
              </button>
              <button className="flex items-center gap-1.5 cursor-pointer transition-all duration-200 py-1.5 px-2 md:px-2.5 rounded-md text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#016853]">
                <svg viewBox="0 0 512 512" className="w-3.5 h-3.5">
                  <path
                    d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-medium text-xs md:text-sm">Report</span>
              </button>
            </div>

            {review.hasReply && (
              <>
                <div className="mt-4 h-px bg-[#E1E7EE] w-full"></div>
                <button
                  onClick={() => toggleReply(index)}
                  className="mt-3 md:mt-3 w-full flex items-center justify-between cursor-pointer p-1.5 md:p-1.5"
                >
                  <div className="flex items-center gap-2.5 md:gap-2.5">
                    <Image
                      src="https://i.ibb.co/J8QjpbD/school1.webp"
                      alt="School"
                      className="w-6 md:w-6 h-6 md:h-6 rounded-full object-cover"
                      width={24}
                      height={24}
                    />
                    <div className="text-[#464646] font-semibold text-sm md:text-sm">
                      School`s Response
                    </div>
                  </div>
                  <svg
                    className={`w-5 md:w-5 h-5 md:h-5 transition-transform duration-300 ${
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
                  className={`mt-3 md:mt-3 p-3.5 md:p-4 bg-[#F8F9FA] rounded-lg border border-[#E1E7EE] ${
                    expandedReplies[index] ? "block" : "hidden"
                  } animate-fade-in`}
                >
                  <div className="flex items-center gap-2.5 md:gap-3 mb-2.5 md:mb-3">
                    <Image
                      src={review.replyAvatar!}
                      alt={review.replyAuthor!}
                      className="w-6 md:w-8 h-6 md:h-8 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                    <div className="flex-1">
                      <div className="text-[#016853] font-semibold text-sm md:text-sm mb-0.5 md:mb-1">
                        {review.replyAuthor}
                      </div>
                      <div className="text-[#5F5F5F] text-xs md:text-xs">
                        {review.replyDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#5F5F5F] text-xs md:text-sm leading-6">
                    {review.replyContent}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 md:mt-8">
        <ReviewsModal />
      </div>
    </CardWrapper>
  );
}
