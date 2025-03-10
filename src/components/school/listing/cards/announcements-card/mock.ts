import { Announcement } from "./types";

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    isPinned: true,
    author: {
      name: "Mufti Hidayat",
      avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
      role: "Project Manager",
    },
    timestamp: "Mar 16, 9:00 PM",
    content:
      "Take a tour of BASIS Flagstaff - the #1 Flagstaff, AZ Metro Area High School per U.S. News & World Report!",
    image: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    link: {
      text: "Learn More",
      url: "#",
    },
  },
  {
    id: "2",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg",
      role: "Admissions Coordinator",
    },
    timestamp: "Mar 15, 11:20 AM",
    content:
      "Hillside Academy has been recognized as a 2025 Blue Ribbon School of Excellence! Join us for an open house on April 10th to learn more about our award-winning programs.",
    link: {
      text: "Register Now",
      url: "#",
    },
  },
  {
    id: "3",
    author: {
      name: "David Wilson",
      avatar:
        "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
      role: "Academic Director",
      isVerified: true,
    },
    timestamp: "Mar 12, 2:45 PM",
    content:
      "Reminder: Parent-Teacher conferences will be held next week (March 22-23). Sign up for your preferred time slot using our online scheduling system. The deadline to register is March 18th.",
    image: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
    link: {
      text: "Schedule Now",
      url: "#",
    },
  },
];
