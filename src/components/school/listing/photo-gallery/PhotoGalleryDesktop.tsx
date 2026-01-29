"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PhotoGalleryDesktopProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  schoolName: string;
}

const GalleryNavIcon = ({ className = "" }) => (
  <svg
    className={`w-8 h-8 sm:w-12 sm:h-12 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 49 48"
  >
    <circle
      stroke="#DFDDDB"
      fill="white"
      r="23.5"
      cy="24"
      cx="24.1509"
    ></circle>
    <path
      fill="#1B1B1B"
      d="M20.6725 16.5389C19.7525 17.4589 20.1925 18.5989 20.8925 19.3189L25.5525 23.9789L20.8925 28.6389C20.1925 29.3389 19.7525 30.4789 20.6725 31.4189C21.6325 32.3789 22.7325 31.8989 23.4525 31.1989L30.6525 23.9989L30.6325 23.9789L30.6525 23.9589L23.4525 16.7589C22.7325 16.0589 21.6325 15.5789 20.6725 16.5389Z"
    />
  </svg>
);

const PhotoGalleryDesktop: React.FC<PhotoGalleryDesktopProps> = ({
  isOpen,
  onClose,
  images,
  schoolName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/90 z-[9999]"
      onClick={(e) => {
        // close when clicking outside popup content
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header (1:1 with HTML) */}
      <div className="bg-white px-6 py-4 flex justify-between items-center relative z-[2]">
        <h2 className="text-[20px] font-semibold text-[#1B1B1B]">
          {schoolName}
        </h2>
        <button
          onClick={onClose}
          className="w-6 h-6 text-[#5F5F5F] opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Close gallery"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
            />
          </svg>
        </button>
      </div>

      {/* Counter (1:1 placement) */}
      <div className="absolute top-[80px] right-6 z-[2] text-white text-sm bg-black/60 px-3 py-1 rounded">
        {activeIndex + 1} of {images.length}
      </div>

      {/* Navigation arrows (1:1) */}
      <button
        type="button"
        onClick={() =>
          setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute top-1/2 left-6 -translate-y-1/2 z-[2] opacity-85 hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <GalleryNavIcon className="rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
        className="absolute top-1/2 right-6 -translate-y-1/2 z-[2] opacity-85 hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <GalleryNavIcon />
      </button>

      {/* Main image area (1:1) */}
      <div className="w-full h-[calc(100%-200px)] flex justify-center items-center">
        <Image
          src={images[activeIndex]}
          alt={`School photo ${activeIndex + 1}`}
          width={1400}
          height={900}
          className="max-w-full max-h-full object-contain"
          priority
        />
      </div>

      {/* Thumbnails (1:1) */}
      <div className="absolute bottom-5 left-0 w-full px-5 flex gap-[10px] overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`w-[120px] h-[80px] flex-shrink-0 border-2 ${
              activeIndex === idx ? "border-[#089E68]" : "border-transparent"
            }`}
            aria-label={`Thumbnail ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={120}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGalleryDesktop;
