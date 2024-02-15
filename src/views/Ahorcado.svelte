<script lang="ts">
  import Button from "../lib/Button.svelte";
  import Keyboard from "../lib/Keyboard.svelte";
  import WordToGess from "../lib/WordToGess.svelte";
  import { incorrectGuesses } from "../lib/words";
</script>

<section class="container mx.auto">
  <div class="flex flex-col gap-20">
    <div class="grid grid-cols-7 gap-20">
      <div class="col-span-3">
        <img src="https://via.placeholder.com/800x400" alt="Ahorcado" />
      </div>

      <div class="col-span-4 flex flex-col gap-10">
        <p class="text-3xl font-light">
          Para comenzar, descubran cuál es <strong class="font-bold"
            >LA PALABRA</strong
          > para salvar la vida de este paciente.
        </p>

        <WordToGess />
      </div>
    </div>

    <Keyboard />
  </div>

  <!-- <div class="fixed bottom-0 right-0 p-4 bg-red-500 text-white rounded-tl-lg">
    {$incorrectGuesses}
  </div> -->

  <div class="flex gap-5 absolute top-10 right-10">
    <Button text="💣" />
    <Button text="Insertar código" />
  </div>
</section>
