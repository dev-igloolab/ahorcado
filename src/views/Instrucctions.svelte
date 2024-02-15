<script lang="ts">
  import Button from "../lib/Button.svelte";
import { step, GameStatus } from "../lib/game";
</script>

<section class="container mx-auto flex flex-col gap-16 items-center">
  <img src="escape-room.webp" alt="Logo de Alergo Pulse" width="300" class="h-full mx-auto">

  <h1 class="font-bold text-9xl">¡Bienvenidos!</h1>

  <p class="text-balance text-5xl text-center">Los invitamos a tomar decisiones estratégicas para salvar la vida de este paciente...</p>

  <p class="font-semibold text-4xl">¡Buena suerte!</p>

  <Button text="Empezar" onClick={() => step.set(GameStatus.Ahorcado)} />
</section>