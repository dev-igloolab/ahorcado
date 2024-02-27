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

  <h1 class="font-bold text-9xl">¡Felicitaciones!</h1>
  <h2 class="font-bold text-6xl">Han salvado al paciente.</h2>

  <p class="text-balance text-5xl text-center">
    La contraseña para salir de la habitación es el nombre del medicamento y su
    molecula.
  </p>

  <p class="text-balance text-5xl text-center">
    Dirijanse al agente de sanidad.
  </p>
</section>
