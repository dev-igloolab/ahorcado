import { get, writable } from 'svelte/store';

const words = ["igloolab", "andres", "google"];

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
}

export const wordToGuess  = writable(getRandomWord());

export const incorrectGuesses = writable(0);

export const guessedWord = writable(get(wordToGuess).split('').map(() => '_'));

