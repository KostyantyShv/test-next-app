"use client";
import React from "react";
import SchoolInfoDesktop from "./SchoolInfoDesktop";
import SchoolInfoMobile from "./SchoolInfoMobile";
import { SchoolInfoInterface } from "@/types/school-listings";

interface SchoolInfoProps {
  schoolInfo: SchoolInfoInterface;
  images: string[];
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ schoolInfo, images }) => {
  return (
    <>
      {/* Mobile School Info */}
      <div className="block md:hidden">
        <SchoolInfoMobile images={images} />
      </div>
      
      {/* Desktop School Info */}
      <div className="hidden md:block">
        <SchoolInfoDesktop schoolInfo={schoolInfo} />
      </div>
    </>
  );
};

export default SchoolInfo;
