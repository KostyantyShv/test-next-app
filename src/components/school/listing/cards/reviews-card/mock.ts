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
    author: "Shuwang Y.",
    rating: 4.9,
    date: "Jun 22, 2022",
    title: "Learning Python for Data Analysis and Visualization",
    content:
      "Ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal ansatzweiseurdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt, solltest du aufpassen.",
    published: "Published 3 weeks ago",
    helpful: 24,
    hasReply: true,
    replyAvatar: "https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg",
    replyAuthor: "Lincoln Academy",
    replyDate: "Replied on Jun 23, 2022",
    replyContent:
      "Thank you for your detailed feedback! We're glad to hear that you found the course material helpful and comprehensive. Your input helps us continue to improve our programs and provide the best possible learning experience for our students.",
  },
  {
    avatar: "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
    author: "Kiking A.",
    rating: 5.0,
    date: "Jun 22, 2022",
    title: "Learning Python for Data Analysis and Visualization",
    content:
      "Ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal ansatzweiseurdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt, solltest du aufpassen.",
    published: "Published 3 weeks ago",
    helpful: 24,
    hasReply: false,
  },
];
