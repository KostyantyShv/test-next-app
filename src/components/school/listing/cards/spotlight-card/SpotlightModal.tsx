// components/ProjectPopup.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SpotlightModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const SpotlightModal: React.FC<SpotlightModalProps> = ({ onClose, isOpen }) => {
  const [currentProject, setCurrentProject] = useState(1);
  const totalProjects = 11;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchMove, setTouchMove] = useState<number | null>(null);

  const projectImages = [
    "https://i.ibb.co/jJ4GHXP/img1.jpg",
    "https://i.ibb.co/LJwrLdW/coaching-image.webp",
    "https://i.ibb.co/fVRCnNZY/school2.webp",
  ];

  const handlePrev = () => {
    if (currentProject > 1) setCurrentProject(currentProject - 1);
  };

  const handleNext = () => {
    if (currentProject < totalProjects) setCurrentProject(currentProject + 1);
  };

  const handleSetActiveImage = (index: number) => {
    setActiveImageIndex(index);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-[#E0E0E0] flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="author-info flex items-center gap-3">
          <Image
            src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
            alt="Author"
            width={36}
            height={36}
            className="rounded-full object-cover w-9 h-9 md:w-10 md:h-10"
          />
          <span className="text-sm md:text-base font-semibold text-[#464646] md:text-[#262B3D]">
            Dr. Sarah Anderson
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="navigation flex items-center gap-2">
            <button
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-[#f5f5f5] transition-all duration-200 disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentProject === 1}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6 fill-[#1B1B1B]"
              >
                <path
                  d="M4 12l8 8 1.5-1.5L8 13h12v-2H8l5.5-5.5L12 4z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <span className="text-xs md:text-sm text-[#5F5F5F] md:text-[#4A4A4A] mx-1 md:mx-2">
              {currentProject} of {totalProjects}
            </span>
            <button
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center hover:bg-[#f5f5f5] transition-all duration-200 disabled:opacity-50"
              onClick={handleNext}
              disabled={currentProject === totalProjects}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6 fill-[#1B1B1B]"
              >
                <path
                  d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button
            className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] transition-all duration-200 border-none bg-transparent"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-5 md:h-5 text-[#5F5F5F] md:text-[#4A4A4A]"
            >
              <path
                fill="currentColor"
                d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto md:flex md:gap-6">
        <div className="p-4 md:p-6 md:flex-1 md:min-w-0">
          <div className="text-xs md:text-sm text-[#5F5F5F] mb-2 md:mb-3">
            March 2023
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#464646] md:text-[#262B3D] mb-3 md:mb-4">
            Campus Learning Management System Redesign
          </h1>
          <div className="text-sm md:text-[15px] leading-relaxed text-[#4A4A4A] mb-5 md:mb-6">
            <p className="mb-3">
              Our team undertook a comprehensive redesign of the university`s
              learning management system to enhance student engagement and
              improve the overall learning experience.
            </p>
            <p className="mb-3">
              The redesigned platform features a modern, accessibility-compliant
              interface that prioritizes user experience while maintaining
              robust functionality.
            </p>
            <p>
              Special attention was given to mobile responsiveness and offline
              capabilities, ensuring students can access course materials
              regardless of their location or internet connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            {[
              { label: "Active Users", value: "25,000+" },
              { label: "Course Completion Rate", value: "94.2%" },
              { label: "Student Satisfaction", value: "4.8/5.0" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-3 md:p-4 border border-[#E0E0E0] rounded-lg flex md:block justify-between"
              >
                <div className="text-xs md:text-sm text-[#5F5F5F] mb-0 md:mb-2">
                  {stat.label}
                </div>
                <div className="text-base md:text-lg font-semibold text-[#262B3D]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 md:mb-8 md:flex md:flex-col-reverse">
            <div className="w-full h-[200px] md:h-[400px] rounded-lg overflow-hidden mb-3 md:mb-4">
              <Image
                src={projectImages[activeImageIndex]}
                alt="Active Project Preview"
                width={800}
                height={400}
                className="w-full h-full object-cover rounded-lg transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3">
              {projectImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Project Preview ${index + 1}`}
                  width={100}
                  height={100}
                  className={`w-10 h-10 md:w-full md:h-[120px] rounded-full md:rounded-lg object-cover cursor-pointer border-2 ${
                    activeImageIndex === index
                      ? "border-[#0B6333]"
                      : "border-transparent"
                  } hover:opacity-90 transition-all duration-300 flex-shrink-0`}
                  onClick={() => handleSetActiveImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
            {[
              "Schedule a Demo Session",
              "Download Technical Documentation",
              "View Implementation Guide",
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 md:p-4 border border-[#E0E0E0] rounded-lg"
              >
                <div className="text-sm md:text-[15px] font-medium text-[#464646] md:text-[#262B3D]">
                  {text}
                </div>
                <button className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-[#EBFCF4] text-[#016853] md:bg-[#02C5AF] md:text-white border-none font-semibold cursor-pointer hover:bg-[#D7F7E9] md:hover:bg-[#00b19d] transition-all duration-200 text-xs md:text-base">
                  {text.includes("Schedule")
                    ? "Book Now"
                    : text.includes("Download")
                    ? "Download"
                    : "View Guide"}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
            {[
              "Education Technology",
              "UX Design",
              "Learning Management",
              "Higher Education",
              "Mobile Learning",
            ].map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#EBFCF4] text-[#016853] rounded-full text-xs md:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-[#F8F9FD] rounded-lg p-4 md:p-6 flex items-center gap-3 md:gap-4 mb-6 md:mb-0">
            <Image
              src="https://i.ibb.co/Z1RrcHzB/dribble.png"
              alt="Vendor Logo"
              width={40}
              height={40}
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-sm md:text-base font-semibold text-[#464646] md:text-[#262B3D] mb-1">
                Contact EduTech Solutions
              </div>
              <div className="text-xs md:text-sm text-[#5F5F5F]">
                Ready to transform your educational institution?
              </div>
            </div>
            <button className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-[#EBFCF4] text-[#016853] md:bg-[#02C5AF] md:text-white border-none font-semibold cursor-pointer hover:bg-[#D7F7E9] md:hover:bg-[#00b19d] transition-all duration-200 text-xs md:text-base whitespace-nowrap">
              Send Message
            </button>
          </div>
        </div>

        {/* Sidebar - Becomes bottom content on mobile */}
        <div className="p-4 md:p-6 md:w-[300px] md:border-l md:border-[#E0E0E0] md:sticky md:top-[73px] md:h-[calc(90vh-73px)] md:overflow-y-auto border-t md:border-t-0 border-[#E0E0E0]">
          <Image
            src="https://i.ibb.co/jJ4GHXP/img1.jpg"
            alt="School Banner"
            width={252}
            height={140}
            className="w-full h-[140px] md:h-[160px] object-cover rounded-lg mb-4"
          />
          <h2 className="text-base md:text-lg font-semibold text-[#464646] md:text-[#262B3D] mb-2 md:mb-3">
            EduTech Solutions
          </h2>
          <p className="text-xs md:text-sm text-[#5F5F5F] leading-relaxed mb-5 md:mb-6">
            Leading provider of innovative educational technology solutions,
            specializing in learning management systems and digital learning
            environments for higher education.
          </p>

          <div className="flex flex-col gap-3 mb-6 md:mb-8">
            {[
              { text: "📚 View Course Catalog", href: "#" },
              { text: "🎓 Student Success Stories", href: "#" },
              { text: "📊 Analytics Dashboard", href: "#" },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-[#142E53] text-sm font-medium hover:text-[#02C5AF] transition-all duration-200 py-2 md:py-0"
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4">
                  <path d="M9.73423 5.4902L10.1013 5.06529C10.7403 4.43601 11.6014 4.08294 12.499 4.08301C13.4052 4.08307 14.2743 4.44313 14.915 5.08397C15.5558 5.72481 15.9157 6.59395 15.9157 7.50017C15.9156 8.39808 15.5621 9.25952 14.9323 9.89853L14.5081 10.2671C14.1954 10.5388 14.1622 11.0125 14.4339 11.3252C14.7055 11.6379 15.1792 11.6711 15.4919 11.3994L15.9369 11.0127C15.9501 11.0013 15.9629 10.9893 15.9753 10.977C16.8975 10.0549 17.4156 8.80433 17.4157 7.50028C17.4158 6.19623 16.8978 4.94555 15.9758 4.02339C15.0537 3.10122 13.8031 2.5831 12.4991 2.58301C11.195 2.58292 9.94437 3.10086 9.0222 4.0229C9.00929 4.0358 8.99686 4.04918 8.98492 4.06299L8.59909 4.50966C8.32832 4.82312 8.36293 5.29673 8.67639 5.5675C8.98985 5.83827 9.46346 5.80366 9.73423 5.4902Z" />
                  <path d="M13.0303 8.03031C13.3232 7.73742 13.3232 7.26254 13.0303 6.96965C12.7374 6.67676 12.2626 6.67676 11.9697 6.96965L6.96966 11.9697C6.67677 12.2625 6.67677 12.7374 6.96966 13.0303C7.26256 13.3232 7.73743 13.3232 8.03032 13.0303L13.0303 8.03031Z" />
                  <path d="M9.68144 15.0931L9.3144 15.518C8.67538 16.1472 7.81422 16.5003 6.91668 16.5002C6.01046 16.5002 5.14137 16.1401 4.50062 15.4993C3.85987 14.8584 3.49994 13.9893 3.5 13.0831C3.50006 12.1852 3.85354 11.3237 4.48339 10.6847L4.9076 10.3161C5.22026 10.0444 5.25349 9.57073 4.98181 9.25806C4.71013 8.9454 4.23642 8.91217 3.92375 9.18385L3.47875 9.57052C3.46554 9.58199 3.45275 9.59392 3.44038 9.60629C2.51821 10.5283 2.00009 11.7789 2 13.083C1.99991 14.387 2.51785 15.6377 3.43989 16.5599C4.36192 17.482 5.61252 18.0002 6.91657 18.0002C8.22062 18.0003 9.4713 17.4824 10.3935 16.5604C10.4064 16.5474 10.4188 16.5341 10.4307 16.5203L10.8166 16.0736C11.0873 15.7601 11.0527 15.2865 10.7393 15.0158C10.4258 14.745 9.9522 14.7796 9.68144 15.0931Z" />
                </svg>
                {link.text}
              </a>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            {[
              {
                viewBox: "0 0 24 24",
                path: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
              },
              {
                viewBox: "0 0 24 24",
                path: "M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z",
              },
              {
                viewBox: "0 0 24 24",
                path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
              },
            ].map((social, index) => (
              <button
                key={index}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F9FD] flex items-center justify-center hover:bg-[#E0E0E0] transition-all duration-200 border-none"
              >
                <svg
                  viewBox={social.viewBox}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#464646] md:text-[#262B3D]"
                >
                  <path fill="currentColor" d={social.path} />
                </svg>
              </button>
            ))}
          </div>

          <button className="w-full py-3 bg-[#EBFCF4] md:bg-[#02C5AF] text-[#016853] md:text-white border-none rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#D7F7E9] md:hover:bg-[#00b19d] transition-all duration-200 text-sm md:text-base">
            Contact Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <path
                fill="currentColor"
                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SpotlightModal;
