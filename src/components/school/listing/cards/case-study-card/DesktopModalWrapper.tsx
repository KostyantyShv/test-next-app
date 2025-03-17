import React from "react";

const DesktopModalWrapper: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[999] md:hidden"
        onClick={onClose}
      ></div>

      {/* Modal/Drawer Container */}
      <div className="fixed inset-0 bg-white z-[1000] overflow-y-auto font-inter md:h-auto md:w-full bottom-0 h-[85%] rounded-t-[20px] md:rounded-none transition-all duration-300">
        {/* Header Space (Desktop Only) */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-[25px] bg-gray-800/5 z-[1002]"></div>
        {children}
      </div>
    </>
  );
};

export default DesktopModalWrapper;
