import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import { GalleryItem } from "./types/gallery-item";
import EditModalContent from "./EditModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

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
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <EditModalContent
            item={item}
            onClose={onClose}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <EditModalContent
            item={item}
            onClose={onClose}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default EditModal;
