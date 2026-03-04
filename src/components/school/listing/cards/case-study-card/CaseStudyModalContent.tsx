import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CASE_STUDIES, getCaseStudyIndexById } from "./caseStudies.data";

interface CaseStudyModalProps {
  studyId: number | null;
  onClose: () => void;
}

const THUMBNAILS_PER_PAGE = 3;

export default function CaseStudyModalContent({
  studyId,
  onClose,
}: CaseStudyModalProps) {
  const [activeStudyIndex, setActiveStudyIndex] = useState(() =>
    getCaseStudyIndexById(studyId)
  );
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [galleryPage, setGalleryPage] = useState(0);

  const totalSlides = CASE_STUDIES.length;
  const activeStudy = CASE_STUDIES[activeStudyIndex];
  const processItem = activeStudy.webDesignProcess[0];

  const maxGalleryPage = useMemo(() => {
    return Math.max(
      0,
      Math.ceil(activeStudy.imageGallery.length / THUMBNAILS_PER_PAGE) - 1
    );
  }, [activeStudy.imageGallery.length]);

  useEffect(() => {
    setActiveStudyIndex(getCaseStudyIndexById(studyId));
  }, [studyId]);

  useEffect(() => {
    setActiveGalleryIndex(0);
    setGalleryPage(0);
  }, [activeStudyIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const goToPreviousStudy = () => {
    setActiveStudyIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNextStudy = () => {
    setActiveStudyIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPreviousThumbnails = () => {
    setGalleryPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextThumbnails = () => {
    setGalleryPage((prev) => Math.min(maxGalleryPage, prev + 1));
  };

  const visibleThumbnails = useMemo(() => {
    const start = galleryPage * THUMBNAILS_PER_PAGE;
    return activeStudy.imageGallery.slice(start, start + THUMBNAILS_PER_PAGE);
  }, [activeStudy.imageGallery, galleryPage]);

  const activeImageSrc =
    activeStudy.imageGallery[activeGalleryIndex] ?? activeStudy.heroImage;

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-[60] border-b border-[#E0E0E0] bg-white/95 backdrop-blur-sm">
        <div className="md:hidden flex justify-center pt-3 pb-2">
          <div className="w-9 h-1 rounded-full bg-[#DFDDDB]" />
        </div>

        <div className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4">
          <h2 className="text-base md:text-xl font-semibold text-[#262B3D] truncate">
            {activeStudy.title}
          </h2>

          <div className="ml-auto flex items-center gap-1.5 md:gap-2">
            <button
              className="w-7 h-7 md:w-9 md:h-9 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center"
              onClick={goToPreviousStudy}
              aria-label="Previous Case Study"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className="text-xs md:text-sm text-[#5F5F5F] whitespace-nowrap px-0.5">
              {activeStudyIndex + 1} of {totalSlides}
            </span>

            <button
              className="w-7 h-7 md:w-9 md:h-9 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center"
              onClick={goToNextStudy}
              aria-label="Next Case Study"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#262B3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className="w-7 h-7 md:w-9 md:h-9 bg-white border border-[#E0E0E0] rounded-full flex items-center justify-center"
              onClick={onClose}
              aria-label="Close"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-[#262B3D]" viewBox="0 0 24 24" fill="none">
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
      </header>

      <div className="pb-6 md:pb-10">
        <section className="relative w-full md:w-[95%] mx-auto md:my-10 md:px-[60px]">
          <div className="relative w-full h-[240px] md:h-[600px] overflow-hidden md:rounded-2xl">
            <img
              src={activeStudy.heroImage}
              alt={activeStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-4 md:bottom-12 md:left-10 text-white max-w-[90%] md:max-w-[600px] z-10">
              <div className="text-xs md:text-lg font-medium opacity-90 mb-1 md:mb-3">
                {activeStudy.subtitle}
              </div>
              <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6 leading-[1.2]">
                {activeStudy.title}
              </h1>
              <a
                href={activeStudy.launchUrl}
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/20 backdrop-blur-[10px] rounded-md font-medium hover:bg-white/30 transition-colors text-xs md:text-base"
              >
                Launch Website
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 16 16" fill="none">
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
        </section>

        <section className="flex flex-col md:flex-row md:-mt-[50px] relative z-10 w-full md:w-screen md:left-1/2 md:-translate-x-1/2 md:px-[15px]">
          <div className="flex-1 p-4 md:p-8 bg-[#EBFCF4]">
            <div
              className={`grid grid-cols-1 ${
                activeStudy.bulletPoints.length > 1 ? "md:grid-cols-2" : ""
              } gap-5 md:gap-6`}
            >
              {activeStudy.bulletPoints.map((group) => (
                <div key={group.title}>
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-5 text-[#262B3D]">
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5 md:space-y-3 text-[#4A4A4A] text-sm md:text-[15px] list-none">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#02C5AF] rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 md:p-8 bg-[#016853] text-white">
            <h3 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-white">
              Project Overview
            </h3>
            <p className="text-sm md:text-base leading-[1.5] opacity-90 text-white">
              {activeStudy.projectOverview}
            </p>
          </div>
        </section>

        {processItem && (
          <section className="w-full md:w-3/4 mx-auto py-6 md:py-20 px-4 md:pl-[200px] md:pr-[200px] bg-white flex flex-col md:flex-row md:gap-10">
            <div className="md:flex-[0_0_65%]">
              <div className="text-[#02C5AF] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
                Web Design Process
              </div>
              <h2 className="text-xl md:text-[36px] font-semibold text-[#262B3D] mb-3 md:mb-5 leading-[1.3]">
                {processItem.title}
              </h2>
              <p className="text-sm md:text-base leading-[1.5] text-[#4A4A4A] mb-4 md:mb-8">
                {processItem.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-5 md:mb-8">
                {processItem.highlights.map((item) => (
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
                    <span className="text-sm md:text-[15px] text-[#262B3D]">{item}</span>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center px-5 py-2.5 md:px-7 md:py-3.5 bg-[#02C5AF] text-white font-semibold rounded-md hover:bg-[#01b09c] transition-colors text-sm md:text-base">
                {processItem.ctaLabel}
              </button>
            </div>
            <div className="mt-4 md:mt-0 md:flex-1 rounded-lg overflow-hidden h-[180px] md:h-auto">
              <img
                src={processItem.image}
                alt={`${activeStudy.title} process`}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        <section className="w-full md:w-3/4 mx-auto py-6 md:py-[60px] px-4 md:pl-[200px] md:pr-[200px] bg-[#F1FEFF]">
          <div className="text-[#02C5AF] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
            Key Features
          </div>
          <h2 className="text-xl md:text-[36px] font-semibold text-[#262B3D] mb-4 md:mb-5">
            Advanced Functionality
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[30px] place-items-center overflow-x-visible mt-4 md:mt-0">
            {activeStudy.keyFeatures.map((feature) => (
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
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full md:max-w-[1200px] mx-auto px-4 md:px-20 py-4 md:py-10">
          <div className="relative mb-4 md:mb-6 overflow-hidden">
            <div className="grid grid-cols-3 gap-2.5 md:gap-4 px-1">
              {visibleThumbnails.map((src, localIndex) => {
                const absoluteIndex = galleryPage * THUMBNAILS_PER_PAGE + localIndex;

                return (
                  <Image
                    height={120}
                    width={180}
                    key={`${src}-${absoluteIndex}`}
                    src={src}
                    alt={`${activeStudy.title} gallery ${absoluteIndex + 1}`}
                    className={`w-[60px] h-[60px] md:w-full md:h-[120px] object-cover rounded-full md:rounded-lg cursor-pointer border-2 ${
                      absoluteIndex === activeGalleryIndex
                        ? "border-[#016853] shadow-[0_2px_8px_rgba(1,104,83,0.15)]"
                        : "border-transparent"
                    } hover:opacity-90 transition-all`}
                    onClick={() => setActiveGalleryIndex(absoluteIndex)}
                  />
                );
              })}
            </div>

            <button
              className={`absolute top-1/2 -translate-y-1/2 left-[-4px] md:left-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-all z-[2] ${
                galleryPage === 0 ? "hidden" : ""
              }`}
              onClick={goToPreviousThumbnails}
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
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
                galleryPage === maxGalleryPage ? "hidden" : ""
              }`}
              onClick={goToNextThumbnails}
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
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

          <div className="w-full h-[220px] md:h-[500px] rounded-lg overflow-hidden mb-4 md:mb-6">
            <img
              src={activeImageSrc}
              alt={`${activeStudy.title} active gallery`}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="w-full md:max-w-[1200px] mx-auto py-6 md:py-20 px-4 md:px-20 bg-white mb-5 md:mb-10">
          <div className="text-[#02C5AF] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
            Testimonials
          </div>
          <h2 className="text-xl md:text-[36px] font-semibold text-[#262B3D] mb-4 md:mb-10">
            What Our Clients Say
          </h2>
          <div className="flex flex-col md:flex-row gap-5 md:gap-[60px] mt-4 md:mt-10 md:items-start">
            <div className="flex-1 md:max-w-[600px]">
              <svg className="mb-3 md:mb-6 w-6 h-5" viewBox="0 0 33 28" fill="none">
                <path
                  fill="#016853"
                  d="M17.883 17.3311C17.883 11.9311 19.1453 7.79346 21.67 4.91816C24.2648 1.97272 27.7362 0.5 32.0842 0.5V5.75971C29.9803 5.75971 28.2972 6.35581 27.0349 7.54801C25.8427 8.67008 25.2466 10.1779 25.2466 12.0714V13.1233C25.2466 13.2636 25.2817 13.3688 25.3518 13.4389C25.5622 13.4389 25.7726 13.4038 25.983 13.3337C26.544 13.1934 26.9998 13.1233 27.3505 13.1233C28.7531 13.1233 29.9803 13.7545 31.0323 15.0168C32.0842 16.2791 32.6102 17.9272 32.6102 19.9609C32.6102 22.0648 31.9089 23.818 30.5063 25.2206C29.1739 26.6232 27.4908 27.3245 25.457 27.3245C23.1427 27.3245 21.2843 26.483 19.8817 24.7999C18.5492 23.1168 17.883 20.6272 17.883 17.3311ZM0 17.3311C0 11.9311 1.26233 7.79346 3.78699 4.91816C6.38178 1.97272 9.85319 0.5 14.2012 0.5V5.75971C12.0973 5.75971 10.4142 6.35581 9.1519 7.54801C7.95969 8.67008 7.36359 10.1779 7.36359 12.0714V13.1233C7.36359 13.2636 7.39866 13.3688 7.46879 13.4389C7.67918 13.4389 7.88956 13.4038 8.09995 13.3337C8.66099 13.1934 9.11683 13.1233 9.46748 13.1233C10.8701 13.1233 12.0973 13.7545 13.1493 15.0168C14.2012 16.2791 14.7272 17.9272 14.7272 19.9609C14.7272 22.0648 14.0259 23.818 12.6233 25.2206C11.2908 26.6232 9.60774 27.3245 7.57398 27.3245C5.25971 27.3245 3.40128 26.483 1.99869 24.7999C0.66623 23.1168 0 20.6272 0 17.3311Z"
                />
              </svg>

              <div className="text-base md:text-2xl font-semibold leading-[1.5] text-[#262B3D] mb-4 md:mb-8">
                {activeStudy.testimonialQuote}
              </div>

              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-0">
                <Image
                  height={40}
                  width={40}
                  src={activeStudy.testimonialAvatar}
                  alt={activeStudy.testimonialAuthor}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm md:text-lg font-semibold text-[#262B3D] mb-0.5 md:mb-1">
                    {activeStudy.testimonialAuthor}
                  </div>
                  <div className="text-xs md:text-sm text-[#4A4A4A]">
                    {activeStudy.testimonialRole}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden aspect-[16/9] w-full md:flex-[0_0_43%]">
              <img
                src={activeStudy.videoTestimonial}
                alt={`${activeStudy.title} testimonial`}
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
        </section>
      </div>
    </div>
  );
}
