"use client";
import React from "react";
import ImagesGrigDesktop from "./ImagesGrigDesktop";
import ImagesGridMobile from "./ImagesGridMobile";
import useWindowWidth from "@/hooks/useWindowWidth";

interface ImagesGridProps {
  images: string[];
  variant: "mobile" | "desktop";
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ images, variant }) => {
  const isMobile = useWindowWidth();
  if (isMobile) {
    return <ImagesGridMobile images={images} />;
  }
  return <ImagesGrigDesktop images={images} />;
};

export default ImagesGrid;
