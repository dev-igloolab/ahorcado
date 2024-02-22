<script lang="ts">
  import Button from "./Button.svelte";
  import { step, GameStatus } from "./game";

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const CORRECT_CODE = "NUCALA";

  let code = "";
  let isCorrect = false;

  function handleGuess(char: string) {
    if (code.length === 6) {
      return;
    }

    code += char;

    if (code.length === 6) {
      isCorrect = code === CORRECT_CODE;
    }
  }
</script>

<section class="flex flex-col gap-10 mt-10">
  <!-- Display code typed -->
  <div class="flex gap-3 justify-center">
    {#each [0, 1, 2, 3, 4, 5] as _, index}
      <input
        type="text"
        class="w-16 h-16 bg-transparent text-center text-black border-b-2 border-black text-5xl"
        value={code[index] || ""}
        readonly
      />
    {/each}
  </div>

  <div class="flex flex-wrap gap-3 justify-center">
    {#each chars as char}
      <button
        class="text-black bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-black text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square w-16 h-16 flex items-center justify-center"
        on:click={(e) => {
          handleGuess(char);
        }}>{char}</button
      >
    {/each}
  </div>

  {#if isCorrect}
    <div class="flex justify-center items-center flex-col gap-5">
      <p class="text-3xl text-center text-green-500">Código correcto</p>

      <Button on:click={() => step.set(GameStatus.Puzzle)} variant="secondary"
        >Continuar</Button
      >
    </div>
  {/if}

  {#if !isCorrect && code.length === 6}
    <div class="flex justify-center items-center flex-col gap-5">
      <p class="text-3xl text-center text-red-500">Código incorrecto</p>

      <Button on:click={() => (code = "")} variant="secondary"
        >Intentar de nuevo</Button
      >
    </div>
  {/if}
</section>
