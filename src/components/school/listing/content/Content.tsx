"use client";
import React from "react";
import ContentDesktop from "./ContentDesktop";
import ContentMobile from "./ContentMobile";

type SchoolType = "k12" | "college" | "grad";

interface ContentProps {
  schoolType?: SchoolType;
}

const Content: React.FC<ContentProps> = ({ schoolType = "college" }) => {
  return (
    <>
      {/* Mobile Content */}
      <div className="block md:hidden">
        <ContentMobile schoolType={schoolType} />
      </div>
      
      {/* Desktop Content */}
      <div className="hidden md:block">
        <ContentDesktop schoolType={schoolType} />
      </div>
    </>
  );
};

export default Content;
