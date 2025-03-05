import { useState } from "react";
import CaseStudyList from "./CaseStudyList";
import CaseStudyModal from "./CaseStudyModal";
import CardWrapper from "../../card-wrapper/CardWrapper";

const CaseStudyCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);

  const handleViewClick = (id: number) => {
    setSelectedStudy(id);
    setIsModalOpen(true);
  };

  return (
    <CardWrapper id={id}>
      <CaseStudyList onViewClick={handleViewClick} />
      {isModalOpen && selectedStudy && (
        <CaseStudyModal
          studyId={selectedStudy}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </CardWrapper>
  );
};

export default CaseStudyCard;
