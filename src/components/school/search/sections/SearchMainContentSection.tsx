import React from "react";
import SearchMainContent from "../main-content/SearchMainContent";

interface SearchMainContentSectionProps {
  onContainerExpandChange?: (isExpanded: boolean) => void;
}

const SearchMainContentSection: React.FC<SearchMainContentSectionProps> = ({
  onContainerExpandChange,
}) => {
  return <SearchMainContent onContainerExpandChange={onContainerExpandChange} />;
};

export default SearchMainContentSection; 