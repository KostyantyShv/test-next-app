export interface Announcement {
  id: string;
  isPinned?: boolean;
  author: {
    name: string;
    avatar: string;
    role: string;
    isVerified?: boolean;
  };
  timestamp: string;
  content: string;
  image?: string;
  link: {
    text: string;
    url: string;
  };
}
