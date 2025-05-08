import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import { Announcement } from "./types/announcement";
import AnnouncementModalContent from "./AnnpuncementModalContent";
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
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer onClose={onClose} isOpen={isModalOpen}>
          <AnnouncementModalContent
            onClose={onClose}
            announcements={announcements}
            editId={editId}
            onDelete={onDelete}
            onSubmit={onSubmit}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal onClose={onClose} isOpen={isModalOpen}>
          <AnnouncementModalContent
            onClose={onClose}
            announcements={announcements}
            editId={editId}
            onDelete={onDelete}
            onSubmit={onSubmit}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default AnnouncementsModal;
