import { JSX } from "react";

export interface Attendee {
  image: string;
  alt: string;
}

export interface EventType {
  name: string;
  color: string;
  icon: JSX.Element;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  type: EventType;
  date: string;
  time: string;
  attendees: Attendee[];
  attendeeCount: number;
}
