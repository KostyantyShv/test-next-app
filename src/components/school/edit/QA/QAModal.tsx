"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import QAModalContent from "./QAModalContent";
import { Question } from "./types/question";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

interface QAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: Omit<Question, "id">) => void;
  onDelete: () => void;
  currentQuestion: Question | null;
}

const QAModal: React.FC<QAModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  currentQuestion,
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
    <QAModalContent
      isOpen={true}
      currentQuestion={currentQuestion}
      onClose={onClose}
      onSave={onSave}
      onDelete={onDelete}
    />
  );

  if (isMobile) {
    return (
      <MobileDrawer
        isOpen={true}
        onClose={onClose}
        title={currentQuestion ? "Edit Question" : "Create Question"}
      >
        {content}
      </MobileDrawer>
    );
  }

  return (
    <DesktopModal isOpen={true} onClose={onClose} className="w-full max-w-[600px]">
      {content}
    </DesktopModal>
  );
};

export default QAModal;
