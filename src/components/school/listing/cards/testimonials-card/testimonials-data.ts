export interface Testimonial {
  testimonialIndex: number;
  testimonialText: string;
  bunnyVideoUrl: string;
  author: {
    firstName: string;
    lastName: string;
    achievement: string;
    avatarImage: string;
  };
  video: {
    title: string;
    ctaLabel: string;
    thumbnailImage: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    testimonialIndex: 0,
    testimonialText:
      "I love the tracking part, that you can see how recipients engaged with certificates. Certifier saves me tons of work.",
    bunnyVideoUrl:
      "https://iframe.mediadelivery.net/play/123456/11111111-1111-1111-1111-111111111111",
    author: {
      firstName: "Steve",
      lastName: "Roberts",
      achievement: "Head of Impact Academy",
      avatarImage: "/images/avatar.png",
    },
    video: {
      title: "Steve's Video",
      ctaLabel: "Watch Steve's story",
      thumbnailImage: "/images/cat.png",
    },
  },
  {
    testimonialIndex: 1,
    testimonialText:
      "It's highly addictive to get core insights on personally relevant topics without repetition or triviality. Added to that the app's ability to suggest kindred interests opens up a foundation of knowledge.",
    bunnyVideoUrl:
      "https://iframe.mediadelivery.net/play/123456/22222222-2222-2222-2222-222222222222",
    author: {
      firstName: "Steven",
      lastName: "O.",
      achievement: "Student",
      avatarImage: "/images/avatar.png",
    },
    video: {
      title: "Steven's Video",
      ctaLabel: "Watch Steven's story",
      thumbnailImage: "/images/cat.png",
    },
  },
  {
    testimonialIndex: 2,
    testimonialText:
      "The curriculum transformed our approach to learning. Every module is thoughtfully designed, and the real-world projects kept my students engaged throughout the semester.",
    bunnyVideoUrl:
      "https://iframe.mediadelivery.net/play/123456/33333333-3333-3333-3333-333333333333",
    author: {
      firstName: "Maria",
      lastName: "Chen",
      achievement: "Department Chair",
      avatarImage: "/images/avatar.png",
    },
    video: {
      title: "Maria's Video",
      ctaLabel: "Watch Maria's story",
      thumbnailImage: "/images/cat.png",
    },
  },
  {
    testimonialIndex: 3,
    testimonialText:
      "What sets this academy apart is the community. Students support each other, faculty are accessible, and the networking opportunities have been invaluable for my career.",
    bunnyVideoUrl:
      "https://iframe.mediadelivery.net/play/123456/44444444-4444-4444-4444-444444444444",
    author: {
      firstName: "James",
      lastName: "Okafor",
      achievement: "Alumni",
      avatarImage: "/images/avatar.png",
    },
    video: {
      title: "James' Video",
      ctaLabel: "Watch James' story",
      thumbnailImage: "/images/cat.png",
    },
  },
  {
    testimonialIndex: 4,
    testimonialText:
      "From day one I felt welcomed. The mentorship program paired me with an upperclassman who helped me navigate everything from course selection to internships.",
    bunnyVideoUrl:
      "https://iframe.mediadelivery.net/play/123456/55555555-5555-5555-5555-555555555555",
    author: {
      firstName: "Priya",
      lastName: "Sharma",
      achievement: "Junior, Computer Science",
      avatarImage: "/images/avatar.png",
    },
    video: {
      title: "Priya's Video",
      ctaLabel: "Watch Priya's story",
      thumbnailImage: "/images/cat.png",
    },
  },
];
