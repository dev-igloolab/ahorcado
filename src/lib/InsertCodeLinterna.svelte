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

  {#if !isCorrect}
    <div class="flex flex-wrap gap-3 justify-center">
      {#each chars as char}
        <button
          class="text-black bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-black text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square w-16 h-16 flex items-center justify-center"
          on:click={(e) => {
            handleGuess(char);
          }}>{char}</button
        >
      {/each}

      <!-- Add button to erase last char -->
      <button
        class="text-black w-36 bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-black text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square h-16 flex items-center justify-center"
        on:click={() => {
          code = code.slice(0, -1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-delete"
          ><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" /><line
            x1="18"
            x2="12"
            y1="9"
            y2="15"
          /><line x1="12" x2="18" y1="9" y2="15" /></svg
        >
      </button>
    </div>
  {/if}

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
