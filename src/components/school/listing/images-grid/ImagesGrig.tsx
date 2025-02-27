"use client";
import Image from "next/image";
import React, { useState } from "react";
import PhotoGallery from "../photo-gallery/PhotoGallery";

interface SchoolInfo {
  name: string;
  ranking: string;
  grade: string;
  type: string;
  grades: string;
  location: string;
  reviews: {
    rating: number;
    count: number;
  };
}

const CameraIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 16 16"
  >
    <path
      fill="white"
      d="M4.72705 1H3.72705V3H4.72705H11.2726H12.2726V1H11.2726H4.72705ZM2 3.18164H1V4.18164V13.9999V14.9999H2H14.0001H15.0001V13.9999V4.18164V3.18164H14.0001H2ZM3 12.9999V12.8182H4.72705H11.818H13.0001V12.9999H3ZM4.06269 11.0707L3 12.0154V5.18164H13.0001V11.9463L12.7125 11.3709L10.5306 7.00725L9.94708 5.84017L8.97183 6.70706L4.06269 11.0707ZM7.35725 10.8182H10.2L9.32531 9.06877L7.35725 10.8182ZM6.36348 6.90916C6.36348 7.51166 5.87506 8.00008 5.27256 8.00008C4.67006 8.00008 4.18164 7.51166 4.18164 6.90916C4.18164 6.30666 4.67006 5.81824 5.27256 5.81824C5.87506 5.81824 6.36348 6.30666 6.36348 6.90916Z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </svg>
);

const schoolInfo: SchoolInfo = {
  name: "Lincoln Academy",
  ranking: "#4 in Best Public Elementary Schools in Arizona",
  grade: "A+",
  type: "Public, Charter",
  grades: "K-12",
  location: "FLAGSTAFF, AZ",
  reviews: {
    rating: 4,
    count: 73,
  },
};

const ImagesGrig = ({ images }: { images: Array<string> }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5">
      <div className="relative w-full h-64 sm:h-96 sm:col-span-2">
        <Image
          src={images[0]}
          alt="Main School Photo"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-[10px] bg-white px-2 py-1 font-bold text-xs sm:text-sm">
          COLLEGE
        </div>
        <div className="absolute bottom-0 left-[87px] sm:left-24 bg-gray-100 px-2 py-1 font-bold text-xs sm:text-sm text-gray-600">
          GRAD SCHOOL
        </div>
      </div>
      <div className="grid grid-rows-2 gap-0.5 sm:col-span-1">
        {images.slice(1).map((img, idx) => (
          <div key={idx} className="relative w-full h-32 sm:h-[188px]">
            <Image
              src={img}
              alt={`School Photo ${idx + 2}`}
              fill
              className="object-cover"
            />
            {idx === 0 && (
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <CameraIcon />
                View all photos
              </button>
            )}
            {idx === 1 && (
              <div className="absolute top-2 right-2 flex items-center gap-1 sm:gap-2 bg-white text-green-700 px-2 sm:px-3 py-1 sm:py-2 rounded cursor-pointer font-semibold text-xs sm:text-sm">
                <svg
                  width="16"
                  height="16"
                  // sm={{ width: "20", height: "20" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM12 7C12.4142 7 12.75 7.33579 12.75 7.75V11.25H16.25C16.6642 11.25 17 11.5858 17 12C17 12.4142 16.6642 12.75 16.25 12.75H12.75V16.25C12.75 16.6642 12.4142 17 12 17C11.5858 17 11.25 16.6642 11.25 16.25V12.75H7.75C7.33579 12.75 7 12.4142 7 12C7 11.5858 7.33579 11.25 7.75 11.25H11.25V7.75C11.25 7.33579 11.5858 7 12 7Z"
                    fill="currentColor"
                  />
                </svg>
                Add To List
              </div>
            )}
          </div>
        ))}
      </div>
      <PhotoGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        schoolName={schoolInfo.name}
      />
    </div>
  );
};

export default ImagesGrig;
