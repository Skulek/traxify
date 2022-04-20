import { Song } from "@prisma/client";
import { createStore, action, Action } from "easy-peasy";

export interface TraxStore {
  activeSongs: Song[] | null;
  activeSong: Song | null;
  volume: number;
  changeVolume: Action<TraxStore, number>;
  changeActiveSongs: Action<TraxStore, Song[]>;
  changeActiveSong: Action<TraxStore, Song>;
}

export const store = createStore<TraxStore>({
  activeSongs: [],
  activeSong: null,
  volume: 1.0,
  changeVolume: action((state, payload) => {
    state.volume = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
});
