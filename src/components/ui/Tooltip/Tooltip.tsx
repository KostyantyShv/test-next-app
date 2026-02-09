'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal/Modal';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useTooltipForceDesktop } from '@/context/TooltipForceDesktopContext';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const isMobile = useIsMobile();
  const forceDesktop = useTooltipForceDesktop();
  const [isOpen, setIsOpen] = useState(false);

  const useDesktopTooltip = forceDesktop || !isMobile;

  if (!useDesktopTooltip) {
    return (
      <>
        <span
          className="inline-flex"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          {children}
        </span>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-[360px] p-4">
          <div className="text-sm text-[#464646]">{content}</div>
        </Modal>
      </>
    );
  }

  return (
    <div className="relative group">
      {children}
      <div className="hidden group-hover:block">{content}</div>
    </div>
  );
}; 