import React from "react";

const CardWrapper: React.FC<{ children: React.ReactNode; id: string }> = ({
  children,
  id,
}) => {
  return (
    <div
      id={id}
      className="font-inter flex justify-center my-cardMargin text-[#4A4A4A]"
      style={{ scrollMarginTop: "176px" }}
    >
      <div className="max-w-[390px] md:max-w-[875px] w-full bg-cardBackground p-4 md:p-cardPadding rounded-cardBorderRadius shadow-cardShadow md:py-cardPadding">
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
