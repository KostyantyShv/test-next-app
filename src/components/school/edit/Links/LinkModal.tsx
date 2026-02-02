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
    <div
      className={`modal ${isOpen ? "active" : ""}`}
      id="linkModal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <LinkModalContent onClose={onClose} onSave={onSave} link={link} />
      </div>
    </div>
  );
};

export default LinkModal;
