import { ReactNode } from "react";

interface DesktopModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function DesktopModal({ children, isOpen, onClose }: DesktopModalProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[2000]"
          onClick={onClose}
        >
          <div
            className="bg-white w-[90%] max-w-4xl max-h-[90vh] rounded-2xl shadow-lg flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
