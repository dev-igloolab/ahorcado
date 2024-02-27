<script lang="ts">
  import Button from "../lib/Button.svelte";
  import Modal from "../lib/Modal.svelte";
  import { GameStatus, step } from "../lib/game";

  export let showModalCode = false;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const ordersWords: string[] = [];

  let wordModifing = -1;
  let currentWord = "";
  let haveAllwords = false;
  let isCorrectOrder = false;

  const handleGuess = (char: string) => {
    if (wordModifing === -1) {
      return;
    }

    currentWord += char;
  };

  $: {
    // si los indices 0, 1, 2 son diferentes de undefined
    if (ordersWords[0] && ordersWords[1] && ordersWords[2]) {
      haveAllwords = true;
      // indice 0 debe ser "ASMA", indice 1 debe ser "RSCCPN", indice 2 debe ser "AINES"
      if (
        ordersWords[0] === "ASMA" &&
        ordersWords[1] === "RSCCPN" &&
        ordersWords[2] === "AINES"
      ) {
        isCorrectOrder = true;
      }
    }
  }
</script>

<div class="flex flex-col gap-10 justify-center items-center">
  <h2 class="text-5xl text-balance text-center max-w-[50ch]">
    ¿Cuáles son las palabras que desde diferentes ángulos encontraron?
  </h2>

  <Button on:click={() => (showModalCode = true)}>Continuar</Button>
</div>

<Modal bind:showModal={showModalCode} modalId="modalOrderWords">
  <h2 slot="header" class="text-5xl font-bold text-center">
    Orden de palabras
  </h2>

  <main>
    <p class="text-xl text-balance text-center">
      Ingresen en orden las palabras que encontraron para avanzar
    </p>

    <div class="flex flex-col gap-5 text-2xl mt-10">
      <button
        on:click={() => {
          wordModifing = 0;
          currentWord = ordersWords[0] ?? "";
        }}
        disabled={ordersWords[0] === "ASMA"}
        class={`rounded-full px-5 py-1 bg-[#e3e3e3] w-full border-2 flex items-center justify-start ${
          ordersWords[0] === "ASMA"
            ? "border-green-500 text-gray-500"
            : "border-transparent"
        }`}
      >
        1. {ordersWords[0] || "click para ingresar"}
      </button>

      <button
        on:click={() => {
          wordModifing = 1;
          currentWord = ordersWords[1] ?? "";
        }}
        disabled={ordersWords[1] === "RSCCPN"}
        class={`rounded-full px-5 py-1 bg-[#e3e3e3] w-full border-2 flex items-center justify-start ${
          ordersWords[1] === "RSCCPN"
            ? "border-green-500 text-gray-500"
            : "border-transparent"
        }`}
      >
        2. {ordersWords[1] || "click para ingresar"}
      </button>

      <button
        on:click={() => {
          wordModifing = 2;
          currentWord = ordersWords[2] ?? "";
        }}
        disabled={ordersWords[2] === "AINES"}
        class={`rounded-full px-5 py-1 bg-[#e3e3e3] w-full border-2 flex items-center justify-start ${
          ordersWords[2] === "AINES"
            ? "border-green-500 text-gray-500"
            : "border-transparent"
        }`}
      >
        3. {ordersWords[2] || "click para ingresar"}
      </button>
    </div>

    {#if wordModifing !== -1}
      <div class="mt-10 text-center text-balance">
        <p>Estas ingresando la palabra {wordModifing + 1}</p>
        <p class="text-3xl font-bold">
          {currentWord}
        </p>
      </div>

      <div class="flex flex-wrap gap-3 mt-5">
        {#each chars as char}
          <button
            class="text-black bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-black text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square w-16 h-16 flex items-center justify-center button-keyboard"
            on:click={(e) => {
              handleGuess(char);
            }}>{char}</button
          >
        {/each}

        <!-- Add button to erase last char -->
        <button
          class="text-black w-36 bg-transparent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-black text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square h-16 flex items-center justify-center"
          on:click={() => {
            currentWord = currentWord.slice(0, -1);
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
            ><path
              d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
            /><line x1="18" x2="12" y1="9" y2="15" /><line
              x1="12"
              x2="18"
              y1="9"
              y2="15"
            /></svg
          >
        </button>

        <button
          class="text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl border border-black text-center disabled:cursor-not-allowed disabled:bg-slate-400 aspect-square w-full h-16 flex items-center justify-center"
          on:click={() => {
            ordersWords[wordModifing] = currentWord;
            currentWord = "";
            wordModifing = -1;
          }}
        >
          Listo
        </button>
      </div>
    {/if}

    {#if haveAllwords}
      <div class="flex justify-center items-center flex-col gap-5 mt-10">
        {#if isCorrectOrder}
          <p class="text-3xl text-center text-green-500">Código correcto</p>
          <Button
            on:click={() => step.set(GameStatus.Waldo)}
            variant="secondary">Continuar</Button
          >
        {/if}
      </div>
    {/if}
  </main>
</Modal>
