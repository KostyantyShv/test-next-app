"use client";

import React, { useState } from "react";
import PhotoGalleryMobile from "../photo-gallery/PhotoGalleryMobile";
interface SchoolPhotosProps {
  images: string[];
}

const ImagesGridMobile: React.FC<SchoolPhotosProps> = ({ images }) => {
  const [isGalleryDrawerOpen, setIsGalleryDrawerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      <div className="relative w-full max-w-[390px] mx-auto">
        <div className="relative w-full h-[200px]">
          <img
            src={images[0]}
            alt="Main School Photo"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setIsGalleryDrawerOpen(true)}
            className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 text-white py-1.5 px-2.5 rounded text-xs"
          >
            <svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 16 16">
              <path d="M4.72705 1H3.72705V3H4.72705H11.2726H12.2726V1H11.2726H4.72705ZM2 3.18164H1V4.18164V13.9999V14.9999H2H14.0001H15.0001V13.9999V4.18164V3.18164H14.0001H2ZM3 12.9999V12.8182H4.72705H11.818H13.0001V12.9999H3ZM4.06269 11.0707L3 12.0154V5.18164H13.0001V11.9463L12.7125 11.3709L10.5306 7.00725L9.94708 5.84017L8.97183 6.70706L4.06269 11.0707ZM7.35725 10.8182H10.2L9.32531 9.06877L7.35725 10.8182ZM6.36348 6.90916C6.36348 7.51166 5.87506 8.00008 5.27256 8.00008C4.67006 8.00008 4.18164 7.51166 4.18164 6.90916C4.18164 6.30666 4.67006 5.81824 5.27256 5.81824C5.87506 5.81824 6.36348 6.30666 6.36348 6.90916Z" />
            </svg>
            View all
          </button>
        </div>
      </div>

      <PhotoGalleryMobile
        images={images}
        isOpen={isGalleryDrawerOpen}
        setIsOpen={setIsGalleryDrawerOpen}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </>
  );
};

export default ImagesGridMobile;
