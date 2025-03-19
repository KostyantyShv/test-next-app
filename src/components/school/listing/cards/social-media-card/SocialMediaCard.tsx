import React from "react";
import SocialMediaCardMobile from "./SocialMediaCardMobile";
import SocialMediaCardDesktop from "./SocialMediaCardDesktop";

const SocialMediaCard: React.FC<{ idMobile?: string; idDesktop?: string }> = ({
  idMobile,
  idDesktop,
}) => {
  return (
    <>
      <div className="block md:hidden">
        <SocialMediaCardMobile id={idMobile || ""} />
      </div>
      <div className="hidden md:block">
        <SocialMediaCardDesktop id={idDesktop || ""} />
      </div>
    </>
  );
};

export default SocialMediaCard;
