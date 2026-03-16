import React from "react";

const CardWrapper: React.FC<{ children: React.ReactNode; id: string }> = ({
  children,
  id,
}) => {
  return (
    <div
      id={id}
      className="listing-card-shell font-inter flex justify-center my-cardMargin"
      style={{
        scrollMarginTop: "132px",
        color: "var(--listing-content-text-primary, #4A4A4A)",
      }}
    >
      <div
        className="listing-card-surface max-w-[390px] md:max-w-[1077px] w-full bg-cardBackground p-4 md:p-cardPadding rounded-cardBorderRadius md:py-cardPadding"
        style={{
          boxShadow:
            "var(--listing-card-shadow, 0 4px 12px rgba(0, 0, 0, 0.08))",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
