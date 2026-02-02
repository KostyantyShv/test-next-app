import React from "react";
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
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer onClose={onClose} isOpen={isOpen}>
          <QAModalContent
            isOpen={isOpen}
            currentQuestion={currentQuestion}
            onClose={onClose}
            onSave={onSave}
            onDelete={onDelete}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal onClose={onClose} isOpen={isOpen} className="w-full max-w-[600px]">
          <QAModalContent
            isOpen={isOpen}
            currentQuestion={currentQuestion}
            onClose={onClose}
            onSave={onSave}
            onDelete={onDelete}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default QAModal;
