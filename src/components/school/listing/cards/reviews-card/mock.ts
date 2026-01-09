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
      "Great college with diverse academic opportunities. Affordable local education with transfer programs and career-focused tracks for students in the area. I am significantly more prepared and qualified for furthering my education after attending this college. The professors were incredibly supportive and always available for extra help.",
    published: "Published 6 months ago",
    helpful: 24,
    hasReply: true,
    replyAvatar: "https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg",
    replyAuthor: "Lincoln Academy",
    replyDate: "Replied 5 months ago",
    replyContent:
      "Thank you so much for your wonderful review, Kelly! We're thrilled to hear that your experience at Dream College has been so positive. Our faculty works hard to provide supportive and career-focused education, and it's rewarding to know that our transfer programs and academic tracks have helped prepare you for your future endeavors. We wish you continued success in your educational journey!",
    location: "Linz, Austria",
    flagUrl: "https://flagcdn.com/at.svg",
    tags: ["Algorithm", "C# Programming", "Trading"],
  },
  {
    avatar:
      "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
    author: "Marcus T.",
    rating: 5.0,
    date: "8 months ago",
    title: "Excellent Learning Experience",
    content:
      "The curriculum is well-structured and the instructors are highly knowledgeable. I especially appreciated the hands-on projects that gave me real-world experience. The career services team was also incredibly helpful in my job search after graduation.",
    published: "Published 8 months ago",
    helpful: 18,
    hasReply: false,
    location: "Berlin, Germany",
    flagUrl: "https://flagcdn.com/de.svg",
    tags: ["Web Development", "UX Design", "Project Management"],
  },
  {
    avatar:
      "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    author: "Sofia M.",
    rating: 5.0,
    date: "4 months ago",
    title: "Life-Changing Education",
    content:
      "This program exceeded all my expectations. The blend of theory and practical application prepared me exceptionally well for the industry. The networking opportunities and mentorship program were invaluable additions to the academic curriculum.",
    published: "Published 4 months ago",
    helpful: 22,
    hasReply: true,
    replyAvatar: "https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg",
    replyAuthor: "Lincoln Academy",
    replyDate: "Replied 3 months ago",
    replyContent:
      "Sofia, thank you for sharing your experience! We're delighted that our program has made such a positive impact on your career journey. Our mentorship and networking initiatives are designed to give students every advantage in the job market, and we're glad they served you well. Best of luck in all your future endeavors!",
    location: "Madrid, Spain",
    flagUrl: "https://flagcdn.com/es.svg",
    tags: ["Data Science", "Machine Learning", "Statistics"],
  },
  {
    avatar:
      "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
    author: "James W.",
    rating: 5.0,
    date: "2 months ago",
    title: "Top-Notch Quality",
    content:
      "From enrollment to graduation, every aspect of my experience was handled professionally. The online resources complement the in-person sessions perfectly, and the flexibility allowed me to balance work and studies effectively.",
    published: "Published 2 months ago",
    helpful: 15,
    hasReply: false,
    location: "London, UK",
    flagUrl: "https://flagcdn.com/gb.svg",
    tags: ["Business Analytics", "Finance", "Leadership"],
  },
];
