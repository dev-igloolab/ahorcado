<script lang="ts">
  import { guessedWord, incorrectGuesses, wordToGuess } from "./words";

  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const handleGuess = (letter: string, e: MouseEvent) => {
    let found = false;

    // disabled button
    (e.target as HTMLButtonElement).disabled = true;

    for (let i = 0; i < $wordToGuess.length; i++) {
      if ($wordToGuess[i].toLocaleLowerCase() === letter.toLocaleLowerCase()) {
        $guessedWord[i] = letter;
        found = true;
      }
    }

    if (!found) {
      incorrectGuesses.update((value) => value + 1);
    }


    if ($guessedWord.join("") === $wordToGuess) {
      alert("Ganaste");
    }

    if ($incorrectGuesses === 6) {
      alert("Perdiste");
    }
  };
</script>

<section>
  <div class="flex flex-wrap justify-center">
    {#each letters as letter}
      <button
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={
          (e) => {
            handleGuess(letter, e);
          }
        }>{letter}</button
      >
    {/each}
  </div>
</section>
