// components/AcademicsPopup.tsx
"use client";

import { useState, useEffect } from "react";
import AcademicsModalContent from "./AcademicsModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

const AcademicsPopup: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({
  isOpen,
  closeModal,
}) => {
  useEffect(() => {
    const pollBars = document.querySelectorAll(".poll-bar-fill");
    if (isOpen) {
      setTimeout(() => {
        pollBars.forEach((bar) => {
          const width = (bar as HTMLElement).dataset.width;
          (bar as HTMLElement).style.width = "0";
          setTimeout(() => {
            (bar as HTMLElement).style.width = `${width}%`;
          }, 100);
        });
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <DesktopModal isOpen={isOpen} onClose={closeModal}>
        <AcademicsModalContent closeModal={closeModal} />
      </DesktopModal>
      <MobileDrawer isOpen={isOpen} onClose={closeModal}>
        <AcademicsModalContent closeModal={closeModal} />
      </MobileDrawer>
    </>
  );
};

export default AcademicsPopup;
