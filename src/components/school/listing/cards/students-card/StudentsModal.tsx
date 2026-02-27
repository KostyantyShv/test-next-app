// components/StudentModal.tsx
import { useEffect } from "react";
import StudentsModalContent from "./StudentsModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface StudentModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, closeModal }) => {



  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <MobileDrawer isOpen={isOpen} onClose={closeModal}>
        <StudentsModalContent closeModal={closeModal} />
      </MobileDrawer>
      <DesktopModal isOpen={isOpen} onClose={closeModal}>
        <StudentsModalContent closeModal={closeModal} />
      </DesktopModal>
    </>
  );
};

export default StudentModal;
