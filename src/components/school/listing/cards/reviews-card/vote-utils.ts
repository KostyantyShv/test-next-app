import { Review } from "./types";

export const getReviewVoteCounts = (review: Review) => ({
  helpful: review.helpful,
  notHelpful: review.notHelpful ?? 0,
});

export const formatVoteLabel = (label: string, count: number) =>
  `${label} (${count})`;
