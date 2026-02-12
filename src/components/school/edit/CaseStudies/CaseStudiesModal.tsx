"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import CaseStudyModalContent from "./CaseStudiesModalContent";
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
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isOpen) {
    return null;
  }

  const content = (
    <CaseStudyModalContent
      onClose={onClose}
      onDelete={onDelete}
      onSave={onSave}
      caseStudy={caseStudy}
    />
  );

  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 z-[1000] bg-black/50"
          onClick={onClose}
        />
        <div className="fixed inset-0 z-[1001] bg-white overflow-hidden md:hidden">
          <div className="h-full overflow-y-auto">{content}</div>
        </div>
      </>
    );
  }

  return (
    <DesktopModal isOpen={true} onClose={onClose} className="max-w-[950px] w-[90%]">
      {content}
    </DesktopModal>
  );
};

export default CaseStudiesModal;
