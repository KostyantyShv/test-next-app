"use client";
import React, { useState } from "react";
import Header from "./Header";
import ContentArea from "./ContentArea";
import { schools } from "../mock";
import { layouts } from "./mock";
import { useSchoolsExplore } from "@/store/use-schools-explore";

interface MainContentProps {
  onContainerExpandChange?: (isExpanded: boolean) => void;
  isContainerExpanded?: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  onContainerExpandChange,
  isContainerExpanded,
}) => {
  const { establishment, setEstablishment } = useSchoolsExplore(
    (state) => state
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [layout, setLayout] = useState("classic");

  return (
    <div className="w-full bg-[var(--surface-color)] rounded-none border-0 shadow-none md:rounded-xl md:border md:border-[var(--border-color)] md:shadow-[0_2px_12px_var(--shadow-color)] overflow-visible">
      <Header
        dropdownValue={establishment}
        schools={schools}
        layouts={layouts}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        isMapActive={isMapActive}
        setIsMapActive={setIsMapActive}
        layout={layout}
        setLayout={setLayout}
        onContainerExpandChange={onContainerExpandChange}
        isContainerExpanded={isContainerExpanded}
      />
      <ContentArea
        isMapActive={isMapActive}
        layout={layout}
        schools={schools}
      />
    </div>
  );
};

export default MainContent;
