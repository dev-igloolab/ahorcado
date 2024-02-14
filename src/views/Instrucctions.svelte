<script lang="ts">
  import { step, GameStatus } from "../lib/game";
</script>

<section class="container mx-auto">
  <h1 class="text-3xl font-bold text-balance">Instrucciones</h1>

  <p class="text-xl">
    Este es un juego de adivinar la palabra, tienes 6 intentos para adivinar la
    palabra, si no lo logras, pierdes.
  </p>

  <p class="text-xl">
    Si logras adivinar la palabra, ganas.
  </p>

  <p class="text-xl">
    No vas a ganar dinero, pero si mucha satisfacción.
  </p>

  <button on:click={() => step.set(GameStatus.Ahorcado)
  } class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
    Continuar
  </button>
</section>