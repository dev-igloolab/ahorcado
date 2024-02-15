<script lang="ts">
  import Button from "../lib/Button.svelte";
import { step, GameStatus } from "../lib/game";
</script>

<section class="container mx-auto flex flex-col gap-16 items-center">
  <img src="logo.webp" alt="Logo de Alergo Pulse" width="200" class="h-full mx-auto">

  <img src="escape-room.webp" alt="Logo de Alergo Pulse" width="700" class="h-full mx-auto">

  <Button text="Iniciar" onClick={() => step.set(GameStatus.Instructions)} />
</section>