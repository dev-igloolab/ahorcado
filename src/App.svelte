<script lang="ts">
  import { GameStatus, step } from "./lib/game";
  import Welcome from "./views/Welcome.svelte";
  import Instrucctions from "./views/Instrucctions.svelte";
  import Ahorcado from "./views/Ahorcado.svelte";
  import Puzzle from "./views/Puzzle.svelte";
  import CodeHidden from "./views/CodeHidden.svelte";
  import Linterna from "./views/Linterna.svelte";
  import Fin from "./views/Fin.svelte";
  import OrderWords from "./views/OrderWords.svelte";
  import Waldo from "./views/Waldo.svelte";

  let fondo = "bg-main";

  $: {
    if ($step === GameStatus.CodeHidden) {
      fondo = "bg-codigo-oculto";
    } else if ($step === GameStatus.Linterna) {
      fondo = "bg-linterna";
    } else if ($step === GameStatus.Puzzle) {
      fondo = "bg-puzzle";
    } else if ($step === GameStatus.OrderWords) {
      fondo = "bg-palabrasorden";
    } else {
      fondo = "bg-main";
    }
  }
</script>

<main
  class={`min-h-screen bg-no-repeat bg-cover bg-center grid place-content-center text-white font-sans ${fondo}`}
>
  {#key $step}
    {#if $step === GameStatus.Welcome}
      <Welcome />
    {/if}

    {#if $step === GameStatus.Instructions}
      <Instrucctions />
    {/if}

    {#if $step === GameStatus.Ahorcado}
      <Ahorcado />
    {/if}

    {#if $step === GameStatus.CodeHidden}
      <CodeHidden />
    {/if}

    {#if $step === GameStatus.Linterna}
      <Linterna />
    {/if}

    {#if $step === GameStatus.Puzzle}
      <Puzzle />
    {/if}

    {#if $step === GameStatus.OrderWords}
      <OrderWords />
    {/if}

    {#if $step === GameStatus.Waldo}
      <Waldo />
    {/if}

    {#if $step === GameStatus.GameOver}
      <Fin />
    {/if}
  {/key}
</main>
