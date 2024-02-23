<script lang="ts">
  import Button from "../lib/Button.svelte";
  import InsertCodeAhorcado from "../lib/InsertCodeAhorcado.svelte";
  import Keyboard from "../lib/Keyboard.svelte";
  import Modal from "../lib/Modal.svelte";
  import WordToGess from "../lib/WordToGess.svelte";
  import { icorrectChars, incorrectGuesses } from "../lib/words";

  let showModalHint = false;
  let showModalCode = false;

  const hints = [
    "Es clave en la inflamación T2",
    "Tiene interacción con mas de 5 blancos celulares.",
    "Su inhibición logra el control del paciente con asma grave T2.",
  ];
</script>

<section class="container mx-auto mt-20">
  <div class="grid grid-cols-12 gap-5">
    <div class="flex flex-col gap-20 col-span-11">
      <div class="grid grid-cols-7 gap-20">
        <div class="col-span-3">
          <img
            src={`/ahorcado/0${$incorrectGuesses}.webp`}
            alt="Ahorcado"
            width="500"
            class="absolute top-5 left-44"
          />
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

    <article class="border bottom-2 rounded-xl col-span-1">
      <ul
        class="flex gap-5 flex-col items-center py-10 overflow-auto h-[648px]"
      >
        {#each $icorrectChars.reverse() as char}
          <li class="text-4xl">{char}</li>
        {/each}
      </ul>
    </article>
  </div>

  <!-- <div class="fixed bottom-0 right-0 p-4 bg-red-500 text-white rounded-tl-lg">
    {$incorrectGuesses}
  </div> -->

  <div class="flex gap-5 absolute top-10 right-10">
    <Button on:click={() => (showModalHint = true)}>💡</Button>
    <Button on:click={() => (showModalCode = true)}>Insertar código</Button>
  </div>
</section>

<Modal bind:showModal={showModalHint} modalId="modalHint">
  <h2 slot="header" class="text-5xl font-bold">Pistas</h2>

  <ol class="list-decimal list-inside flex flex-col gap-5 marker:font-bold">
    {#each hints as hint}
      <li class="text-2xl">{hint}</li>
    {/each}
  </ol>
</Modal>

<Modal bind:showModal={showModalCode} modalId="modalCode">
  <h2 slot="header" class="text-5xl font-bold text-center">Código</h2>

  <main>
    <p class="text-xl text-center text-balance">
      Este código cumple una función vital para salvar la vida del paciente,
      desbloqueará un instrumento para poder ver con mayor claridad las
      alternativas de mejoría.
    </p>

    <InsertCodeAhorcado />
  </main>
</Modal>
