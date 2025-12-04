export interface Review {
  avatar: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  published: string;
  helpful: number;
  hasReply: boolean;
  replyAvatar?: string;
  replyAuthor?: string;
  replyDate?: string;
  replyContent?: string;
  location?: string;
  flagUrl?: string;
  tags?: string[];
}
