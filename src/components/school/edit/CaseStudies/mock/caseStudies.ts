import { CaseStudy } from "../types/caseStudy";

export const initialCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Aecon Green Energy Solutions",
    category: "Web Design",
    description:
      "A comprehensive website redesign for Aecon, focusing on sustainable energy solutions and user-friendly navigation.",
    thumbnail: "https://i.ibb.co/GvnKvp2Z/image1.png",
    status: "published",
    pinned: false,
    hero: {
      subtitle: "Web Design for Construction Firms",
      title: "Aecon Green Energy Solutions",
      buttonText: "Launch Website",
      buttonUrl: "https://example.com",
      image: "https://i.ibb.co/GvnKvp2Z/image1.png",
    },
    infoColumns: {
      column1: {
        title: "Web Design Services",
        items: ["UI/UX Design", "Responsive Layout", "SEO Optimization"],
      },
      column2: {
        title: "Platform",
        items: ["WordPress", "Custom Plugins"],
      },
    },
    overview: {
      title: "Project Overview",
      text: "The project involved a complete overhaul of Aecon’s digital presence to highlight their green energy initiatives.",
    },
    sections: [
      {
        label: "Design Process",
        title: "Building a Sustainable Digital Presence",
        description:
          "Our approach focused on clean design and intuitive navigation.",
        features: ["Mobile-first design", "Fast load times"],
        buttonText: "View Technical Details",
        image: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      },
    ],
    keyFeatures: {
      label: "Key Features",
      title: "Advanced Functionality",
      features: [
        {
          icon: "grid",
          title: "Interactive Maps",
          description: "Showcasing project locations dynamically.",
        },
      ],
    },
    gallery: ["https://i.ibb.co/LJwrLdW/coaching-image.webp"],
    testimonial: {
      label: "TESTIMONIALS",
      title: "Client Feedback",
      text: "The new website has significantly improved our online presence.",
      author: {
        name: "Kostis Kapelonis",
        title: "CEO, Aecon",
        image: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
      },
      video: {
        image: "https://i.ibb.co/vcJmbRn/japan.webp",
        buttonText: "Watch Video",
      },
    },
  },
];
