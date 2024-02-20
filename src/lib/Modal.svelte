<script lang="ts">
  import { onMount } from "svelte";

  export let showModal = false;
  let dialog: HTMLDialogElement | null = null;

  onMount(() => {
    dialog = document.getElementById("modal") as HTMLDialogElement;
  });

  $: {
    if (dialog && showModal) {
      dialog.showModal();
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  id="modal"
  bind:this={dialog}
  on:click|self={() => {
    showModal = false;
    dialog?.close();
  }}
  class="fixed inset-0 z-50 overflow-y-auto rounded-3xl"
>
  <div class="flex justify-center items-center h-full relative">
    <button
      class="text-white bg-black rounded-full p-2 absolute top-4 right-4"
      aria-label="Close"
      on:click={() => {
        showModal = false;
        dialog?.close();
      }}
    >
      <svg
        class="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div class="bg-white rounded shadow-lg p-20">
      <header class="mb-10">
        <slot name="header" />
      </header>
      <slot />
    </div>
  </div>
</dialog>

<style>
  dialog {
    animation: fadeIn 0.3s ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  dialog > div {
    max-width: 48em;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
</style>
