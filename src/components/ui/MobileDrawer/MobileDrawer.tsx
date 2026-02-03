'use client';

import { ReactNode } from "react";
import { Portal } from "@/components/ui/Portal";

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
    <Portal containerId="mobile-modal-root">
      <div className="block md:hidden">
        {/* Overlay — matches Actions drawer: rgba(0,0,0,0.5), visibility delay when closing */}
        <div
          className={`fixed inset-0 bg-black/50 z-[2500] transition-[opacity,visibility] duration-300 ease-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={isOpen ? undefined : { transitionDelay: "0s, 0.3s" }}
          onClick={handleOverlayClick}
        />
        {/* Drawer — 90% width, max 420px, centered; same shell as Actions drawer */}
        <div
          className={`fixed bottom-0 left-1/2 w-[90%] max-w-[420px] max-h-[85vh] bg-white rounded-t-[20px] shadow-[0_-2px_16px_rgba(0,0,0,0.15)] z-[3000] flex flex-col overflow-y-auto overflow-x-hidden transition-[transform,visibility] duration-300 ease-out scrollbar-hide ${
            isOpen ? "-translate-x-1/2 translate-y-0 visible" : "-translate-x-1/2 translate-y-full invisible"
          }`}
          style={isOpen ? undefined : { transitionDelay: "0s, 0.3s" }}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
