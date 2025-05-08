import { CaseStudy } from "./types";

export const initialCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Japan Tourism Campaign",
    category: "Web Design",
    description:
      "A vibrant campaign website showcasing the beauty of Japanese culture and travel destinations.",
    thumbnail: "https://i.ibb.co/nMwVdhDY/hero1.webp",
    status: "published",
    pinned: false,
    hero: {
      subtitle: "Discover Japan",
      title: "Explore the Land of the Rising Sun",
      buttonText: "Plan Your Trip",
      buttonUrl: "https://example.com/japan",
      image: "https://i.ibb.co/nMwVdhDY/hero1.webp",
    },
    infoColumns: {
      column1: {
        title: "Project Scope",
        items: ["UI/UX Design", "Frontend Development"],
      },
      column2: { title: "Technologies", items: ["React", "Tailwind CSS"] },
    },
    overview: {
      title: "Project Overview",
      text: "This project aimed to create an engaging and informative website for promoting tourism in Japan.",
    },
    sections: [],
    keyFeatures: {
      label: "Key Features",
      title: "Innovative Solutions",
      features: [
        "Interactive Map",
        "Multilingual Support",
        "Booking Integration",
      ],
    },
    gallery: ["https://i.ibb.co/vcJmbRn/japan.webp"],
    testimonial: {
      label: "Client Feedback",
      title: "A Game-Changing Website",
      text: "The website exceeded our expectations and significantly boosted our campaign reach.",
      author: {
        name: "Kostis Kapelonis",
        title: "Marketing Director",
        image: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
      },
      video: {
        image: "https://i.ibb.co/vcJmbRn/japan.webp",
        buttonText: "Watch Case Study",
      },
    },
  },
];

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};
