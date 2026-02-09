"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { Spotlight, SpotlightFormData } from "./types";
import SpotlightModalContent from "./SpotlightModalContent";

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: SpotlightFormData) => void;
  onDelete: () => void;
  spotlight?: Spotlight;
}

const SpotlightModal: React.FC<SpotlightModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  onSave,
  spotlight,
}) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isOpen) {
    return null;
  }

  if (isMobile) {
    return (
      <MobileDrawer
        isOpen={true}
        onClose={onClose}
        title={spotlight ? "Edit Spotlight" : "Create Spotlight"}
      >
        <div className="h-[70vh] max-h-[70vh] overflow-hidden flex flex-col">
          <SpotlightModalContent
            onClose={onClose}
            onDelete={onDelete}
            onSave={onSave}
            spotlight={spotlight}
          />
        </div>
      </MobileDrawer>
    );
  }

  return (
    <DesktopModal
      isOpen={true}
      onClose={onClose}
      className="max-w-[850px] w-[90%] h-[90vh] overflow-hidden"
    >
      <SpotlightModalContent
        onClose={onClose}
        onDelete={onDelete}
        onSave={onSave}
        spotlight={spotlight}
      />
    </DesktopModal>
  );
};

export default SpotlightModal;
