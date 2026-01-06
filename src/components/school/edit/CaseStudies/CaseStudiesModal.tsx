import React from "react";
import CaseStudyModalContent from "./CaseStudiesModalContent";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { CaseStudy } from "./types/caseStudy";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

interface CaseStudyModalProps {
  caseStudy?: CaseStudy;
  onSave: (caseStudy: Omit<CaseStudy, "id" | "pinned">) => void;
  onDelete: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const CaseStudiesModal: React.FC<CaseStudyModalProps> = ({
  onClose,
  isOpen,
  onDelete,
  onSave,
  caseStudy,
}) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer onClose={onClose} isOpen={isOpen}>
          <CaseStudyModalContent
            onClose={onClose}
            onDelete={onDelete}
            onSave={onSave}
            caseStudy={caseStudy}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal onClose={onClose} isOpen={isOpen} className="max-w-[1200px] w-[90%]">
          <CaseStudyModalContent
            onClose={onClose}
            onDelete={onDelete}
            onSave={onSave}
            caseStudy={caseStudy}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default CaseStudiesModal;
