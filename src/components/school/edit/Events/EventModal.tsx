import React from "react";
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
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={closeModal}>
          <EventModalContent
            isOpen={isOpen}
            closeModal={closeModal}
            events={events}
            setEvents={setEvents}
            currentEditId={currentEditId}
            maxEvents={maxEvents}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={closeModal} className="max-w-3xl w-[90%] max-h-[90vh]">
          <EventModalContent
            isOpen={isOpen}
            closeModal={closeModal}
            events={events}
            setEvents={setEvents}
            currentEditId={currentEditId}
            maxEvents={maxEvents}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default EventModal;
