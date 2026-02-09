"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { GalleryItem } from "./types/gallery-item";
import EditModalContent from "./EditModalContent";

interface Props {
  item: GalleryItem | null | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    altText: string;
    pinned: boolean;
    imageFile?: File;
  }) => void;
  onDelete: () => void;
}

const EditModal: React.FC<Props> = ({
  item,
  onClose,
  onSubmit,
  onDelete,
  isOpen,
}) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isOpen) return null;

  const content = (
    <EditModalContent
      item={item}
      onClose={onClose}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );

  if (isMobile) {
    return (
      <MobileDrawer isOpen={true} onClose={onClose} title="Edit Photo">
        {content}
      </MobileDrawer>
    );
  }

  return (
    <DesktopModal isOpen={true} onClose={onClose}>
      {content}
    </DesktopModal>
  );
};

export default EditModal;
