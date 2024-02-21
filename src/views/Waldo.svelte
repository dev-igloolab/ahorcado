<!-- App.svelte -->
<script>
  import ImageWaldo from "../lib/ImageWaldo.svelte";
  import { GameStatus, step } from "../lib/game";

  let waldoFound = false;

  function handleWaldoFound() {
    waldoFound = true;
  }

  $: {
    if (waldoFound) {
      step.set(GameStatus.GameOver);
    }
  }
</script>

<section class="p-10">
  <h1 class="font-light mb-10 text-4xl">
    Descubran la IL-5 con ojo meticuloso
  </h1>
  {#if !waldoFound}
    <ImageWaldo on:waldoFound={handleWaldoFound} />
  {/if}
</section>
