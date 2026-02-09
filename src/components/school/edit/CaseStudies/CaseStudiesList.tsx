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
    <div className="relative max-md:mt-0 max-md:pt-[10px]">
      <div className="hidden max-md:block absolute top-1 right-0 px-[12px] py-[4px] bg-[#F8F9FA] rounded-[16px] text-[13px] font-semibold text-[var(--text-color)]">
        {caseStudies.length}/10
      </div>
      <div className="max-md:mt-6">
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
