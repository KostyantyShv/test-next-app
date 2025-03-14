import React, { useState } from "react";
import UniversalSchoolCard from "../../universal-school-card/UniversalSchoolCard";
import { academics } from "./mock";
import AcademicsPopup from "./AcademicsModal";

const AcademicsCard: React.FC<{ id: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <UniversalSchoolCard
        id={id}
        section={academics}
        onReadMoreClick={openModal}
      />
      <AcademicsPopup isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default AcademicsCard;
