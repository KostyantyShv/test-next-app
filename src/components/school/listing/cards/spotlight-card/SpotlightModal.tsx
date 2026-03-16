"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Project, ProjectSocialPlatform } from "./project.type";

interface SpotlightModalProps {
  onClose: () => void;
  project: Project;
  allProjects: Project[];
  onProjectChange?: (project: Project) => void;
}

const SOCIAL_ICONS: Record<
  ProjectSocialPlatform,
  { viewBox: string; path: string }
> = {
  twitter: {
    viewBox: "0 0 24 24",
    path: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
  },
  facebook: {
    viewBox: "0 0 24 24",
    path: "M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
  },
};

const SpotlightModal: React.FC<SpotlightModalProps> = ({
  onClose,
  project,
  allProjects,
  onProjectChange,
}) => {
  const currentProjectIndex =
    allProjects.findIndex((item) => item.id === project.id) + 1;
  const totalProjects = allProjects.length;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setImageLoadErrors({});
  }, [project.id]);

  const projectImages = Array.from(
    new Set(
      (project.galleryImages.length > 0
        ? project.galleryImages
        : [project.coverImage]
      ).filter((src): src is string => src.trim().length > 0)
    )
  );

  useEffect(() => {
    if (activeImageIndex >= projectImages.length) {
      setActiveImageIndex(0);
    }
  }, [activeImageIndex, projectImages.length]);

  const activeImageSrc = projectImages[activeImageIndex];
  const isActiveImageBroken = Boolean(
    activeImageSrc && imageLoadErrors[activeImageSrc]
  );

  const handleImageError = (src: string) => {
    setImageLoadErrors((prev) => ({
      ...prev,
      [src]: true,
    }));
  };

  const handlePrev = () => {
    const currentIndex = allProjects.findIndex((item) => item.id === project.id);
    if (currentIndex > 0 && onProjectChange) {
      onProjectChange(allProjects[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = allProjects.findIndex((item) => item.id === project.id);
    if (currentIndex < allProjects.length - 1 && onProjectChange) {
      onProjectChange(allProjects[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E0E0E0] bg-white p-4 md:p-6">
        <div className="author-info flex items-center gap-3">
          <Image
            src={project.authorAvatar}
            alt={project.authorName}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
          />
          <span className="text-sm font-semibold text-[#464646] md:text-base md:text-[#262B3D]">
            {project.authorName}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="navigation flex items-center gap-2">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E0E0E0] bg-white transition-all duration-200 hover:bg-[#f5f5f5] disabled:opacity-50 md:h-8 md:w-8"
              onClick={handlePrev}
              disabled={currentProjectIndex === 1}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-[#1B1B1B] md:h-6 md:w-6"
              >
                <path
                  d="M4 12l8 8 1.5-1.5L8 13h12v-2H8l5.5-5.5L12 4z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <span className="mx-1 text-xs text-[#5F5F5F] md:mx-2 md:text-sm md:text-[#4A4A4A]">
              {currentProjectIndex} of {totalProjects}
            </span>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E0E0E0] bg-white transition-all duration-200 hover:bg-[#f5f5f5] disabled:opacity-50 md:h-8 md:w-8"
              onClick={handleNext}
              disabled={currentProjectIndex === totalProjects}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-[#1B1B1B] md:h-6 md:w-6"
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
            className="flex h-7 w-7 items-center justify-center rounded-full border-none bg-transparent transition-all duration-200 hover:bg-[#f5f5f5] md:h-8 md:w-8"
            onClick={onClose}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#5F5F5F] md:h-5 md:w-5 md:text-[#4A4A4A]"
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

      <div className="flex-1 overflow-y-auto md:flex md:gap-6">
        <div className="p-4 md:min-w-0 md:flex-1 md:p-6">
          <div className="mb-2 text-xs text-[#5F5F5F] md:mb-3 md:text-sm">
            {project.date}
          </div>
          <h1 className="mb-3 text-xl font-semibold text-[#464646] md:mb-4 md:text-2xl md:text-[#262B3D]">
            {project.title}
          </h1>
          <div className="mb-5 text-sm leading-relaxed text-[#4A4A4A] md:mb-6 md:text-[15px]">
            <p>{project.description}</p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 md:mb-8 md:grid-cols-3 md:gap-6">
            {project.stats.map((stat) => (
              <div
                key={`${project.id}-${stat.label}`}
                className="flex justify-between rounded-lg border border-[#E0E0E0] p-3 md:block md:p-4"
              >
                <div className="mb-0 text-xs text-[#5F5F5F] md:mb-2 md:text-sm">
                  {stat.label}
                </div>
                <div className="text-base font-semibold text-[#262B3D] md:text-lg">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 md:mb-8 md:flex md:flex-col-reverse">
            <div className="mb-3 h-[200px] w-full overflow-hidden rounded-lg md:mb-4 md:h-[400px]">
              {activeImageSrc && !isActiveImageBroken ? (
                <Image
                  key={activeImageSrc}
                  src={activeImageSrc}
                  alt={`${project.title} preview ${activeImageIndex + 1}`}
                  width={800}
                  height={400}
                  className="h-full w-full rounded-lg object-cover transition-all duration-300"
                  onError={() => handleImageError(activeImageSrc)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-[#E0E0E0] bg-[#F8F9FD] text-[#5F5F5F]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mb-2 h-6 w-6"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-sm font-medium">Preview unavailable</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-3">
              {projectImages.map((src, index) =>
                imageLoadErrors[src] ? (
                  <button
                    key={src}
                    type="button"
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#E0E0E0] bg-[#F8F9FD] text-[#9CA3AF] md:h-[120px] md:w-full md:rounded-lg ${
                      activeImageIndex === index ? "border-[#0B6333]" : ""
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`${project.title} preview ${index + 1} unavailable`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-4-3 3-4-4-5 5V5z" />
                    </svg>
                  </button>
                ) : (
                  <Image
                    key={src}
                    src={src}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className={`h-10 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 object-cover transition-all duration-300 hover:opacity-90 md:h-[120px] md:w-full md:rounded-lg ${
                      activeImageIndex === index
                        ? "border-[#0B6333]"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                    onError={() => handleImageError(src)}
                  />
                )
              )}
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-3 md:mb-8 md:gap-4">
            {project.actionItems.map((item) => (
              <div
                key={`${project.id}-${item.title}`}
                className="flex items-center justify-between rounded-lg border border-[#E0E0E0] p-3 md:p-4"
              >
                <div className="text-sm font-semibold text-[#464646] md:text-[15px] md:text-[#262B3D]">
                  {item.title}
                </div>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border-none bg-[#EBFCF4] px-3 py-1 text-xs font-semibold text-[#016853] transition-all duration-200 hover:bg-[#D7F7E9] md:bg-[#02C5AF] md:px-4 md:py-2 md:text-base md:text-white md:hover:bg-[#00b19d]"
                >
                  {item.buttonLabel}
                </a>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap gap-2 font-semibold md:mb-8">
            {project.tags.map((tag) => (
              <span
                key={`${project.id}-${tag}`}
                className="rounded-full bg-[#EBFCF4] px-3 py-1.5 text-xs text-[#016853] md:text-sm"
              >
                {tag}
              </span>
            ))}
            {project.tagCount > 0 ? (
              <span className="rounded-full bg-[#EBFCF4] px-3 py-1.5 text-xs font-semibold text-[#016853] md:text-sm">
                +{project.tagCount}
              </span>
            ) : null}
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-lg bg-[#F8F9FD] p-4 md:mb-0 md:gap-4 md:p-6">
            <Image
              src={project.contactCard.logoImage}
              alt={project.contactCard.title}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover md:h-12 md:w-12"
            />
            <div className="flex-1">
              <div className="mb-1 text-sm font-semibold text-[#464646] md:text-base md:text-[#262B3D]">
                {project.contactCard.title}
              </div>
              <div className="text-xs text-[#5F5F5F] md:text-sm">
                {project.contactCard.description}
              </div>
            </div>
            <a
              href={project.contactCard.buttonHref}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap rounded-md border-none bg-[#EBFCF4] px-3 py-1 text-xs font-semibold text-[#016853] transition-all duration-200 hover:bg-[#D7F7E9] md:bg-[#02C5AF] md:px-4 md:py-2 md:text-base md:text-white md:hover:bg-[#00b19d]"
            >
              {project.contactCard.buttonLabel}
            </a>
          </div>
        </div>

        <div className="border-t border-[#E0E0E0] p-4 md:sticky md:top-[73px] md:h-[calc(90vh-73px)] md:w-[300px] md:overflow-y-auto md:border-l md:border-t-0 md:p-6">
          <Image
            src={project.sidebar.bannerImage}
            alt={`${project.sidebar.title} banner`}
            width={252}
            height={140}
            className="mb-4 h-[140px] w-full rounded-lg object-cover md:h-[160px]"
          />
          <h2 className="mb-2 text-base font-semibold text-[#464646] md:mb-3 md:text-lg md:text-[#262B3D]">
            {project.sidebar.title}
          </h2>
          <p className="mb-5 text-xs leading-relaxed text-[#5F5F5F] md:mb-6 md:text-sm">
            {project.sidebar.description}
          </p>

          <div className="mb-6 flex flex-col gap-3 md:mb-8">
            {project.sidebar.resourceLinks.map((link) => (
              <a
                key={`${project.id}-${link.label}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2 text-sm font-semibold text-[#142E53] transition-all duration-200 hover:text-[#02C5AF] md:py-0"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4">
                  <path d="M9.73423 5.4902L10.1013 5.06529C10.7403 4.43601 11.6014 4.08294 12.499 4.08301C13.4052 4.08307 14.2743 4.44313 14.915 5.08397C15.5558 5.72481 15.9157 6.59395 15.9157 7.50017C15.9156 8.39808 15.5621 9.25952 14.9323 9.89853L14.5081 10.2671C14.1954 10.5388 14.1622 11.0125 14.4339 11.3252C14.7055 11.6379 15.1792 11.6711 15.4919 11.3994L15.9369 11.0127C15.9501 11.0013 15.9629 10.9893 15.9753 10.977C16.8975 10.0549 17.4156 8.80433 17.4157 7.50028C17.4158 6.19623 16.8978 4.94555 15.9758 4.02339C15.0537 3.10122 13.8031 2.5831 12.4991 2.58301C11.195 2.58292 9.94437 3.10086 9.0222 4.0229C9.00929 4.0358 8.99686 4.04918 8.98492 4.06299L8.59909 4.50966C8.32832 4.82312 8.36293 5.29673 8.67639 5.5675C8.98985 5.83827 9.46346 5.80366 9.73423 5.4902Z" />
                  <path d="M13.0303 8.03031C13.3232 7.73742 13.3232 7.26254 13.0303 6.96965C12.7374 6.67676 12.2626 6.67676 11.9697 6.96965L6.96966 11.9697C6.67677 12.2625 6.67677 12.7374 6.96966 13.0303C7.26256 13.3232 7.73743 13.3232 8.03032 13.0303L13.0303 8.03031Z" />
                  <path d="M9.68144 15.0931L9.3144 15.518C8.67538 16.1472 7.81422 16.5003 6.91668 16.5002C6.01046 16.5002 5.14137 16.1401 4.50062 15.4993C3.85987 14.8584 3.49994 13.9893 3.5 13.0831C3.50006 12.1852 3.85354 11.3237 4.48339 10.6847L4.9076 10.3161C5.22026 10.0444 5.25349 9.57073 4.98181 9.25806C4.71013 8.9454 4.23642 8.91217 3.92375 9.18385L3.47875 9.57052C3.46554 9.58199 3.45275 9.59392 3.44038 9.60629C2.51821 10.5283 2.00009 11.7789 2 13.083C1.99991 14.387 2.51785 15.6377 3.43989 16.5599C4.36192 17.482 5.61252 18.0002 6.91657 18.0002C8.22062 18.0003 9.4713 17.4824 10.3935 16.5604C10.4064 16.5474 10.4188 16.5341 10.4307 16.5203L10.8166 16.0736C11.0873 15.7601 11.0527 15.2865 10.7393 15.0158C10.4258 14.745 9.9522 14.7796 9.68144 15.0931Z" />
                </svg>
                {link.label}
              </a>
            ))}
          </div>

          <div className="mb-6 flex gap-3">
            {project.sidebar.socialLinks.map((socialLink) => {
              const icon = SOCIAL_ICONS[socialLink.platform];

              return (
                <a
                  key={`${project.id}-${socialLink.platform}`}
                  href={socialLink.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={socialLink.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F9FD] transition-all duration-200 hover:bg-[#E0E0E0] md:h-10 md:w-10"
                >
                  <svg
                    viewBox={icon.viewBox}
                    className="h-4 w-4 text-[#464646] md:h-5 md:w-5 md:text-[#262B3D]"
                  >
                    <path fill="currentColor" d={icon.path} />
                  </svg>
                </a>
              );
            })}
          </div>

          <a
            href={project.sidebar.primaryActionHref}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md border-none bg-[#EBFCF4] py-3 text-sm font-semibold text-[#016853] transition-all duration-200 hover:bg-[#D7F7E9] md:bg-[#02C5AF] md:text-base md:text-white md:hover:bg-[#00b19d]"
          >
            {project.sidebar.primaryActionLabel}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path
                fill="currentColor"
                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default SpotlightModal;
