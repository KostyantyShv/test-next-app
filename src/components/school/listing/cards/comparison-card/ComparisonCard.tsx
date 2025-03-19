import React from "react";
import ComparisonCardDesktop from "./ComparisonCardDesktop";
import ComparisonCardMobile from "./ComparisonCardMobile";

const ComparisonCard: React.FC<{ idMobile?: string; idDesktop?: string }> = ({
  idDesktop,
  idMobile,
}) => {
  return (
    <>
      <div className="hidden md:block">
        <ComparisonCardDesktop id={idDesktop || ""} />
      </div>
      <div className="block md:hidden">
        <ComparisonCardMobile id={idMobile || ""} />
      </div>
    </>
  );
};

export default ComparisonCard;
