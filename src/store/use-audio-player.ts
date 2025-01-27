import { create } from 'zustand';
import { Chapter, AudioBook } from '@/types/audio';

interface AudioPlayerStore {
  // State
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentChapter: number;
  totalChapters: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  audioElement: HTMLAudioElement | null;
  chapters: Chapter[];
  isPlayerVisible: boolean;
  isPlaylistVisible: boolean;
  isExpanded: boolean;
  currentBook: AudioBook | null;
  currentSection: number;

  // Actions
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setChapters: (chapters: Chapter[]) => void;
  initAudio: (audioUrl: string) => void;
  nextChapter: () => void;
  previousChapter: () => void;
  seekToChapter: (chapterIndex: number) => void;
  setPlayerVisible: (visible: boolean) => void;
  setPlaylistVisible: (visible: boolean) => void;
  setExpanded: (expanded: boolean) => void;
  setCurrentBook: (book: AudioBook) => void;
  seekToSection: (sectionIndex: number) => void;
  nextSection: () => void;
  previousSection: () => void;
  skipForward: () => void;
  skipBackward: () => void;
}

export const useAudioPlayer = create<AudioPlayerStore>((set, get) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentChapter: 0,
  totalChapters: 0,
  volume: 1,
  isMuted: false,
  playbackRate: 1,
  audioElement: null,
  chapters: [],
  isPlayerVisible: false,
  isPlaylistVisible: false,
  isExpanded: false,
  currentBook: null,
  currentSection: 0,

  setIsPlaying: (playing) => {
    const { audioElement } = get();
    if (audioElement) {
      playing ? audioElement.play() : audioElement.pause();
      set({ isPlaying: playing });
    }
  },

  setCurrentTime: (time) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = time;
      set({ currentTime: time });
    }
  },

  setVolume: (volume) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume;
      set({ volume, isMuted: volume === 0 });
    }
  },

  setMuted: (muted) => {
    const { audioElement, volume } = get();
    if (audioElement) {
      audioElement.muted = muted;
      set({ isMuted: muted });
    }
  },

  setPlaybackRate: (rate) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.playbackRate = rate;
      set({ playbackRate: rate });
    }
  },

  setChapters: (chapters) => {
    set({ 
      chapters,
      totalChapters: chapters.length 
    });
  },

  initAudio: (audioUrl: string) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }

    const audio = new Audio(audioUrl);
    
    audio.addEventListener('timeupdate', () => {
      const { currentTime } = audio;
      set({ currentTime });
    });

    audio.addEventListener('loadedmetadata', () => {
      set({ duration: audio.duration });
    });

    audio.addEventListener('ended', () => {
      const { currentChapter, totalChapters, currentBook } = get();
      if (currentChapter < totalChapters - 1 && currentBook) {
        get().nextChapter();
      } else {
        set({ isPlaying: false });
      }
    });

    set({ audioElement: audio });
    
    const { isPlaying } = get();
    if (isPlaying) {
      audio.play();
    }
  },

  nextChapter: () => {
    const { currentChapter, totalChapters, currentBook, audioElement } = get();
    if (currentChapter < totalChapters - 1 && currentBook && audioElement) {
      const nextChapter = currentBook.chapters[currentChapter + 1];
      get().initAudio(nextChapter.audioUrl);
      set({ 
        currentChapter: currentChapter + 1,
        isPlaying: true,
        currentTime: 0
      });
    }
  },

  previousChapter: () => {
    const { currentChapter, currentBook, audioElement } = get();
    if (currentChapter > 0 && currentBook && audioElement) {
      const prevChapter = currentBook.chapters[currentChapter - 1];
      get().initAudio(prevChapter.audioUrl);
      set({ 
        currentChapter: currentChapter - 1,
        isPlaying: true,
        currentTime: 0
      });
    }
  },

  seekToChapter: (chapterIndex) => {
    const { chapters } = get();
    if (chapters[chapterIndex]) {
      get().setCurrentTime(chapters[chapterIndex].startTime);
    }
  },

  setPlayerVisible: (visible) => {
    set({ isPlayerVisible: visible });
  },

  setPlaylistVisible: (visible) => {
    set({ isPlaylistVisible: visible });
  },

  setExpanded: (expanded) => set({ isExpanded: expanded }),

  setCurrentBook: (book: AudioBook) => {
    set({ 
      currentBook: book,
      totalChapters: book.chapters.length,
      currentChapter: 0
    });
    if (book.chapters.length > 0) {
      get().initAudio(book.chapters[0].audioUrl);
    }
  },

  nextSection: () => {
    const { currentBook, currentSection } = get();
    if (currentBook) {
      const totalSections = currentBook.chapters.reduce(
        (acc, chapter) => acc + chapter.sections.length, 
        0
      );
      if (currentSection < totalSections - 1) {
        get().seekToSection(currentSection + 1);
      }
    }
  },

  previousSection: () => {
    const { currentSection } = get();
    if (currentSection > 0) {
      get().seekToSection(currentSection - 1);
    }
  },

  seekToSection: (sectionIndex) => {
    const { currentBook } = get();
    if (currentBook) {
      let globalIndex = 0;
      for (const chapter of currentBook.chapters) {
        for (const section of chapter.sections) {
          if (globalIndex === sectionIndex) {
            get().setCurrentTime(section.startTime);
            return;
          }
          globalIndex++;
        }
      }
    }
  },

  skipForward: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = Math.min(
        audioElement.currentTime + 5,
        audioElement.duration
      );
    }
  },

  skipBackward: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = Math.max(
        audioElement.currentTime - 15,
        0
      );
    }
  },
})); 