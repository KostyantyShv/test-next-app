"use client";
import React from "react";
import ContentDesktop from "./ContentDesktop";
import ContentMobile from "./ContentMobile";

const Content: React.FC = () => {
  return (
    <>
      {/* Mobile Content */}
      <div className="block md:hidden">
        <ContentMobile />
      </div>
      
      {/* Desktop Content */}
      <div className="hidden md:block">
        <ContentDesktop />
      </div>
    </>
  );
};

export default Content;
