import Image from "next/image";
import { useState, useEffect } from "react";

interface CaseStudyModalProps {
  studyId: number | null;
  onClose: () => void;
}

interface CaseStudy {
  title: string;
  subtitle: string;
  heroImage: string;
  galleryImages: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  testimonialImage: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Aecon Green Energy Solutions",
    subtitle: "Web Design for Construction Firms",
    heroImage: "https://i.ibb.co/nMwVdhDY/hero1.webp",
    galleryImages: [
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/fVRCnNZY/school2.webp",
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
    ],
    testimonial: {
      quote:
        "The new website perfectly captures our vision for sustainable energy solutions. The lead generation capabilities have exceeded our expectations.",
      author: "John Smith",
      role: "Director of Digital Strategy, Aecon",
      avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    },
    testimonialImage: "https://i.ibb.co/vcJmbRn/japan.webp",
  },
  {
    title: "TechStart Innovation Hub",
    subtitle: "E-commerce Platform Development",
    heroImage: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
    galleryImages: [
      "https://i.ibb.co/fVRCnNZY/school2.webp",
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
    ],
    testimonial: {
      quote:
        "The platform has transformed our business operations. We've seen a 300% increase in online sales since launch.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Innovation",
      avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    },
    testimonialImage: "https://i.ibb.co/jJ4GHXP/img1.jpg",
  },
  {
    title: "EduLearn Academy",
    subtitle: "Educational Platform Redesign",
    heroImage: "https://i.ibb.co/fVRCnNZY/school2.webp",
    galleryImages: [
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
    ],
    testimonial: {
      quote:
        "The new design has made our platform more engaging for students. User engagement is up 250% and course completion rates have improved significantly.",
      author: "Michael Chen",
      role: "Founder, EduLearn Academy",
      avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    },
    testimonialImage: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
  },
  {
    title: "HealthCare Connect",
    subtitle: "Telemedicine Platform",
    heroImage: "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
    galleryImages: [
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/fVRCnNZY/school2.webp",
    ],
    testimonial: {
      quote:
        "The platform has revolutionized how we deliver healthcare services. Patient satisfaction scores are at an all-time high.",
      author: "Dr. Emily Rodriguez",
      role: "Chief Medical Officer, HealthCare Connect",
      avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    },
    testimonialImage: "https://i.ibb.co/fVRCnNZY/school2.webp",
  },
  {
    title: "Green Finance Solutions",
    subtitle: "FinTech Mobile Application",
    heroImage: "https://i.ibb.co/jJ4GHXP/img1.jpg",
    galleryImages: [
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/nMwVdhDY/hero1.webp",
      "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
      "https://i.ibb.co/fVRCnNZY/school2.webp",
    ],
    testimonial: {
      quote:
        "The app has made sustainable investing accessible to everyone. We've onboarded over 100,000 users in the first quarter.",
      author: "David Kim",
      role: "Head of Product, Green Finance",
      avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    },
    testimonialImage: "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
  },
];

export default function CaseStudyModalContent({
  studyId,
  onClose,
}: CaseStudyModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const totalSlides = caseStudies.length;
  const imagesPerPage = 3;
  
  const currentCaseStudy = caseStudies[currentSlide];
  const galleryImages = currentCaseStudy.galleryImages;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const setGalleryImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Reset gallery state when case study changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setCurrentPage(0);
  }, [currentSlide]);

  const showNextThumbnails = () => {
    if ((currentPage + 1) * imagesPerPage < galleryImages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showPrevThumbnails = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };



  return (
    <>
      {/* Header Space (Desktop Only) */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-[25px] bg-[rgba(38,43,61,0.05)] z-[1002]"></div>
      {/* Close Button (Desktop Only) */}
      <button
        className="hidden md:flex absolute top-2 right-6 w-8 h-8 bg-white rounded-full items-center justify-center shadow-md z-[1003]"
        onClick={onClose}
      >
        <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Mobile Header - Sticky */}
      <div className="md:hidden sticky top-0 bg-white z-[1001]">
        {/* Drawer Handle */}
        <div className="w-10 h-1 bg-[#E0E0E0] rounded-[2.5px] mx-auto mt-[10px] mb-2"></div>
        {/* Header with Navigation */}
        <div className="flex items-center justify-between px-4 pb-[10px] border-b border-[#E0E0E0]">
          <div className="text-base font-semibold text-[#262B3D]">Case Study</div>
          <div className="flex items-center ml-auto mr-[10px]">
            <button
              className="w-7 h-7 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center cursor-pointer mx-1"
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
              }
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="w-7 h-7 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center cursor-pointer mx-1"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <button
            className="w-7 h-7 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            <svg className="w-4 h-4 text-[#262B3D]" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-0 md:pt-[25px] flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero Section */}
        <div className="relative w-full md:h-auto md:w-[95%] mx-auto md:my-10 md:px-[60px]">
          {/* Vertical Navigation (Desktop Only) */}
          <div className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 flex-col gap-4 z-10 p-5">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[#4A4A4A] font-semibold text-sm tracking-wide">
              Previous
            </span>
            <button
              className="w-10 h-10 border border-gray-200 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + totalSlides) % totalSlides
                )
              }
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="w-10 h-10 border border-gray-200 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % totalSlides)
              }
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="[writing-mode:vertical-rl] rotate-180 text-[#4A4A4A] font-semibold text-sm tracking-wide">
              Next
            </span>
          </div>

          {/* Side Info (Desktop Only) */}
          <div className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 flex-col items-center z-10">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#02C5AF"
              strokeWidth="2"
            >
              <path d="M4 4h6v6h-6zM14 4h6v6h-6zM4 14h6v6h-6zM17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
            <span className="[writing-mode:vertical-rl] rotate-180 text-[#4A4A4A] font-semibold text-sm mt-4">
              View All Case Studies
            </span>
          </div>

          <div className="relative w-full h-[200px] md:h-[600px] overflow-hidden md:rounded-2xl">
            <img
              src={currentCaseStudy.heroImage}
              alt="Case Study Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-4 md:bottom-40 md:left-10 text-white max-w-[90%] md:max-w-[600px] z-10">
              <div className="text-xs md:text-lg font-medium opacity-90 mb-1 md:mb-3">
                {currentCaseStudy.subtitle}
              </div>
              <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6 leading-[1.2]">
                {currentCaseStudy.title}
              </h1>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/20 backdrop-blur-[10px] rounded-md font-medium hover:bg-white/20 transition-colors text-xs md:text-base mb-0 md:mb-20"
              >
                Launch Website
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.66667 11.3333L11.3333 4.66667M11.3333 4.66667H6M11.3333 4.66667V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="flex flex-col md:flex-row md:-mt-[50px] relative z-10 w-full md:w-screen md:left-1/2 md:-translate-x-1/2 md:px-[15px]">
          <div className="flex-1 p-4 md:p-8 bg-[#EBFCF4]">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-5 text-[#262B3D]">
                  Web Design Services
                </h3>
                <ul className="space-y-2.5 md:space-y-3 text-[#4A4A4A] text-sm md:text-[15px] list-none">
                  {[
                    "Digital Branding",
                    "UX Design",
                    "Information Architecture",
                    "Responsive Design",
                    "Art Direction",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#02C5AF] rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-5 text-[#262B3D]">
                  Platform
                </h3>
                <ul className="space-y-2.5 md:space-y-3 text-[#4A4A4A] text-sm md:text-[15px] list-none">
                  {[
                    "WordPress Development",
                    "SVG Animation",
                    "Systems Integration",
                    "CRM Integration",
                    "SEO Optimization",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#02C5AF] rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 bg-[#016853] text-white">
            <h3 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-white">
              Project Overview
            </h3>
            <p className="text-sm md:text-base leading-[1.5] opacity-90 text-white">
              A fully customized website design, powered by WordPress to launch
              one of Canada`s largest construction firms` green energy division. Aecon Green Energy solutions required a digital brand evolution and high-powered lead generation platform to deploy the new brand.
            </p>
          </div>
        </div>

        {/* Design Process */}
        <div className="w-full md:w-3/4 mx-auto py-6 md:py-20 px-4 md:pl-[200px] md:pr-[200px] bg-white flex flex-col md:flex-row md:gap-10">
          <div className="md:flex-[0_0_65%]">
            <div className="text-[#02C5AF] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
              Web Design Process
            </div>
            <h2 className="text-xl md:text-[36px] font-semibold text-[#262B3D] mb-3 md:mb-5 leading-[1.3]">
              Building a Sustainable Digital Presence
            </h2>
            <p className="text-sm md:text-base leading-[1.5] text-[#4A4A4A] mb-4 md:mb-8">
              Our approach focused on creating an intuitive platform that
              effectively communicates Aecon`s commitment to sustainable energy solutions while ensuring seamless lead generation and customer engagement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-5 md:mb-8">
              {[
                "User-Centered Design",
                "Responsive Framework",
                "Modern Architecture",
                "Performance Optimization",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 md:gap-3">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#02C5AF"
                      fillRule="evenodd"
                      d="M5.9 8.1L4.5 9.5 9 14 19 4l-1.4-1.4L9 11.2 5.9 8.1zM18 10c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.8 0 1.5.1 2.2.3L13.8.7C12.6.3 11.3 0 10 0 4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10h-2z"
                    />
                  </svg>
                  <span className="text-sm md:text-[15px] text-[#262B3D]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button className="inline-flex items-center px-5 py-2.5 md:px-7 md:py-3.5 bg-[#02C5AF] text-white font-semibold rounded-md hover:bg-[#01b09c] transition-colors text-sm md:text-base">
              View Technical Details
            </button>
          </div>
          <div className="mt-4 md:mt-0 md:flex-1 rounded-lg overflow-hidden h-[180px] md:h-auto">
            <img
              src="https://i.ibb.co/GvnKvp2Z/image1.png"
              alt="Design Process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="w-full md:w-3/4 mx-auto py-6 md:py-[60px] px-4 md:pl-[200px] md:pr-[200px] bg-[#F1FEFF]">
          <div className="text-[#02C5AF] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
            Key Features
          </div>
          <h2 className="text-xl md:text-[36px] font-semibold text-[#262B3D] mb-4 md:mb-5">
            Advanced Functionality
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[30px] place-items-center overflow-x-visible mt-4 md:mt-0">
            {[
              {
                title: "Advanced Analytics",
                desc: "Comprehensive tracking and reporting of user interactions and lead generation metrics.",
              },
              {
                title: "Dynamic Content",
                desc: "Personalized user experiences through smart content adaptation and delivery.",
              },
              {
                title: "Integration Suite",
                desc: "Seamless connections with leading CRM and marketing automation platforms.",
              },
              {
                title: "Security Framework",
                desc: "Enterprise-grade security measures.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-5 md:p-[30px] w-full md:w-[305px] rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <svg
                  className="w-[30px] h-[30px] md:w-10 md:h-10 mb-3 md:mb-5 text-[#02C5AF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h6v6h-6zM14 4h6v6h-6zM4 14h6v6h-6zM17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
                <h3 className="text-base md:text-xl font-semibold text-[#262B3D] mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-[15px] leading-[1.5] text-[#4A4A4A]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="w-full md:max-w-[1200px] mx-auto px-4 md:px-20 py-4 md:py-10">

{/* Thumbnails */}
        <div className="relative mb-4 md:mb-6 overflow-hidden">
            <div
              className="flex gap-2.5 md:gap-4 transition-transform px-1"
              style={{
                transform: `translateX(-${currentPage * (60 + 10)}px)`,
              }}
            >
              {galleryImages.map((src, i) => (
                <Image
                  height={60}
                  width={60}
                  key={i}
                  src={src}
                  alt={`Gallery ${i}`}
                  className={`w-[60px] h-[60px] md:w-[180px] md:h-[120px] object-cover rounded-full md:rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                    i === currentImageIndex
                      ? "border-[#016853] shadow-[0_2px_8px_rgba(1,104,83,0.15)]"
                      : "border-transparent"
                  } hover:opacity-90 transition-all`}
                  onClick={() => setGalleryImage(i)}
                />
              ))}
            </div>
            <button
              className={`absolute top-1/2 -translate-y-1/2 left-[-4px] md:left-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-all z-[2] ${
                currentPage === 0 ? "hidden" : ""
              }`}
              onClick={showPrevThumbnails}
            >
              <svg
                className="w-4 h-4 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`absolute top-1/2 -translate-y-1/2 right-[-4px] md:right-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-all z-[2] ${
                (currentPage + 1) * imagesPerPage >= galleryImages.length
                  ? "hidden"
                  : ""
              }`}
              onClick={showNextThumbnails}
            >
              <svg
                className="w-4 h-4 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Main Gallery Image */}
          <div className="w-full h-[200px] md:h-[500px] rounded-lg overflow-hidden mb-4 md:mb-6">
            <img
              src={galleryImages[currentImageIndex]}
              alt="Active Gallery"
              className="w-full h-full object-cover transition-all"
            />
          </div>
          
          
        </div>

        {/* Testimonials */}
        <div className="w-full md:max-w-[1200px] mx-auto py-6 md:py-20 px-4 md:px-20 bg-white mb-5 md:mb-10">
          <div className="text-[#02C5AF] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-xl md:text-[36px] font-semibold text-[#262B3D] mb-4 md:mb-10">
            What Our Clients Say
          </h2>
          <div className="flex flex-col md:flex-row gap-5 md:gap-[60px] mt-4 md:mt-10 md:items-start">
            <div className="flex-1 md:max-w-[600px]">
              <svg
                className="mb-3 md:mb-6 w-6 h-5"
                viewBox="0 0 33 28"
                fill="none"
              >
                <path
                  fill="#016853"
                  d="M17.883 17.3311C17.883 11.9311 19.1453 7.79346 21.67 4.91816C24.2648 1.97272 27.7362 0.5 32.0842 0.5V5.75971C29.9803 5.75971 28.2972 6.35581 27.0349 7.54801C25.8427 8.67008 25.2466 10.1779 25.2466 12.0714V13.1233C25.2466 13.2636 25.2817 13.3688 25.3518 13.4389C25.5622 13.4389 25.7726 13.4038 25.983 13.3337C26.544 13.1934 26.9998 13.1233 27.3505 13.1233C28.7531 13.1233 29.9803 13.7545 31.0323 15.0168C32.0842 16.2791 32.6102 17.9272 32.6102 19.9609C32.6102 22.0648 31.9089 23.818 30.5063 25.2206C29.1739 26.6232 27.4908 27.3245 25.457 27.3245C23.1427 27.3245 21.2843 26.483 19.8817 24.7999C18.5492 23.1168 17.883 20.6272 17.883 17.3311ZM0 17.3311C0 11.9311 1.26233 7.79346 3.78699 4.91816C6.38178 1.97272 9.85319 0.5 14.2012 0.5V5.75971C12.0973 5.75971 10.4142 6.35581 9.1519 7.54801C7.95969 8.67008 7.36359 10.1779 7.36359 12.0714V13.1233C7.36359 13.2636 7.39866 13.3688 7.46879 13.4389C7.67918 13.4389 7.88956 13.4038 8.09995 13.3337C8.66099 13.1934 9.11683 13.1233 9.46748 13.1233C10.8701 13.1233 12.0973 13.7545 13.1493 15.0168C14.2012 16.2791 14.7272 17.9272 14.7272 19.9609C14.7272 22.0648 14.0259 23.818 12.6233 25.2206C11.2908 26.6232 9.60774 27.3245 7.57398 27.3245C5.25971 27.3245 3.40128 26.483 1.99869 24.7999C0.66623 23.1168 0 20.6272 0 17.3311Z"
                />
              </svg>
              <div className="text-base md:text-2xl font-semibold leading-[1.5] text-[#262B3D] mb-4 md:mb-8">
                {currentCaseStudy.testimonial.quote}
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-0">
                <Image
                  height={40}
                  width={40}
                  src={currentCaseStudy.testimonial.avatar}
                  alt={currentCaseStudy.testimonial.author}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm md:text-lg font-semibold text-[#262B3D] mb-0.5 md:mb-1">
                    {currentCaseStudy.testimonial.author}
                  </div>
                  <div className="text-xs md:text-sm text-[#4A4A4A]">
                    {currentCaseStudy.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden aspect-[16/9] w-full md:flex-[0_0_43%]">
              <img
                src={currentCaseStudy.testimonialImage}
                alt="Client Interview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-md flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-transform shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                <span className="text-xs md:text-sm font-semibold text-[#02C5AF]">
                  Watch Interview
                </span>
                <svg viewBox="0 0 33 33" width="28" height="28" fill="none">
                  <circle fill="#0B6333" r="14" cy="14" cx="14" />
                  <path
                    fill="white"
                    d="M19.433 13.4168L11.9332 9.43204C11.0998 8.95088 10.058 9.55231 10.058 10.5146V18.4841C10.058 19.4464 11.0998 20.0479 11.9332 19.5667L19.433 15.582C20.2664 15.1008 20.2664 13.8979 19.433 13.4168Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
