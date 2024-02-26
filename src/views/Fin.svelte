<script lang="ts">
  import Button from "../lib/Button.svelte";
  import { step, GameStatus } from "../lib/game";
</script>

<section class="container mx-auto flex flex-col gap-16 items-center">
  <img
    src="escape-room.webp"
    alt="Logo de Alergo Pulse"
    width="300"
    class="h-full mx-auto"
  />

  <h1 class="font-bold text-9xl">¡Felicidades!</h1>
  <h2 class="font-bold text-6xl">Han salvado al paciente</h2>

  <p class="text-balance text-5xl text-center">
    Compartan el nombre del medicamento y su molécula al agente de sanidad para
    salir de la habitación.
  </p>
</section>
