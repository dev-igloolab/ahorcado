import { writable } from "svelte/store";

export enum GameStatus {
  Welcome,
  Instructions,
  Ahorcado,
  CodeHidden,
  Linterna,
  Puzzle,
  GameOver,
}

export const step = writable<GameStatus>(GameStatus.Welcome);
