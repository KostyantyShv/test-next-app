'use client';

import { ReactNode, useEffect, useState } from "react";
import { Drawer } from "vaul";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface MobileDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  /** Accessible title for screen readers (required by Radix Dialog). */
  title?: string;
}

export function MobileDrawer({ children, isOpen, onClose, title = "Dialog" }: MobileDrawerProps) {
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isOpen) return null;
  if (isDesktopViewport) return null;

  return (
    <Drawer.Root
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-[rgba(27,27,27,0.4)] backdrop-blur-[4px] z-[2500]" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-[3000] flex flex-col bg-white rounded-t-[24px] max-h-[85%] outline-none"
          style={{
            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12), 0 -2px 8px rgba(0, 0, 0, 0.04)',
          }}
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root asChild>
            <Drawer.Title>{title}</Drawer.Title>
          </VisuallyHidden.Root>
          {/* Pull indicator */}
          <div className="mx-auto mt-3 mb-2 w-9 h-1 rounded-full bg-[#DFDDDB] flex-shrink-0" />
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
