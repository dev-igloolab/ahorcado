<script lang="ts">
  import {
    guessedWord,
    icorrectChars,
    incorrectGuesses,
    wordToGuess,
  } from "./words";

  const lettersAndDigits = Array.from({ length: 36 }, (_, i) =>
    i < 26 ? String.fromCharCode(65 + i) : String(i - 26)
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
      icorrectChars.update((value) => [...value, letter]);
    }

    if (
      $guessedWord.join("").toLocaleLowerCase() ===
      $wordToGuess.toLocaleLowerCase()
    ) {
      alert("Ganaste");

      // disabled all buttons
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        (button as HTMLButtonElement).disabled = true;
      });
    }

    if ($incorrectGuesses === 6) {
      alert("Perdiste");
    }
  };
</script>

<section>
  <div class="flex flex-wrap gap-3">
    {#each lettersAndDigits as char}
      <button
        class="text-white bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-white text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square w-16 h-16 flex items-center justify-center"
        on:click={(e) => {
          handleGuess(char, e);
        }}>{char}</button
      >
    {/each}
  </div>
</section>
