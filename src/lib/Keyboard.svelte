<script lang="ts">
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";
  import {
    guessedWord,
    icorrectChars,
    incorrectGuesses,
    wordToGuess,
    reloadGame,
  } from "./words";

  type Type = "WordsAndNumbers" | "Numbers" | "Words";

  export let type: Type = "WordsAndNumbers";

  const chars =
    type === "WordsAndNumbers"
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
      : type === "Numbers"
        ? "1234567890"
        : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let showModalResultIncorrect = false;
  let showModalResult = false;

  const handleGuess = (letter: string, e: MouseEvent) => {
    if ($incorrectGuesses === 7) {
      showModalResultIncorrect = true;
      return;
    }

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
      if ($incorrectGuesses < 7) {
        incorrectGuesses.update((value) => value + 1);
      }
      icorrectChars.update((value) => [...value, letter]);
    }

    if (
      $guessedWord.join("").toLocaleLowerCase() ===
      $wordToGuess.toLocaleLowerCase()
    ) {
      // disabled all buttons
      const buttons = document.querySelectorAll(".button-keyboard");
      buttons.forEach((button) => {
        (button as HTMLButtonElement).disabled = true;
      });

      showModalResult = true;
    }

    if ($incorrectGuesses === 7) {
      showModalResultIncorrect = true;
    }
  };

  const realoadGame = () => {
    reloadGame();
    showModalResultIncorrect = false;

    // enabled all buttons
    const buttons = document.querySelectorAll(".button-keyboard");
    buttons.forEach((button) => {
      (button as HTMLButtonElement).disabled = false;
    });
  };
</script>

<section>
  <div class="flex flex-wrap gap-3">
    {#each chars as char}
      <button
        class="text-white bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-white text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square w-16 h-16 flex items-center justify-center button-keyboard"
        on:click={(e) => {
          handleGuess(char, e);
        }}>{char}</button
      >
    {/each}
  </div>
</section>

<Modal bind:showModal={showModalResultIncorrect} modalId="modalResultAhorcado">
  <h2 slot="header" class="text-5xl font-bold text-center">Resultado</h2>

  <main class="flex flex-col gap-10 justify-start text-center">
    <p class="text-xl">Esa no es la palabra correcta</p>

    <Button on:click={() => realoadGame()} variant="secondary"
      >Intentar de nuevo</Button
    >
  </main>
</Modal>

<Modal bind:showModal={showModalResult} modalId="modalResult">
  <h2 slot="header" class="text-5xl font-bold text-center">Resultado</h2>

  <main class="flex flex-col gap-10 justify-start">
    <p class="text-xl text-center">¡Felicidades! Salvaste al paciente.</p>
    <p class="text-center text-balance">
      Cierra esta ventana e ingresa el código oculto dandole click al botón de
      insertar código.
    </p>
  </main>
</Modal>
