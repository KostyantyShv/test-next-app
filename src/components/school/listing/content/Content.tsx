"use client";
import React from "react";
import ContentDesktop from "./ContentDesktop";
import ContentMobile from "./ContentMobile";
import useWindowWidth from "@/hooks/useWindowWidth";

type variantType = "mobile" | "desktop";

const Content: React.FC<{ variant: variantType }> = ({ variant }) => {
  const isMobile = useWindowWidth();
  if (isMobile) {
    return <ContentMobile />;
  }
  return <ContentDesktop />;
};

export default Content;
