<script lang="ts">
  import { GameStatus, step } from "./lib/game";
  import Welcome from "./views/Welcome.svelte";
  import Instrucctions from "./views/Instrucctions.svelte";
  import Ahorcado from "./views/Ahorcado.svelte";
  import Puzzle from "./views/Puzzle.svelte";
</script>

<main>

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
  {/key}
</main>
