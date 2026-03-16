import React, { useEffect, useState } from "react";
import FeaturedProject from "./FeaturedProject";
import Thumbnails from "./Thumbnails";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { projects } from "./mock";
import SpotlightModal from "./SpotlightModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Project } from "./project.type";

const SpotlightCard: React.FC<{ id: string }> = ({ id }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  const handleShowPopup = () => {
    setIsOpen(true);
  };

  const handleHidePopup = () => {
    setIsOpen(false);
  };

  const handleProjectChange = (project: Project) => {
    setSelectedProjectId(project.id);
  };

  useEffect(() => {
    setSelectedProjectId(projects[0].id);
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
            activeProjectId={selectedProject.id}
            projects={projects}
            onSelectProject={handleProjectChange}
          />
        </div>
      </CardWrapper>
      {isMobile ? (
        <MobileDrawer isOpen={isOpen} onClose={handleHidePopup}>
          <SpotlightModal
            key={selectedProject.id}
            onClose={handleHidePopup}
            project={selectedProject}
            allProjects={projects}
            onProjectChange={handleProjectChange}
          />
        </MobileDrawer>
      ) : (
        <DesktopModal isOpen={isOpen} onClose={handleHidePopup}>
          <SpotlightModal
            key={selectedProject.id}
            onClose={handleHidePopup}
            project={selectedProject}
            allProjects={projects}
            onProjectChange={handleProjectChange}
          />
        </DesktopModal>
      )}
    </>
  );
};

export default SpotlightCard;
