<script lang="ts">
  import Keyboard from "../lib/Keyboard.svelte";
  import WordToGess from "../lib/WordToGess.svelte";
  import { incorrectGuesses } from "../lib/words";

</script>

<section class="container mx-auto">
   <div class="flex flex-col gap-20">
    <WordToGess />

    <Keyboard />
  </div>

  <div class="fixed bottom-0 right-0 p-4 bg-red-500 text-white rounded-tl-lg">
    {$incorrectGuesses}
  </div>
</section>