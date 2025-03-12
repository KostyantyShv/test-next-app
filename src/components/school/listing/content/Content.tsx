"use client";
import React from "react";
import ContentDesktop from "./ContentDesktop";
import ContentMobile from "./ContentMobile";

const Content: React.FC = () => {
  return (
    <>
      <div className="block md:hidden">
        <ContentMobile />
      </div>
      <div className="hidden md:block">
        <ContentDesktop />
      </div>
    </>
  );
};

export default Content;
