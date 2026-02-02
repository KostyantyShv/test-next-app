import React from "react";
import { Announcement } from "./types/announcement";
import AnnouncementModalContent from "./AnnpuncementModalContent";

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
    <div
      className={`modal ${isModalOpen ? "active" : ""}`}
      id="announcementModal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isModalOpen}
    >
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <AnnouncementModalContent
          onClose={onClose}
          announcements={announcements}
          editId={editId}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AnnouncementsModal;
