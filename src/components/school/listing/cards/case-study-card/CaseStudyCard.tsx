import { useState } from "react";
import CaseStudyList from "./CaseStudyList";
import CaseStudyModal from "./CaseStudyModal";

const CaseStudyCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);

  const handleViewClick = (id: number) => {
    setSelectedStudy(id);
    setIsModalOpen(true);
  };

  return (
    <div id={id} className="my-cardMargin">
      <CaseStudyList onViewClick={handleViewClick} />
      {isModalOpen && selectedStudy && (
        <CaseStudyModal
          studyId={selectedStudy}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CaseStudyCard;
