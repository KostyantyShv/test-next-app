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
    <div className="mt-6 pt-[10px] relative">
      <div className="absolute top-[-24px] right-0 text-sm font-semibold text-[#4A4A4A] px-3 py-1 bg-[#F8F9FA] rounded-2xl">
        {caseStudies.length}/10
      </div>
      {caseStudies.map((study) => (
        <CaseStudyItem
          key={study.id}
          caseStudy={study}
          onEdit={() => onEdit(study.id)}
          onTogglePin={() => onTogglePin(study.id)}
        />
      ))}
    </div>
  );
}
