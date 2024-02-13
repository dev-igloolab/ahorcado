<script lang="ts">
  import { guessedWord } from "./words";
</script>

<section class="container mx-auto">
  <h1>Llena los espacios</h1>
  <p>{$guessedWord.join(" ")}</p>
</section>