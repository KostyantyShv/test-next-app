export interface Review {
  id: string;
  author: { name: string; fullName: string };
  title: { short: string; full: string };
  rating: number;
  published: { short: string; full: string };
  votes: number;
  featured: boolean;
  reply?: { content: string; date: string };
}
