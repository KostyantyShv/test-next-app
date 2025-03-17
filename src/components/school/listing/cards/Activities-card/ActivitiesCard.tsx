import React from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import UniversalSchoolCard from "../../universal-school-card/UniversalSchoolCard";
import { activities } from "./mock";

const Activities: React.FC<{ id: string }> = ({ id }) => {
  return <UniversalSchoolCard section={activities} id={id} />;
};

export default Activities;
