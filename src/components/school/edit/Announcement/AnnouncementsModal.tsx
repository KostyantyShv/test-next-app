"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Announcement } from "./types/announcement";
import AnnouncementModalContent from "./AnnpuncementModalContent";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

interface AnnouncementModalProps {
  onClose: () => void;
  isModalOpen: boolean;
  onSubmit: (formData: Omit<Announcement, "id" | "pinned">) => void;
  onDelete: () => void;
  editId: number | null;
  announcements: Announcement[];
}

const AnnouncementsModal: React.FC<AnnouncementModalProps> = ({
  onClose,
  isModalOpen,
  onSubmit,
  onDelete,
  editId,
  announcements,
}) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Don't render anything until client has mounted (so useIsMobile is accurate)
  // and only render when the modal is actually open
  if (!hasMounted || !isModalOpen) {
    return null;
  }

  const content = (
    <AnnouncementModalContent
      onClose={onClose}
      announcements={announcements}
      editId={editId}
      onDelete={onDelete}
      onSubmit={onSubmit}
    />
  );

  if (isMobile) {
    return (
      <MobileDrawer
        isOpen={true}
        onClose={onClose}
        title={editId ? "Edit Announcement" : "Create Announcement"}
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

export default AnnouncementsModal;
