import React from "react";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 p-0 md:p-4">
        <div className="w-full md:max-w-[1350px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
