"use client";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useState } from "react";
import MajorsModalContent from "./MajorsModalContent";

const MajorsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <a
        href="#"
        onClick={openModal}
        className="flex items-center gap-1.5 text-[#346DC2] text-sm font-medium no-underline hover:text-[#1D77BD] flex-shrink-0"
      >
        See All Majors
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 2.5L8 6L4.5 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <div className="hidden md:block">
        <DesktopModal isOpen={isOpen} onClose={closeModal}>
          <MajorsModalContent closeModal={closeModal} />
        </DesktopModal>
      </div>
      <div className="block md:hidden">
        <MobileDrawer isOpen={isOpen} onClose={closeModal}>
          <MajorsModalContent closeModal={closeModal} />
        </MobileDrawer>
      </div>
    </>
  );
};

export default MajorsModal;
