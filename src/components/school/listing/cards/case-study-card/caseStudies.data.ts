export interface CaseStudyBulletGroup {
  title: string;
  items: string[];
}

export interface CaseStudyProcessItem {
  title: string;
  description: string;
  highlights: string[];
  image: string;
  ctaLabel: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  subtitle: string;
  heroImage: string;
  launchUrl: string;
  projectOverview: string;
  bulletPoints: CaseStudyBulletGroup[];
  webDesignProcess: CaseStudyProcessItem[];
  keyFeatures: CaseStudyFeature[];
  imageGallery: string[];
  videoTestimonial: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialAvatar: string;
  previewDescription: string;
  previewDate: string;
  previewTags: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "Aecon Green Energy Solutions",
    subtitle: "Web Design for Construction Firms",
    heroImage: "https://i.ibb.co/nMwVdhDY/hero1.webp",
    launchUrl: "#",
    projectOverview:
      "A fully customized website design, powered by WordPress to launch one of Canada's largest construction firms' green energy divisions. The solution focused on digital brand evolution and high-powered lead generation.",
    bulletPoints: [
      {
        title: "Web Design Services",
        items: [
          "Digital Branding",
          "UX Design",
          "Information Architecture",
          "Responsive Design",
          "Art Direction",
        ],
      },
      {
        title: "Platform",
        items: [
          "WordPress Development",
          "SVG Animation",
          "Systems Integration",
          "CRM Integration",
          "SEO Optimization",
        ],
      },
    ],
    webDesignProcess: [
      {
        title: "Building a Sustainable Digital Presence",
        description:
          "Our approach focused on creating an intuitive platform that communicates Aecon's sustainable energy vision while delivering seamless lead generation and customer engagement.",
        highlights: [
          "User-Centered Design",
          "Responsive Framework",
          "Modern Architecture",
          "Performance Optimization",
        ],
        image: "https://i.ibb.co/GvnKvp2Z/image1.png",
        ctaLabel: "View Technical Details",
      },
    ],
    keyFeatures: [
      {
        title: "Advanced Analytics",
        description:
          "Comprehensive tracking and reporting of user interactions and lead generation metrics.",
      },
      {
        title: "Dynamic Content",
        description:
          "Personalized user experiences through smart content adaptation and delivery.",
      },
      {
        title: "Integration Suite",
        description:
          "Seamless connections with leading CRM and marketing automation platforms.",
      },
      {
        title: "Security Framework",
        description: "Enterprise-grade security and compliance across all user flows.",
      },
    ],
    imageGallery: [
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/fVRCnNZY/school2.webp",
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
    ],
    videoTestimonial: "https://i.ibb.co/vcJmbRn/japan.webp",
    testimonialQuote:
      "The new website perfectly captures our vision for sustainable energy solutions. The lead generation capabilities have exceeded our expectations.",
    testimonialAuthor: "John Smith",
    testimonialRole: "Director of Digital Strategy, Aecon",
    testimonialAvatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    previewDescription:
      "Led a comprehensive digital transformation project for a leading consulting firm, modernizing their workforce solutions platform and conversion funnels.",
    previewDate: "Sep 20, 2024",
    previewTags: ["Digital", "Enterprise"],
  },
  {
    id: 2,
    title: "TechStart Innovation Hub",
    subtitle: "E-commerce Platform Development",
    heroImage: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
    launchUrl: "#",
    projectOverview:
      "A scalable commerce platform redesign built for rapid catalog growth, faster checkout, and higher conversion. The project aligned product, marketing, and operations in one system.",
    bulletPoints: [
      {
        title: "Experience Strategy",
        items: [
          "Journey Mapping",
          "Conversion UX",
          "Checkout Simplification",
          "Navigation Refactor",
          "Mobile Commerce",
        ],
      },
      {
        title: "Commerce Stack",
        items: [
          "Headless Frontend",
          "Payment Integration",
          "Inventory Sync",
          "Promotion Engine",
          "Event Tracking",
        ],
      },
    ],
    webDesignProcess: [
      {
        title: "Designing for Scale and Conversion",
        description:
          "We rebuilt information architecture and checkout flows to reduce friction and support rapid merchandising experiments across devices.",
        highlights: [
          "Experiment-Driven Iteration",
          "Reusable Design System",
          "Accessibility-first Patterns",
          "Performance Budgets",
        ],
        image: "https://i.ibb.co/jJ4GHXP/img1.jpg",
        ctaLabel: "View Conversion Report",
      },
    ],
    keyFeatures: [
      {
        title: "Composable Checkout",
        description: "Modular checkout blocks to optimize speed and simplify A/B testing.",
      },
      {
        title: "Realtime Inventory",
        description: "Live stock visibility synchronized across marketing and checkout.",
      },
      {
        title: "Personalized Merchandising",
        description: "Behavior-based recommendations for higher average order value.",
      },
      {
        title: "Campaign Toolkit",
        description: "Rapid launch workflows for product drops and limited-time offers.",
      },
    ],
    imageGallery: [
      "https://i.ibb.co/fVRCnNZY/school2.webp",
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
    ],
    videoTestimonial: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    testimonialQuote:
      "The platform transformed our business operations. We've seen a 300% increase in online sales since launch.",
    testimonialAuthor: "Sarah Johnson",
    testimonialRole: "CEO, TechStart Innovation",
    testimonialAvatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    previewDescription:
      "Spearheaded the redesign and optimization of a commerce platform, resulting in major gains in conversion and average order value.",
    previewDate: "Aug 15, 2024",
    previewTags: ["E-commerce", "Growth"],
  },
  {
    id: 3,
    title: "EduLearn Academy",
    subtitle: "Educational Platform Redesign",
    heroImage: "https://i.ibb.co/fVRCnNZY/school2.webp",
    launchUrl: "#",
    projectOverview:
      "A student-first redesign for an education platform that improved course discovery, progress visibility, and enrollment conversion across web and mobile.",
    bulletPoints: [
      {
        title: "Learning Experience",
        items: [
          "Course Discovery",
          "Enrollment Flow",
          "Progress UX",
          "Student Dashboard",
          "Community Layer",
        ],
      },
      {
        title: "Platform",
        items: [
          "CMS Integration",
          "Analytics Pipeline",
          "Role Permissions",
          "Notification Engine",
          "Content Taxonomy",
        ],
      },
    ],
    webDesignProcess: [
      {
        title: "Improving Learning Through Product UX",
        description:
          "The team aligned instructional design and product UX to create a focused onboarding and learning journey with less drop-off.",
        highlights: [
          "Learning Path Simplification",
          "Progressive Disclosure",
          "Clear Completion Signals",
          "Faster Content Access",
        ],
        image: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
        ctaLabel: "View Learning Journey",
      },
    ],
    keyFeatures: [
      {
        title: "Personalized Dashboard",
        description: "Role-based home experiences for students, mentors, and admins.",
      },
      {
        title: "Cohort Analytics",
        description: "Completion, attendance, and engagement insights for educators.",
      },
      {
        title: "Adaptive Content",
        description: "Content surfacing tuned to learner profile and progress.",
      },
      {
        title: "Community Tools",
        description: "Forums, Q&A, and peer groups integrated into course flow.",
      },
    ],
    imageGallery: [
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
    ],
    videoTestimonial: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
    testimonialQuote:
      "The redesign made our platform significantly more engaging for students. Course completion rates improved across all cohorts.",
    testimonialAuthor: "Michael Chen",
    testimonialRole: "Founder, EduLearn Academy",
    testimonialAvatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    previewDescription:
      "Redesigned an educational platform to improve learner engagement, completion rates, and instructor reporting workflows.",
    previewDate: "Jul 04, 2024",
    previewTags: ["EdTech", "UX"],
  },
  {
    id: 4,
    title: "HealthCare Connect",
    subtitle: "Telemedicine Platform",
    heroImage: "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
    launchUrl: "#",
    projectOverview:
      "A secure telemedicine experience that streamlines provider discovery, appointment booking, and follow-up communication while meeting strict privacy requirements.",
    bulletPoints: [
      {
        title: "Patient Experience",
        items: [
          "Provider Search",
          "Appointment Booking",
          "Virtual Visit Flow",
          "Post-Visit Follow-up",
          "Medication Reminders",
        ],
      },
      {
        title: "Clinical Platform",
        items: [
          "EHR Integration",
          "HIPAA Workflow",
          "Consent Management",
          "Secure Messaging",
          "Audit Trails",
        ],
      },
    ],
    webDesignProcess: [
      {
        title: "Balancing Compliance and Usability",
        description:
          "We designed a compliant platform with clear patient actions, minimized form complexity, and reliable virtual visit workflows.",
        highlights: [
          "Privacy by Design",
          "Structured Intake",
          "Provider-side Efficiency",
          "Cross-device Reliability",
        ],
        image: "https://i.ibb.co/fVRCnNZY/school2.webp",
        ctaLabel: "View Compliance Flow",
      },
    ],
    keyFeatures: [
      {
        title: "Secure Consultations",
        description: "Encrypted video sessions and protected patient communication.",
      },
      {
        title: "Smart Intake",
        description: "Condition-aware intake forms that reduce incomplete submissions.",
      },
      {
        title: "Provider Dashboard",
        description: "Unified queue for appointments, notes, and post-visit actions.",
      },
      {
        title: "Care Continuity",
        description: "Automated reminders and care-plan tracking after consultations.",
      },
    ],
    imageGallery: [
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/fVRCnNZY/school2.webp",
    ],
    videoTestimonial: "https://i.ibb.co/fVRCnNZY/school2.webp",
    testimonialQuote:
      "The platform has changed how we deliver care remotely. Patient satisfaction and follow-up adherence are both up.",
    testimonialAuthor: "Dr. Emily Rodriguez",
    testimonialRole: "Chief Medical Officer, HealthCare Connect",
    testimonialAvatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    previewDescription:
      "Designed and launched a telemedicine product that improved appointment completion and patient follow-up outcomes.",
    previewDate: "Jun 10, 2024",
    previewTags: ["HealthTech", "Compliance"],
  },
  {
    id: 5,
    title: "Green Finance Solutions",
    subtitle: "FinTech Mobile Application",
    heroImage: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    launchUrl: "#",
    projectOverview:
      "A mobile-first investing experience built to simplify sustainable portfolio creation, improve trust signals, and accelerate onboarding for new investors.",
    bulletPoints: [
      {
        title: "Product Design",
        items: [
          "Onboarding UX",
          "Portfolio Builder",
          "Risk Visualization",
          "Goal Tracking",
          "Trust Patterns",
        ],
      },
      {
        title: "Financial Platform",
        items: [
          "KYC Integration",
          "Data Aggregation",
          "Compliance Rules",
          "Transaction Alerts",
          "Portfolio Analytics",
        ],
      },
    ],
    webDesignProcess: [
      {
        title: "Making Sustainable Investing Actionable",
        description:
          "We simplified financial complexity into clear investment journeys while preserving transparency and regulatory requirements.",
        highlights: [
          "Behavior-based Onboarding",
          "Clear Risk Communication",
          "Accessible Data Visualization",
          "Lifecycle Notifications",
        ],
        image: "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
        ctaLabel: "View Product Metrics",
      },
    ],
    keyFeatures: [
      {
        title: "Guided Portfolio Setup",
        description: "Smart prompts that help users build diversified ESG portfolios.",
      },
      {
        title: "Realtime Market Signals",
        description: "Relevant updates tied to owned assets and watchlists.",
      },
      {
        title: "Explainable Recommendations",
        description: "Transparent recommendation rationale to increase user trust.",
      },
      {
        title: "Regulatory Guardrails",
        description: "Automated checks and disclosures embedded into critical flows.",
      },
    ],
    imageGallery: [
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
      "https://i.ibb.co/fVRCnNZY/school2.webp",
    ],
    videoTestimonial: "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
    testimonialQuote:
      "The app made sustainable investing approachable for first-time investors. We onboarded over 100,000 users in the first quarter.",
    testimonialAuthor: "David Kim",
    testimonialRole: "Head of Product, Green Finance",
    testimonialAvatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    previewDescription:
      "Built a mobile fintech experience focused on trust, onboarding completion, and long-term portfolio engagement.",
    previewDate: "May 02, 2024",
    previewTags: ["FinTech", "Mobile"],
  },
];

export const getCaseStudyIndexById = (studyId: number | null): number => {
  if (studyId == null) return 0;
  const foundIndex = CASE_STUDIES.findIndex((study) => study.id === studyId);
  return foundIndex >= 0 ? foundIndex : 0;
};
