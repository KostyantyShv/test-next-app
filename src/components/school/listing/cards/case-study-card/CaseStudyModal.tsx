import Image from "next/image";
import { useState, useEffect } from "react";

interface CaseStudyModalProps {
  studyId: number;
  onClose: () => void;
}

const galleryImages = [
  "https://i.ibb.co/jJ4GHXP/img1.jpg",
  "https://i.ibb.co/LJwrLdW/coaching-image.webp",
  "https://i.ibb.co/fVRCnNZY/school2.webp",
  "https://i.ibb.co/zh3VFyBg/thumbnail1.webp",
];

export default function CaseStudyModal({
  studyId,
  onClose,
}: CaseStudyModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const totalSlides = 5;
  const imagesPerPage = 3;

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
    <div className="w-full fixed inset-0 bg-white z-[1000] overflow-y-auto font-inter">
      <div className="absolute top-0 left-0 right-0 h-[25px] bg-[rgba(38,43,61,0.05)] z-[1002]"></div>
      <button
        className="absolute top-2 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[1003]"
        onClick={onClose}
      >
        <svg className="w-5 h-5 text-[#262B3D]" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="pt-[25px] bg-white">
        <div className="w-[95%] mx-auto my-10 px-15 relative">
          <div className="absolute right-[-25px] top-1/2 -translate-y-1/2 flex flex-col gap-4 p-5 z-10">
            <span className="writing-mode-vertical-rl rotate-180 text-[#4A4A4A] font-semibold text-sm tracking-wide">
              Previous
            </span>
            <button
              className="w-10 h-10 border border-[#E0E0E0] rounded-full bg-white flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
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
              className="w-10 h-10 border border-[#E0E0E0] rounded-full bg-white flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
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
            <span className="writing-mode-vertical-rl rotate-180 text-[#4A4A4A] font-semibold text-sm tracking-wide">
              Next
            </span>
          </div>

          <div className="absolute left-[-20px] top-2/3 -translate-y-1/2 -rotate-90 origin-left flex items-center gap-3 p-5 z-10">
            <svg
              className="w-6 h-6 rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#02C5AF"
              strokeWidth="2"
            >
              <path d="M4 4h6v6h-6zM14 4h6v6h-6zM4 14h6v6h-6zM17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
            <span className="text-[#262B3D] font-semibold text-sm">
              View All Case Studies
            </span>
          </div>

          <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
            <Image
              height={100}
              width={100}
              src="https://i.ibb.co/nMwVdhDY/hero1.webp"
              alt="Case Study Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-40 left-10 text-white max-w-[600px] z-10">
              <div className="text-lg font-medium opacity-90 mb-3">
                Web Design for Construction Firms
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Aecon Green Energy Solutions
              </h1>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] rounded-lg font-medium hover:bg-[rgba(255,255,255,0.2)] transition-colors mb-20"
              >
                Launch Website
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
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

        <div className="flex -mt-[50px] relative z-10 w-full left-1/2 -translate-x-1/2">
          <div className="flex-1 p-8 bg-[#EBFCF4]">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-5 text-[#262B3D]">
                  Web Design Services
                </h3>
                <ul className="space-y-3 text-[#4A4A4A] text-[15px]">
                  {[
                    "Digital Branding",
                    "UX Design",
                    "Information Architecture",
                    "Responsive Design",
                    "Art Direction",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-[#02C5AF] before:rounded-full"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-5 text-[#262B3D]">
                  Platform
                </h3>
                <ul className="space-y-3 text-[#4A4A4A] text-[15px]">
                  {[
                    "WordPress Development",
                    "SVG Animation",
                    "Systems Integration",
                    "CRM Integration",
                    "SEO Optimization",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-[#02C5AF] before:rounded-full"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1 p-8 bg-[#016853] text-white">
            <h3 className="text-2xl font-semibold mb-4">Project Overview</h3>
            <p className="text-base leading-relaxed opacity-90">
              A fully customized website design, powered by WordPress to launch
              one of Canada`s largest construction firms` green energy division.
              Aecon Green Energy solutions required a digital brand evolution
              and high-powered lead generation platform to deploy the new brand.
            </p>
          </div>
        </div>

        <div className="w-3/4 mx-auto flex gap-10 py-20 px-[200px] bg-white mb-10">
          <div className="flex-[0_0_65%]">
            <div className="text-[#02C5AF] text-sm font-semibold uppercase tracking-wider mb-4">
              Web Design Process
            </div>
            <h2 className="text-[36px] font-semibold text-[#262B3D] mb-5 leading-tight">
              Building a Sustainable Digital Presence
            </h2>
            <p className="text-base leading-relaxed text-[#4A4A4A] mb-8">
              Our approach focused on creating an intuitive platform that
              effectively communicates Aecon`s commitment to sustainable energy
              solutions while ensuring seamless lead generation and customer
              engagement.
            </p>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {[
                "User-Centered Design",
                "Responsive Framework",
                "Modern Architecture",
                "Performance Optimization",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20">
                    <path
                      fill="#02C5AF"
                      fillRule="evenodd"
                      d="M5.9 8.1L4.5 9.5 9 14 19 4l-1.4-1.4L9 11.2 5.9 8.1zM18 10c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.8 0 1.5.1 2.2.3L13.8.7C12.6.3 11.3 0 10 0 4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10h-2z"
                    />
                  </svg>
                  <span className="text-[15px] text-[#262B3D]">{item}</span>
                </div>
              ))}
            </div>
            <button className="inline-flex items-center px-7 py-3.5 bg-[#02C5AF] text-white font-semibold rounded-lg hover:bg-[#01b09c] transition-colors">
              View Technical Details
            </button>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden">
            <Image
              height={100}
              width={100}
              src="https://i.ibb.co/GvnKvp2Z/image1.png"
              alt="Design Process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-3/4 mx-auto py-[60px] px-[200px] bg-[#F1FEFF] mb-10">
          <div className="text-[#02C5AF] text-sm font-semibold uppercase tracking-wider mb-4">
            Key Features
          </div>
          <h2 className="text-[36px] font-semibold text-[#262B3D] mb-5">
            Advanced Functionality
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px]">
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
                desc: "Enterprise-grade security measures ensuring data protection and compliance.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-[30px] rounded-xl transition-all hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
              >
                <svg
                  className="w-10 h-10 mb-5 text-[#02C5AF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h6v6h-6zM14 4h6v6h-6zM4 14h6v6h-6zM17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
                <h3 className="text-xl font-semibold text-[#262B3D] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#4A4A4A]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 mx-auto px-[200px] mb-10">
          <div className="py-10">
            <div className="relative mb-6 overflow-hidden">
              <div
                className="flex gap-4 transition-transform"
                style={{
                  transform: `translateX(-${currentPage * (180 + 16)}px)`,
                }}
              >
                {galleryImages.map((src, i) => (
                  <Image
                    height={120}
                    width={180}
                    key={i}
                    src={src}
                    alt={`Gallery ${i}`}
                    className={`w-[180px] h-[120px] object-cover rounded-lg cursor-pointer border-2 ${
                      i === currentImageIndex
                        ? "border-[#016853] shadow-[0_4px_12px_rgba(1,104,83,0.15)]"
                        : "border-transparent"
                    } hover:opacity-90 transition-all`}
                    onClick={() => setGalleryImage(i)}
                  />
                ))}
              </div>
              <button
                className={`absolute top-1/2 -translate-y-1/2 left-[-20px] w-10 h-10 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-[#f5f5f5] transition-all ${
                  currentPage === 0 ? "hidden" : ""
                }`}
                onClick={showPrevThumbnails}
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
                className={`absolute top-1/2 -translate-y-1/2 right-[-20px] w-10 h-10 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-[#f5f5f5] transition-all ${
                  (currentPage + 1) * imagesPerPage >= galleryImages.length
                    ? "hidden"
                    : ""
                }`}
                onClick={showNextThumbnails}
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
            </div>
            <div className="w-full h-[500px] rounded-xl overflow-hidden">
              <Image
                height={100}
                width={100}
                src={galleryImages[currentImageIndex]}
                alt="Active Gallery"
                className="w-full h-full object-cover transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto py-20 px-20 bg-white mb-10">
          <div className="text-[#02C5AF] text-sm font-semibold uppercase tracking-wider mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-[36px] font-semibold text-[#262B3D] mb-10">
            What Our Students Say
          </h2>
          <div className="flex gap-15 mt-10 items-start">
            <div className="flex-1 max-w-[600px]">
              <svg
                className="mb-6"
                viewBox="0 0 33 28"
                width="33"
                height="28"
                fill="none"
              >
                <path
                  fill="#016853"
                  d="M17.883 17.3311C17.883 11.9311 19.1453 7.79346 21.67 4.91816C24.2648 1.97272 27.7362 0.5 32.0842 0.5V5.75971C29.9803 5.75971 28.2972 6.35581 27.0349 7.54801C25.8427 8.67008 25.2466 10.1779 25.2466 12.0714V13.1233C25.2466 13.2636 25.2817 13.3688 25.3518 13.4389C25.5622 13.4389 25.7726 13.4038 25.983 13.3337C26.544 13.1934 26.9998 13.1233 27.3505 13.1233C28.7531 13.1233 29.9803 13.7545 31.0323 15.0168C32.0842 16.2791 32.6102 17.9272 32.6102 19.9609C32.6102 22.0648 31.9089 23.818 30.5063 25.2206C29.1739 26.6232 27.4908 27.3245 25.457 27.3245C23.1427 27.3245 21.2843 26.483 19.8817 24.7999C18.5492 23.1168 17.883 20.6272 17.883 17.3311ZM0 17.3311C0 11.9311 1.26233 7.79346 3.78699 4.91816C6.38178 1.97272 9.85319 0.5 14.2012 0.5V5.75971C12.0973 5.75971 10.4142 6.35581 9.1519 7.54801C7.95969 8.67008 7.36359 10.1779 7.36359 12.0714V13.1233C7.36359 13.2636 7.39866 13.3688 7.46879 13.4389C7.67918 13.4389 7.88956 13.4038 8.09995 13.3337C8.66099 13.1934 9.11683 13.1233 9.46748 13.1233C10.8701 13.1233 12.0973 13.7545 13.1493 15.0168C14.2012 16.2791 14.7272 17.9272 14.7272 19.9609C14.7272 22.0648 14.0259 23.818 12.6233 25.2206C11.2908 26.6232 9.60774 27.3245 7.57398 27.3245C5.25971 27.3245 3.40128 26.483 1.99869 24.7999C0.66623 23.1168 0 20.6272 0 17.3311Z"
                />
              </svg>
              <div className="text-2xl font-semibold leading-tight text-[#262B3D] mb-8">
                The new website perfectly captures our vision for sustainable
                energy solutions. The lead generation capabilities have exceeded
                our expectations.
              </div>
              <div className="flex items-center gap-4">
                <Image
                  height={48}
                  width={48}
                  src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
                  alt="John Smith"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-lg font-semibold text-[#262B3D] mb-1">
                    John Smith
                  </div>
                  <div className="text-sm text-[#4A4A4A]">
                    Director of Digital Strategy, Aecon
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[0_0_43%] relative rounded-xl overflow-hidden aspect-[16/9]">
              <Image
                height={100}
                width={100}
                src="https://i.ibb.co/vcJmbRn/japan.webp"
                alt="Client Interview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:-translate-y-[2px] transition-transform">
                <span className="text-sm font-semibold text-[#02C5AF]">
                  Watch Interview
                </span>
                <svg viewBox="0 0 33 33" width="33" height="33" fill="none">
                  <circle fill="#0B6333" r="16" cy="16.499" cx="16.8027" />
                  <path
                    fill="white"
                    d="M23.433 15.4168L13.9332 9.93204C13.0998 9.45088 12.058 10.0523 12.058 11.0146V21.9841C12.058 22.9464 13.0998 23.5479 13.9332 23.0667L23.433 17.582C24.2664 17.1008 24.2664 15.8979 23.433 15.4168Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
