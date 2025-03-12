"use client";
import React from "react";
import ImagesGrigDesktop from "./ImagesGrigDesktop";
import ImagesGridMobile from "./ImagesGridMobile";

interface ImagesGridProps {
  images: string[];
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ images }) => {
  return (
    <>
      <div className="block md:hidden">
        <ImagesGridMobile images={images} />
      </div>
      <div className="hidden md:block">
        <ImagesGrigDesktop images={images} />
      </div>
    </>
  );
};

export default ImagesGrid;
