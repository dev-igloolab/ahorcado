import { get, writable } from 'svelte/store';

export const wordToGuess  = writable("Interleucina5");

export const incorrectGuesses = writable(0);

export const guessedWord = writable(get(wordToGuess).split('').map(() => '_'));

