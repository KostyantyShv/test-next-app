"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Event } from "./types/event";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import EventModalContent from "./EventModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  currentEditId: number | null;
  maxEvents: number;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  closeModal,
  events,
  setEvents,
  currentEditId,
  maxEvents,
}) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isOpen) return null;

  const content = (
    <EventModalContent
      isOpen={true}
      closeModal={closeModal}
      events={events}
      setEvents={setEvents}
      currentEditId={currentEditId}
      maxEvents={maxEvents}
    />
  );

  if (isMobile) {
    return (
      <MobileDrawer isOpen={true} onClose={closeModal} title="Edit Event">
        {content}
      </MobileDrawer>
    );
  }

  return (
    <DesktopModal isOpen={true} onClose={closeModal} className="max-w-3xl w-[90%] max-h-[90vh]">
      {content}
    </DesktopModal>
  );
};

export default EventModal;
