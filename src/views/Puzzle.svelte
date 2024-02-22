<script lang="ts">
  import { onMount } from "svelte";
  import type { Molecule } from "../types/Puzzle.types";
  import {
    checkMoleculesToJoin,
    distanceBetween,
    isOverlapping,
  } from "../lib/Puzzle";
  import Button from "../lib/Button.svelte";
  import Modal from "../lib/Modal.svelte";
  import { step, GameStatus } from "../lib/game";

  let showModal = false;

  onMount(() => {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const molecules: Molecule[] = [];
    const moleculeRadius = 50;
    const moleculeColors = [
      "/molecules/celula-epitelia-v4.webp",
      "/molecules/celula-plasmatica-2.webp",
      "/molecules/eosinófilo.webp",
      "/molecules/fibroblasto.webp",
      "/molecules/Il5_V2.webp",
      "/molecules/IL6_V1.webp",
      "/molecules/Il17_V1.webp",
      "/molecules/mastocito5.0.webp",
      "/molecules/mepoli.webp",
      "/molecules/unnamed.webp",
    ];
    const moleculeImages: Record<string, HTMLImageElement> = {};

    const moleculesToJoin = new Set<Molecule>();

    // Create molecules
    for (let i = 0; i < 10; i++) {
      let molecule: Molecule;
      do {
        molecule = {
          x:
            Math.random() * (canvas.width - 2 * moleculeRadius) +
            moleculeRadius,
          y:
            Math.random() * (canvas.height - 2 * moleculeRadius) +
            moleculeRadius,
          color:
            moleculeColors[Math.floor(Math.random() * moleculeColors.length)],
        };
      } while (isOverlapping(molecule, molecules, moleculeRadius));
      molecules.push(molecule);
    }

    // Ensure Il5_V2 and mepoli molecules are present
    const requiredMolecules = ["Il5_V2", "mepoli"];
    requiredMolecules.forEach((molecule) => {
      if (!molecules.some((m) => m.color === `/molecules/${molecule}.webp`)) {
        // If the molecule is not present, add it
        molecules.push({
          x:
            Math.random() * (canvas.width - 2 * moleculeRadius) +
            moleculeRadius,
          y:
            Math.random() * (canvas.height - 2 * moleculeRadius) +
            moleculeRadius,
          color: `/molecules/${molecule}.webp`,
        });
      }
    });

    // Cargar todas las imágenes una vez
    moleculeColors.forEach((color) => {
      const image = new Image();
      image.onload = () => {
        moleculeImages[color] = image;
        drawMolecules(); // Redibujar las moléculas cuando las imágenes se carguen
      };
      image.onerror = () => {
        console.error(`Error al cargar la imagen ${color}`);
      };
      image.src = color;
    });

    // Event listeners for mouse interaction
    let selectedMolecule: Molecule | null = null;
    let isDragging = false;

    function getMousePos(event: MouseEvent | TouchEvent) {
      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent && event.touches.length === 1) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }

      if (!clientX || !clientY) {
        return { x: 0, y: 0 };
      }

      return {
        x: clientX - canvas.getBoundingClientRect().left,
        y: clientY - canvas.getBoundingClientRect().top,
      };
    }

    canvas.addEventListener("mousedown", function (event) {
      const mousePos = getMousePos(event);
      molecules.forEach((molecule) => {
        if (
          distanceBetween(molecule, { ...mousePos, color: molecule.color }) <
          moleculeRadius
        ) {
          selectedMolecule = molecule;
          isDragging = true;
        }
      });
    });

    canvas.addEventListener("mousemove", function (event) {
      if (isDragging && selectedMolecule) {
        const mousePos = getMousePos(event);
        selectedMolecule.x = mousePos.x;
        selectedMolecule.y = mousePos.y;
        drawMolecules();
      }
    });

    canvas.addEventListener("mouseup", function () {
      if (isDragging && selectedMolecule) {
        moleculesToJoin.clear();
        checkMoleculesToJoin(molecules, moleculesToJoin, moleculeRadius);
        if (moleculesToJoin.size === 2) {
          const joinedMolecules = Array.from(moleculesToJoin);
          if (
            joinedMolecules.some((m) => m.color === "/molecules/Il5_V2.webp") &&
            joinedMolecules.some((m) => m.color === "/molecules/mepoli.webp")
          ) {
            showModal = true;
            return;
          }
        }
        // Return molecule to initial position
        let newPosition: Molecule;
        do {
          newPosition = {
            x:
              Math.random() * (canvas.width - 2 * moleculeRadius) +
              moleculeRadius,
            y:
              Math.random() * (canvas.height - 2 * moleculeRadius) +
              moleculeRadius,
            color: selectedMolecule.color,
          };
        } while (isOverlapping(newPosition, molecules, moleculeRadius));
        selectedMolecule.x = newPosition.x;
        selectedMolecule.y = newPosition.y;
        drawMolecules();
        selectedMolecule = null;
      }
      isDragging = false;
    });

    // Touch events
    canvas.addEventListener("touchstart", function (event) {
      event.preventDefault();
      const touchPos = getMousePos(event);
      molecules.forEach((molecule) => {
        if (
          distanceBetween(molecule, { ...touchPos, color: molecule.color }) <
          moleculeRadius
        ) {
          selectedMolecule = molecule;
          isDragging = true;
        }
      });
    });

    canvas.addEventListener("touchmove", function (event) {
      event.preventDefault();
      if (isDragging && selectedMolecule) {
        const touchPos = getMousePos(event);
        selectedMolecule.x = touchPos.x;
        selectedMolecule.y = touchPos.y;
        drawMolecules();
      }
    });

    canvas.addEventListener("touchend", function (event) {
      event.preventDefault();
      if (isDragging && selectedMolecule) {
        moleculesToJoin.clear();
        checkMoleculesToJoin(molecules, moleculesToJoin, moleculeRadius);
        if (moleculesToJoin.size === 2) {
          const joinedMolecules = Array.from(moleculesToJoin);
          if (
            joinedMolecules.some((m) => m.color === "/molecules/Il5_V2.webp") &&
            joinedMolecules.some((m) => m.color === "/molecules/mepoli.webp")
          ) {
            showModal = true;
            return;
          }
        }
        // Return molecule to initial position
        let newPosition: Molecule;
        do {
          newPosition = {
            x:
              Math.random() * (canvas.width - 2 * moleculeRadius) +
              moleculeRadius,
            y:
              Math.random() * (canvas.height - 2 * moleculeRadius) +
              moleculeRadius,
            color: selectedMolecule.color,
          };
        } while (isOverlapping(newPosition, molecules, moleculeRadius));
        selectedMolecule.x = newPosition.x;
        selectedMolecule.y = newPosition.y;
        drawMolecules();
        selectedMolecule = null;
      }
      isDragging = false;
    });

    // Dentro de la función drawMolecules()
    function drawMolecules() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      molecules.forEach((molecule) => {
        const image = moleculeImages[molecule.color];
        if (image && image.complete) {
          const drawWidth = 100;
          const drawHeight = 100;
          const x = molecule.x - drawWidth / 2;
          const y = molecule.y - drawHeight / 2;
          if (
            x >= 0 &&
            y >= 0 &&
            x + drawWidth <= canvas.width &&
            y + drawHeight <= canvas.height
          ) {
            ctx.drawImage(image, x, y, drawWidth, drawHeight);
          }
        }
      });
    }

    drawMolecules();
  });
</script>

<section>
  <h1 class="font-light absolute top-10 left-10 text-4xl z-0">
    Junta la interlicina-5 con la molécula de mepolizmab
  </h1>
  <canvas id="gameCanvas" class="cursor-grab" width="1840" height="800"
  ></canvas>
</section>

<Modal bind:showModal modalId="modalPuzzle">
  <h2 slot="header" class="text-5xl font-bold">¡Excelente!</h2>

  <main class="flex flex-col gap-10 items-center justify-center">
    <p class="text-xl">
      Eres bueno en esto de juntar cosas... dale a continuar para seguir con la
      experiencia
    </p>

    <Button on:click={() => step.set(GameStatus.OrderWords)} variant="secondary"
      >Continuar</Button
    >
  </main>
</Modal>

<style>
  canvas {
    display: block;
    background-color: transparent;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 999;
  }
</style>
