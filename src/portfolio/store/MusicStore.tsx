import { create } from "zustand";

interface State {
  playing: boolean;
  songIndex: number;
  songs: string[];
}

interface Action {
  toggle(): void;
  setSongs(songs: string[]): void;
  next(): void;
}

type MusicStore = State & Action;

export const useMusic = create<MusicStore>()((set) => ({
  playing: false,
  toggle: () =>
    set((state) => ({
      playing: !state.playing,
    })),
  songIndex: 0,
  songs: ["mercenary.mp3", "spoiler.mp3", "star eater.mp3"],
  setSongs: (songList) => set({ songs: songList }),
  next: () =>
    set((state) => ({
      songIndex: (state.songIndex + 1) % state.songs.length,
    })),
}));
