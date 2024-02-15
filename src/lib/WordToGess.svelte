<script lang="ts">
  import { guessedWord } from "./words";
</script>

<section>
  <div>
    {#each $guessedWord as letter, i}
      {#if i === 4 || i === 7 || i === 11}
        <p class="my-5"></p>
      {/if}

      <input
        type="text"
        class="w-16 h-16 bg-transparent text-center text-white text-5xl"
        value={letter}
        readonly
      />
    {/each}
  </div>
</section>
