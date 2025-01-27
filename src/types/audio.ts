export interface Section {
  id: number;
  title: string;
  startTime: number;
  duration: number;
}

export interface Chapter {
  id: number;
  title: string;
  audioUrl: string;
  duration: number;
  startTime: number;
  sections: Section[];
}

export interface AudioBook {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  totalDuration: number;
  progress: number;
  chapters: Chapter[];
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentChapter: number;
  totalChapters: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isExpanded: boolean;
  currentBook: AudioBook | null;
  currentSection: number;
} 