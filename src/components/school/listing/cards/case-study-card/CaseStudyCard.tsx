import { useState } from "react";
import CaseStudyModalContent from "./CaseStudyModalContent";
import CardWrapper from "../../card-wrapper/CardWrapper";
import CaseStudyListDesktop from "./CaseStudyListDesktop";
import CaseStudyListMobile from "./CaseStudyListMobile";
import DesktopModalWrapper from "./DesktopModalWrapper";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

const CaseStudyCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);

  const handleViewClick = (id: number) => {
    setSelectedStudy(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="hidden md:block">
        <CardWrapper id={id}>
          <CaseStudyListDesktop onViewClick={handleViewClick} />
          {isModalOpen && selectedStudy && (
            <DesktopModalWrapper onClose={() => setIsModalOpen(false)}>
              <CaseStudyModalContent
                studyId={selectedStudy}
                onClose={() => setIsModalOpen(false)}
              />
            </DesktopModalWrapper>
          )}
        </CardWrapper>
      </div>
      <div className="block md:hidden">
        <CaseStudyListMobile onViewClick={handleViewClick} />
        <MobileDrawer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <CaseStudyModalContent
            studyId={selectedStudy}
            onClose={() => setIsModalOpen(false)}
          />
        </MobileDrawer>
      </div>
    </>
  );
};

export default CaseStudyCard;
