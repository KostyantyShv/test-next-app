import { ReactNode, useEffect, useState } from "react";

interface DesktopModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function DesktopModal({ children, isOpen, onClose, className = "" }: DesktopModalProps) {
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Lock body scroll when modal is visible on desktop
  const shouldRender = isOpen && isDesktopViewport;
  useEffect(() => {
    if (!shouldRender) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[6000]"
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
