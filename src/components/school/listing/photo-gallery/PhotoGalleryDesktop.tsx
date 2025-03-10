"use client";
import { Icon } from "@/components/ui/Icon";
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
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-90 z-[9999] flex flex-col">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center bg-black bg-opacity-60 p-4">
        <h2 className="text-white text-base sm:text-lg font-semibold">
          {schoolName}
        </h2>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <Icon name="close" />
        </button>
      </div>
      <div className="absolute top-12 sm:top-16 right-4 sm:right-6 bg-black bg-opacity-60 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm">
        {activeIndex + 1} of {images.length}
      </div>
      <div className="flex flex-1 justify-center items-center px-2 sm:px-6">
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute left-2 sm:left-6 text-white bg-opacity-40 p-2 sm:p-3 rounded-full hover:bg-opacity-60"
        >
          <GalleryNavIcon className="rotate-180" />
        </button>
        <Image
          src={images[activeIndex]}
          alt={`School photo ${activeIndex + 1}`}
          width={500}
          height={800}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-2 sm:right-6 bg-opacity-40 p-2 sm:p-3 rounded-full hover:bg-opacity-60"
        >
          <GalleryNavIcon />
        </button>
      </div>
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-6 flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-[120px] h-[80px] flex-shrink-0 ${
              activeIndex === idx ? "border-2 border-emerald-600" : ""
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={120}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGalleryDesktop;
