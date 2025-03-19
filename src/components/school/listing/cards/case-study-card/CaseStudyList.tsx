import React from "react";
import CaseStudyListDesktop from "./CaseStudyListDesktop";
import CaseStudyListMobile from "./CaseStudyListMobile";

interface CaseStudyListProps {
  onViewClick: (id: number) => void;
}

const CaseStudyList: React.FC<CaseStudyListProps> = ({ onViewClick }) => {
  return (
    <>
      <div className="hidden md:block">
        <CaseStudyListDesktop onViewClick={onViewClick} />
      </div>
      <div className="block md:hidden">
        <CaseStudyListMobile onViewClick={onViewClick} />
      </div>
    </>
  );
};

export default CaseStudyList;
