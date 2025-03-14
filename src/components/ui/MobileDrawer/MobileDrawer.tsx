import { ReactNode } from "react";

interface MobileDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ children, isOpen, onClose }: MobileDrawerProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="block md:hidden">
      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[2500] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleOverlayClick}
      />
      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 w-full max-h-[70%] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[3000] transition-all duration-300 overflow-y-auto scrollbar-hide ${
          isOpen ? "bottom-0 visible" : "bottom-[-100%] invisible"
        }`}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-2" />
        {children}
      </div>
    </div>
  );
}
