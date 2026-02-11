import { ReactNode } from "react";

export interface Attendee {
  image: string;
  alt: string;
}

export interface EventType {
  name: string;
  color: string;
  icon: ReactNode;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  type: EventType;
  date: string;
  time: string;
  externalUrl?: string;
  attendees: Attendee[];
  attendeeCount: number;
}
