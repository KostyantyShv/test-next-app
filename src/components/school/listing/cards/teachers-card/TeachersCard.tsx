// components/TeachersCard.tsx
import React from "react";
import UniversalSchoolCard from "../../universal-school-card/UniversalSchoolCard";
import { teachers } from "./mock";

const TeachersCard: React.FC<{ id: string }> = ({ id }) => {
  return <UniversalSchoolCard id={id} section={teachers} />;
};

export default TeachersCard;
