import React from "react";
import MainContent from "../main-content/MainContent";

interface MainContentSectionProps {
  onContainerExpandChange?: (isExpanded: boolean) => void;
  isContainerExpanded?: boolean;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({
  onContainerExpandChange,
  isContainerExpanded,
}) => {
  return (
    <>
      <MainContent
        onContainerExpandChange={onContainerExpandChange}
        isContainerExpanded={isContainerExpanded}
      />
    </>
  );
};

export default MainContentSection;
