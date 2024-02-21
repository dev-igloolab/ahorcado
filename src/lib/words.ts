import { get, writable } from "svelte/store";

export const wordToGuess = writable("Interleucina5");

export const incorrectGuesses = writable(0);

export const guessedWord = writable(
  get(wordToGuess)
    .split("")
    .map(() => "_")
);

export const icorrectChars = writable<string[]>([]);

export const reloadGame = () => {
  incorrectGuesses.set(0);
  guessedWord.set(
    get(wordToGuess)
      .split("")
      .map(() => "_")
  );
  icorrectChars.set([]);
};
