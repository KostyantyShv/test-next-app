export interface EventParticipant {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface Event {
  id?: string;
  type: string;
  title: string;
  time: string;
  attendees: number;
  attendeeCount?: string;
  avatar1: string;
  avatar2: string;
  date: number;
  month: number;
  year: number;
  externalUrl?: string;
  listingId?: string;
  sourceEventId?: string;
  eventImageUrl?: string;
  participants?: EventParticipant[];
  hidden?: boolean;
}
