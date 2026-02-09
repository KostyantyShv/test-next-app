import { ReactNode } from "react";

interface DesktopModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function DesktopModal({ children, isOpen, onClose, className = "" }: DesktopModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[2000]"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-lg flex flex-col overflow-y-auto max-h-[90vh] ${className}`}
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        {children}
      </div>
    </div>
  );
}
