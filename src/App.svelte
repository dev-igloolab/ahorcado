<script>
  import Keyboard from "./lib/Keyboard.svelte";
  import WordToGess from "./lib/WordToGess.svelte";
  import { incorrectGuesses } from "./lib/words";
</script>

<main>
  <h1 class="text-center font-bold text-4xl mb-10">
    Adivina la palabra si quieres salir de aquí
  </h1>

  <div class="flex flex-col gap-20">
    <WordToGess />

    <Keyboard />
  </div>

  <div class="fixed bottom-0 right-0 p-4 bg-red-500 text-white rounded-tl-lg">
    {$incorrectGuesses}
  </div>
</main>
