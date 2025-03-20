import React from "react";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 md:p-4">
        <div className="max-w-[1080px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
