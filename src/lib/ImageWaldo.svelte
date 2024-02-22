<!-- ImageSection.svelte -->
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("waldoFound");
  }
</script>

<div class="relative">
  <img
    src="waldo.webp"
    alt="Buscar a Waldo"
    class="max-w-full max-h-[940px] rounded-lg"
  />
  <!-- Div de área clickeable alrededor de Waldo -->
  <button
    class="absolute bg-transparent"
    aria-label="Waldo"
    style="left: 790px; top: 710px; width: 100px; height: 100px; cursor: pointer;"
    on:click={handleClick}
  ></button>
</div>
