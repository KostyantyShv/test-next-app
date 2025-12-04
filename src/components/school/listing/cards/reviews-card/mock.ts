import { Review } from "./types";

export const RATING_DISTRIBUTION = [
  { stars: "★★★★★", label: "Excellent", width: "30%", count: 22 },
  { stars: "★★★★☆", label: "Very Good", width: "51%", count: 37 },
  { stars: "★★★☆☆", label: "Average", width: "14%", count: 10 },
  { stars: "★★☆☆☆", label: "Poor", width: "0%", count: 0 },
  { stars: "★☆☆☆☆", label: "Terrible", width: "5%", count: 4 },
];

export const REVIEWS: Review[] = [
  {
    avatar:
      "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    author: "Kelly R.",
    rating: 5.0,
    date: "6 months ago",
    title: "Dream College",
    content:
      "Great college with diverse academic opportunities. Affordable local education with transfer programs and career-focused tracks for students in the area. I am significantly more prepared and qualified for furthering my education after attending this college.",
    published: "Published 6 months ago",
    helpful: 24,
    hasReply: false,
    location: "Linz, Austria",
    flagUrl: "https://flagcdn.com/at.svg",
    tags: ["Algorithm", "C# Programming", "Trading"],
  },
  {
    avatar:
      "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    author: "Kelly R.",
    rating: 5.0,
    date: "6 months ago",
    title: "Dream College",
    content:
      "Great college with diverse academic opportunities. Affordable local education with transfer programs and career-focused tracks for students in the area. I am significantly more prepared and qualified for furthering my education after attending this college.",
    published: "Published 6 months ago",
    helpful: 24,
    hasReply: false,
    location: "Linz, Austria",
    flagUrl: "https://flagcdn.com/at.svg",
    tags: ["Algorithm", "C# Programming", "Trading"],
  },
];
