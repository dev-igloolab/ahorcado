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

  const resetGame = () => {
    ordersWords.length = 0;
    wordModifing = -1;
    currentWord = "";
    haveAllwords = false;
    isCorrectOrder = false;
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

  <Button on:click={() => (showModalCode = true)}>Ingresar código</Button>
</div>

<Modal bind:showModal={showModalCode} modalId="modalOrderWords">
  <h2 slot="header" class="text-5xl font-bold">Código</h2>

  <main>
    <p class="text-xl text-balance">
      Ingresen en orden los síntomas que presenta el paciente
    </p>

    <div class="flex flex-col gap-5 text-2xl mt-10">
      <button
        on:click={() => (wordModifing = 0)}
        class="rounded-full px-5 py-1 bg-[#e3e3e3] w-full flex items-center justify-start"
      >
        1. {ordersWords[0] || "Click par ingresar la palabra"}
      </button>

      <button
        on:click={() => (wordModifing = 1)}
        class="rounded-full px-5 py-1 bg-[#e3e3e3] w-full flex items-center justify-start"
      >
        2. {ordersWords[1] || "Click par ingresar la palabra"}
      </button>

      <button
        on:click={() => (wordModifing = 2)}
        class="rounded-full px-5 py-1 bg-[#e3e3e3] w-full flex items-center justify-start"
      >
        3. {ordersWords[2] || "Click par ingresar la palabra"}
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
          <Button on:click={() => step.set(GameStatus.Waldo)}>Continuar</Button>
        {:else}
          <p class="text-3xl text-center text-red-500">Código incorrecto</p>
          <Button on:click={() => resetGame()}>Intentar de nuevo</Button>
        {/if}
      </div>
    {/if}
  </main>
</Modal>
