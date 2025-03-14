// pages/index.tsx
import { useEffect, useState } from "react";
import StudentModal from "./StudentsModal";
import UniversalSchoolCard from "../../universal-school-card/UniversalSchoolCard";
import { students } from "./mock";

const StudentsCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <UniversalSchoolCard
        id={id}
        section={students}
        onReadMoreClick={openModal}
      />
      <StudentModal closeModal={closeModal} isOpen={isModalOpen} />
    </>
  );
};

export default StudentsCard;
