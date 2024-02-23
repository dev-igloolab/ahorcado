<script lang="ts">
  import Modal from "../lib/Modal.svelte";
  import Button from "../lib/Button.svelte";
  import InsertCodehidden from "../lib/InsertCodehidden.svelte";
  import InsertCodeLinterna from "../lib/InsertCodeLinterna.svelte";

  export let showModalCode = false;
</script>

<div class="flex flex-col gap-10 justify-center items-center text-center">
  <h2 class="text-5xl text-balance">
    Encontrarán una luz que guiará sus pasos en la próxima jugada, para salvar
    la vida del paciente.
  </h2>

  <Button on:click={() => (showModalCode = true)}>Ingresar código</Button>
</div>

<Modal bind:showModal={showModalCode} modalId="modalHiddenCode">
  <h2 slot="header" class="text-5xl font-bold text-center">Código</h2>

  <main>
    <p class="text-xl text-balance text-center">Digiten el código oculto</p>

    <InsertCodeLinterna />
  </main>
</Modal>
