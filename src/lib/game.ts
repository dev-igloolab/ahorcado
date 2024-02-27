import { writable } from "svelte/store";

export enum GameStatus {
  Welcome,
  Instructions,
  Ahorcado,
  CodeHidden,
  Linterna,
  Puzzle,
  OrderWords,
  Waldo,
  GameOver,
}

export const step = writable<GameStatus>(GameStatus.Ahorcado);
