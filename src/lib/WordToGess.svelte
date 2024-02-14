<script lang="ts">
  import { guessedWord } from "./words";
</script>

<section class="container mx-auto">
  <h1>Llena los espacios</h1>
  <div>
    {#each $guessedWord as letter, i}
      {#if i === 4 || i === 7 || i === 11}
        <p class="my-5"> </p>
      {/if}

      <input
        type="text"
        class="w-10 h-10 text-center border-2 border-gray-300 rounded-lg"
        value={letter}
        readonly
      />

    {/each}
  </div>
</section>
