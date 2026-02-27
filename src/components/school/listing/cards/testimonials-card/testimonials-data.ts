export interface Testimonial {
  testimonialIndex: number;
  testimonialText: string;
  authorFirstName: string;
  authorLastName: string;
  thumbnailImage: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    testimonialIndex: 0,
    testimonialText:
      "I love the tracking part, that you can see how recipients engaged with certificates. Certifier saves me tons of work.",
    authorFirstName: "Steve",
    authorLastName: "Roberts",
    thumbnailImage: "/images/avatar.png",
    role: "Head of Impact Academy",
  },
  {
    testimonialIndex: 1,
    testimonialText:
      "It's highly addictive to get core insights on personally relevant topics without repetition or triviality. Added to that the app's ability to suggest kindred interests opens up a foundation of knowledge.",
    authorFirstName: "Steven",
    authorLastName: "O.",
    thumbnailImage: "/images/avatar.png",
    role: "Student",
  },
  {
    testimonialIndex: 2,
    testimonialText:
      "The curriculum transformed our approach to learning. Every module is thoughtfully designed, and the real-world projects kept my students engaged throughout the semester.",
    authorFirstName: "Maria",
    authorLastName: "Chen",
    thumbnailImage: "/images/avatar.png",
    role: "Department Chair",
  },
  {
    testimonialIndex: 3,
    testimonialText:
      "What sets this academy apart is the community. Students support each other, faculty are accessible, and the networking opportunities have been invaluable for my career.",
    authorFirstName: "James",
    authorLastName: "Okafor",
    thumbnailImage: "/images/avatar.png",
    role: "Alumni",
  },
  {
    testimonialIndex: 4,
    testimonialText:
      "From day one I felt welcomed. The mentorship program paired me with an upperclassman who helped me navigate everything from course selection to internships.",
    authorFirstName: "Priya",
    authorLastName: "Sharma",
    thumbnailImage: "/images/avatar.png",
    role: "Junior, Computer Science",
  },
];
