import { useState } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import CaseStudyListDesktop from "./CaseStudyListDesktop";
import CaseStudyListMobile from "./CaseStudyListMobile";
import CaseStudyModalContent from "./CaseStudyModalContent";

const CaseStudyCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);

  const handleViewClick = (studyId: number) => {
    setSelectedStudyId(studyId);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="hidden md:block">
        <CardWrapper id={id}>
          <CaseStudyListDesktop onViewClick={handleViewClick} />
          <DesktopModal
            isOpen={isModalOpen}
            onClose={handleClose}
            className="w-[95vw] max-w-[1240px]"
          >
            <CaseStudyModalContent studyId={selectedStudyId} onClose={handleClose} />
          </DesktopModal>
        </CardWrapper>
      </div>

      <div className="block md:hidden">
        <CaseStudyListMobile onViewClick={handleViewClick} />
        <MobileDrawer isOpen={isModalOpen} onClose={handleClose} showPullIndicator={false}>
          <div className="rounded-t-[24px] overflow-hidden">
            <CaseStudyModalContent studyId={selectedStudyId} onClose={handleClose} />
          </div>
        </MobileDrawer>
      </div>
    </>
  );
};

export default CaseStudyCard;
