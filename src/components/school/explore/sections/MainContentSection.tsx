import React from "react";
import MainContent from "../main-content/MainContent";

interface MainContentSectionProps {
  onContainerExpandChange?: (isExpanded: boolean) => void;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({ onContainerExpandChange }) => {
  return (
    <>
      <MainContent onContainerExpandChange={onContainerExpandChange} />
    </>
  );
};

export default MainContentSection;
