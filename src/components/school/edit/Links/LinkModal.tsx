import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import { Link } from "./types/link";
import { LinkModalContent } from "./LinkModalContent";

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link?: Link;
  onSave: (data: Omit<Link, "id" | "order" | "clicks" | "pinned">) => void;
}

const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  onSave,
  link,
}) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <LinkModalContent onClose={onClose} onSave={onSave} link={link} />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <LinkModalContent onClose={onClose} onSave={onSave} link={link} />
        </DesktopModal>
      </div>
    </>
  );
};

export default LinkModal;
