"use client";
import { SchoolInfoInterface } from "@/app/schools/listing/page";
import React from "react";
import SchoolInfoDesktop from "./SchoolInfoDesktop";
import SchoolInfoMobile from "./SchoolInfoMobile";
import useWindowWidth from "@/hooks/useWindowWidth";

interface SchoolInfoProps {
  schoolInfo: SchoolInfoInterface;
  images: string[];
  variant: "mobile" | "desktop";
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({
  schoolInfo,
  images,
  variant,
}) => {
  const isMobile = useWindowWidth();
  if (isMobile) {
    return <SchoolInfoMobile images={images} />;
  }
  return <SchoolInfoDesktop schoolInfo={schoolInfo} />;
};

export default SchoolInfo;
