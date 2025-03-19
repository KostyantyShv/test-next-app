import React, { useEffect, useState } from "react";
import FeaturedProject from "./FeaturedProject";
import Thumbnails from "./Thumbnails";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { projects } from "./mock";
import SpotlightModal from "./SpotlightModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

const SpotlightCard: React.FC<{ id: string }> = ({ id }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowPopup = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleHidePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    setSelectedProject(projects[0]);
  }, []);

  return (
    <>
      <CardWrapper id={id}>
        <h2 className="text-[#1B1B1B] text-2xl md:text-[24px] font-semibold mb-6">
          Spotlight
        </h2>
        <div className="flex flex-col md:gap-6">
          <FeaturedProject
            project={selectedProject}
            openModal={handleShowPopup}
          />
          <Thumbnails
            projects={projects}
            onSelectProject={setSelectedProject}
          />
        </div>
      </CardWrapper>
      <MobileDrawer isOpen={isOpen} onClose={handleHidePopup}>
        <SpotlightModal onClose={handleHidePopup} isOpen={isOpen} />
      </MobileDrawer>
      <DesktopModal isOpen={isOpen} onClose={handleHidePopup}>
        <SpotlightModal onClose={handleHidePopup} isOpen={isOpen} />
      </DesktopModal>
    </>
  );
};

export default SpotlightCard;
