export interface Collection {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  privacy: 'secret' | 'shareable';
  createdAt: Date;
  updatedAt: Date;
} 