import CaseStudyItem from "./CaseStudiesItem";
import { CaseStudy } from "./types/caseStudy";

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
  onEdit: (id: number) => void;
  onTogglePin: (id: number) => void;
}

export default function CaseStudyList({
  caseStudies,
  onEdit,
  onTogglePin,
}: CaseStudyListProps) {
  return (
    <div className="mt-6 max-md:mt-0 pt-[10px] max-md:pt-[10px] relative">
      <div className="absolute top-6 max-md:top-0 right-6 max-md:right-0 text-sm max-md:text-[13px] font-semibold max-md:font-semibold text-[#4A4A4A] max-md:text-[#4A4A4A] px-3 max-md:px-3 py-1 max-md:py-[4px] bg-[#F8F9FA] max-md:bg-[#F8F9FA] rounded-2xl max-md:rounded-2xl">
        {caseStudies.length}/10
      </div>
      <div className="mt-6 max-md:mt-0">
        {caseStudies.map((study) => (
          <CaseStudyItem
            key={study.id}
            caseStudy={study}
            onEdit={() => onEdit(study.id)}
            onTogglePin={() => onTogglePin(study.id)}
          />
        ))}
      </div>
    </div>
  );
}
