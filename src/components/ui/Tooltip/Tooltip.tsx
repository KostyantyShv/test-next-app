'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal/Modal';
import { useIsMobile } from '@/hooks/useIsMobile';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
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