<script lang="ts">
  import Modal from "../lib/Modal.svelte";
  import Button from "../lib/Button.svelte";
  import InsertCodehidden from "../lib/InsertCodehidden.svelte";

  export let showModalCode = false;
</script>

<div class="flex flex-col gap-10 justify-center items-center">
  <h2 class="text-5xl">Ingresen el código oculto para continuar</h2>

  <Button on:click={() => (showModalCode = true)}>Ingresar código</Button>
</div>

<Modal bind:showModal={showModalCode} modalId="modalHiddenCode">
  <h2 slot="header" class="text-5xl font-bold">Código</h2>

  <main>
    <p class="text-xl text-balance">
      ¿Lograron descifrar el código secreto? Digítenlo en la pantalla, así
      podrán avanzar
    </p>

    <InsertCodehidden />
  </main>
</Modal>
