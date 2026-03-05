import Image from "next/image";
import { useEffect, useState } from "react";
import { Testimonial } from "./testimonials-data";

interface VideoSectionProps {
  testimonial: Testimonial;
}

export function VideoSection({ testimonial }: VideoSectionProps) {
  const firstName = testimonial.author.firstName;
  const authorFullName = `${testimonial.author.firstName} ${testimonial.author.lastName}`;
  const fallbackVideoThumbnailSrc = "/images/cat.png";
  const [videoThumbnailSrc, setVideoThumbnailSrc] = useState(
    testimonial.video.thumbnailImage || fallbackVideoThumbnailSrc,
  );
  const videoUrl = testimonial.bunnyVideoUrl;
  const fallbackPossessiveLabel = firstName.endsWith("s")
    ? `${firstName}'`
    : `${firstName}'s`;
  const videoTitle = testimonial.video.title || `${fallbackPossessiveLabel} Video`;
  const ctaLabel = testimonial.video.ctaLabel || `Watch ${fallbackPossessiveLabel} story`;

  useEffect(() => {
    setVideoThumbnailSrc(testimonial.video.thumbnailImage || fallbackVideoThumbnailSrc);
  }, [testimonial.video.thumbnailImage]);

  return (
    <div className="md:flex-[0_0_43%] pr-0 md:pr-5">
      <h3 className="mb-3 text-[20px] font-medium text-[#464646]">{videoTitle}</h3>
      <div className="relative h-auto w-full aspect-[16/9] md:aspect-[4/3]">
        <Image
          src={videoThumbnailSrc}
          alt={`${authorFullName} video thumbnail`}
          fill
          className="rounded-xl object-cover"
          onError={() => {
            if (videoThumbnailSrc !== fallbackVideoThumbnailSrc) {
              setVideoThumbnailSrc(fallbackVideoThumbnailSrc);
            }
          }}
        />
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 md:bottom-4 md:left-2 bg-white py-1.5 px-2.5 md:py-2 md:px-3 rounded-lg flex items-center gap-1.5 md:gap-2 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-0.5"
          aria-label={ctaLabel}
        >
          <span className="text-[#346DC2] font-semibold text-xs md:text-sm whitespace-nowrap">
            {ctaLabel}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 33 33"
            height={28}
            width={28}
            className="w-7 h-7 md:w-[33px] md:h-[33px]"
          >
            <circle fill="#0B6333" r="14" cy="16.5" cx="16.5" />
            <path
              fill="white"
              d="M23.433 15.4168L13.9332 9.93204C13.0998 9.45088 12.058 10.0523 12.058 11.0146V21.9841C12.058 22.9464 13.0998 23.5479 13.9332 23.0667L23.433 17.582C24.2664 17.1008 24.2664 15.8979 23.433 15.4168Z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
