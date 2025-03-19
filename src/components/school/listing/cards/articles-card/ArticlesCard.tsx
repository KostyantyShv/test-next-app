import React from "react";
import ArticlesCardMobile from "./ArticlesCardMobile";
import ArticlesCardDesktop from "./ArticlesCardDesktop";

const ArticlesCard: React.FC<{ idMobile?: string; idDesktop?: string }> = ({
  idDesktop,
  idMobile,
}) => {
  return (
    <>
      <div className="block md:hidden">
        <ArticlesCardMobile id={idMobile || ""} />
      </div>
      <div className="hidden md:block">
        <ArticlesCardDesktop id={idDesktop || ""} />
      </div>
    </>
  );
};

export default ArticlesCard;
