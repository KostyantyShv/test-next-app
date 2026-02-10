"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isEditListingPage =
    pathname != null && pathname.startsWith("/schools/edit");
  const noTopPadding = isEditListingPage && isMobile;

  return (
    <div className="flex flex-1 min-w-0">
      <div
        className={`flex-1 w-full min-w-0 px-0 pb-0 md:pt-3 md:pl-0 md:pr-4 md:pb-4 ${
          noTopPadding ? "pt-0" : "pt-3"
        }`}
      >
        <div className="w-full md:max-w-[1350px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
