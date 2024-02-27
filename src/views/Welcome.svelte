<script lang="ts">
  import Button from "../lib/Button.svelte";
  import { step, GameStatus } from "../lib/game";
</script>

<section class="container mx-auto flex flex-col gap-16 items-center">
  <img
    src="logo.webp"
    alt="Logo de Alergo Pulse"
    width="200"
    class="h-full mx-auto"
  />

  <img
    src="escape-room.webp"
    alt="Logo de Alergo Pulse"
    width="700"
    class="h-full mx-auto"
  />

  <Button on:click={() => step.set(GameStatus.Instructions)}>Iniciar</Button>

  <footer class="text-center text-xs text-balance">
    Nucala Pluma (Mepolizumab) Solución inyectable 100mg/mL | Registro sanitario
    No: INVIMA 2022MBT-0000061 | Material exclusivo para profesionales de la
    salud | Si usted desea mayor información o reportar una situación clínica
    desfavorable ocurrida durante el uso de un producto de GlaxoSmithKline,
    favor comunicarse al teléfono 01 8000 11 86 86 o escribir al correo
    electrónico: programa.dirmedica@gsk.com | GlaxoSmithKline Colombia S.A.,
    Calle 26 # 69B-45 Edificio Bogotá Corporate Center Piso 9. | Solicite mayor
    información científica de nuestros productos en nuestro servicio de
    información médica, a través del email mila@gsk.com | Mayor información
    sobre indicaciones, contraindicaciones, advertencias y precauciones, riesgos
    de administración y demás información sobre seguridad, se encuentra
    disponible en la Información para Prescribir (IP). IP y/o referencias están
    disponibles a solicitud. | PM-CO-MPL-BTHC-240003 | Fecha de elaboración:
    Febrero 2024.
  </footer>
</section>
