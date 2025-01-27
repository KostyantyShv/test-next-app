import { AudioBook } from '@/types/audio';

export const mockAudioBook: AudioBook = {
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  coverUrl: "/images/cat.png",
  totalDuration: 1620, // 27 minutes in seconds
  progress: 0,
  chapters: [
    {
      id: 1,
      title: 'Introduction',
      audioUrl: '/audio/the-wonderful-wizard-of-oz-001-introduction.2746.mp3',
      duration: 420, // 7 minutes
      startTime: 0,
      sections: [
        { id: 1, title: 'Welcome', startTime: 0, duration: 120 },
        { id: 2, title: 'About This Book', startTime: 120, duration: 180 },
        { id: 3, title: 'How to Use This Book', startTime: 300, duration: 120 },
      ]
    },
    {
      id: 2,
      title: 'Chapter 1: The Fundamentals',
      audioUrl: '/audio/the-wonderful-wizard-of-oz-002-chapter-1-the-cyclone.2747.mp3',
      duration: 360, // 6 minutes
      startTime: 420,
      sections: [
        { id: 4, title: 'The Power of Habits', startTime: 420, duration: 180 },
        { id: 5, title: 'Small Changes, Big Results', startTime: 600, duration: 180 },
      ]
    },
    {
      id: 3,
      title: 'Chapter 2: The First Law',
      audioUrl: '/audio/the-wonderful-wizard-of-oz-003-chapter-2-the-council-with-the-munchkins.2748.mp3',
      duration: 480, // 8 minutes
      startTime: 780,
      sections: [
        { id: 6, title: 'Make it Obvious', startTime: 780, duration: 240 },
        { id: 7, title: 'The Habit Loop', startTime: 1020, duration: 240 },
      ]
    }
  ]
};
