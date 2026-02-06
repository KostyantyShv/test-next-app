import React from "react";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-1 min-w-0">
      <div className="flex-1 w-full min-w-0 pt-3 px-0 pb-0 md:pt-3 md:px-4 md:pb-4">
        <div className="w-full md:max-w-[1350px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
