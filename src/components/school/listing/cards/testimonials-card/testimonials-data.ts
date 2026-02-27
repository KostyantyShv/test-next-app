export interface Testimonial {
    text: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar: string;
    videoThumb?: string;
    videoLabel?: string;
}

export const testimonials: Testimonial[] = [
    {
        text: "I love the tracking part, that you can see how recipients engaged with certificates. Certifier saves me tons of work",
        firstName: "Steve",
        lastName: "Roberts",
        role: "Head of Impact Academy",
        avatar: "https://i.ibb.co/NKp6WsG/AVATAR-Kostis-Kapelonis.png",
        videoThumb: "https://i.ibb.co/vcJmbRn/japan.webp",
        videoLabel: "Watch Steve's story",
    },
    {
        text: "It's highly addictive to get core insights on personally relevant topics without repetition or triviality. Added to that the apps ability to suggest kindred interests opens up a foundation of knowledge.",
        firstName: "Steven",
        lastName: "O.",
        role: "Student",
        avatar: "https://i.ibb.co/WndL8R6/AVATAR-laurentfa.png",
    },
    {
        text: "The curriculum transformed our approach to learning. Every module is thoughtfully designed, and the real‑world projects kept my students engaged throughout the semester.",
        firstName: "Maria",
        lastName: "Chen",
        role: "Department Chair",
        avatar: "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    },
    {
        text: "What sets this academy apart is the community. Students support each other, faculty are accessible, and the networking opportunities have been invaluable for my career.",
        firstName: "James",
        lastName: "Okafor",
        role: "Alumni",
        avatar: "https://i.ibb.co/YP71Tb6/profile9.jpg",
    },
    {
        text: "From day one I felt welcomed. The mentorship program paired me with an upperclassman who helped me navigate everything from course selection to internships.",
        firstName: "Priya",
        lastName: "Sharma",
        role: "Junior, Computer Science",
        avatar: "https://i.ibb.co/nPq13Sv/profile3.webp",
    },
];
