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
    const moleculeRadius = 100;
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
    const maxAttempts = 100; // Límite de intentos para evitar bucles infinitos
    for (let i = 0; i < 10; i++) {
      let molecule: Molecule;
      let attempts = 0;
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
        attempts++;
        // Si se excede el límite de intentos, se sale del bucle
        if (attempts >= maxAttempts) {
          console.error(
            `No se pudo colocar una molécula después de ${maxAttempts} intentos.`
          );
          break;
        }
      } while (isOverlapping(molecule, molecules, moleculeRadius));
      // Solo agregar la molécula si se encontró una posición válida
      molecules.push(molecule);
    }

    // Ensure Il5_V2 and mepoli molecules are present
    const requiredMolecules = ["Il5_V2", "mepoli"];
    requiredMolecules.forEach((molecule) => {
      // Check if the molecule is already present
      if (!molecules.some((m) => m.color === `/molecules/${molecule}.webp`)) {
        let newMolecule: Molecule;
        let attempts = 0;
        do {
          newMolecule = {
            x:
              Math.random() * (canvas.width - 2 * moleculeRadius) +
              moleculeRadius,
            y:
              Math.random() * (canvas.height - 2 * moleculeRadius) +
              moleculeRadius,
            color: `/molecules/${molecule}.webp`,
          };
          attempts++;
          // Si se excede el límite de intentos, se sale del bucle
          if (attempts >= maxAttempts) {
            console.error(
              `No se pudo colocar la molécula ${molecule} después de ${maxAttempts} intentos.`
            );
            break;
          }
        } while (isOverlapping(newMolecule, molecules, moleculeRadius));
        // Solo agregar la molécula si se encontró una posición válida
        molecules.push(newMolecule);
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
        if (
          mousePos.x < moleculeRadius ||
          mousePos.x > canvas.width - moleculeRadius ||
          mousePos.y < moleculeRadius ||
          mousePos.y > canvas.height - moleculeRadius
        ) {
          // La molécula está cerca del borde, moverla a una posición aleatoria dentro del canvas
          selectedMolecule.x =
            Math.random() * (canvas.width - 2 * moleculeRadius) +
            moleculeRadius;
          selectedMolecule.y =
            Math.random() * (canvas.height - 2 * moleculeRadius) +
            moleculeRadius;
        } else {
          // La molécula está dentro del canvas, actualizar su posición según el mouse
          selectedMolecule.x = mousePos.x;
          selectedMolecule.y = mousePos.y;
        }
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
      if (isDragging && selectedMolecule && event.touches.length === 1) {
        const touchPos = getMousePos(event);
        if (
          touchPos.x < moleculeRadius ||
          touchPos.x > canvas.width - moleculeRadius ||
          touchPos.y < moleculeRadius ||
          touchPos.y > canvas.height - moleculeRadius
        ) {
          // La molécula está cerca del borde, moverla a una posición aleatoria dentro del canvas
          selectedMolecule.x =
            Math.random() * (canvas.width - 2 * moleculeRadius) +
            moleculeRadius;
          selectedMolecule.y =
            Math.random() * (canvas.height - 2 * moleculeRadius) +
            moleculeRadius;
        } else {
          // La molécula está dentro del canvas, actualizar su posición según el toque
          selectedMolecule.x = touchPos.x;
          selectedMolecule.y = touchPos.y;
        }
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
          let drawWidth = 200;
          let drawHeight = 200;
          let x = molecule.x - drawWidth / 2;
          let y = molecule.y - drawHeight / 2;

          // Verificar si la molécula está completamente dentro del canvas
          if (
            x < 0 ||
            y < 0 ||
            x + drawWidth > canvas.width ||
            y + drawHeight > canvas.height
          ) {
            // La molécula no está completamente dentro del canvas, ajustar su tamaño y posición
            drawWidth *= 0.5; // Reducir el ancho a la mitad
            drawHeight *= 0.5; // Reducir la altura a la mitad
            // Asignar una nueva posición aleatoria dentro del canvas
            x = Math.random() * (canvas.width - drawWidth);
            y = Math.random() * (canvas.height - drawHeight);
          }

          ctx.drawImage(image, x, y, drawWidth, drawHeight);
        }
      });
    }

    drawMolecules();
  });
</script>

<section class="flex justify-center items-center">
  <h1 class="font-light absolute top-10 left-10 text-4xl z-0">
    Junta la Interleucina-5 con la molécula de mepolizmab
  </h1>
  <canvas id="gameCanvas" class="cursor-grab" width="1800" height="900"
  ></canvas>
</section>

<Modal bind:showModal modalId="modalPuzzle">
  <h2 slot="header" class="text-5xl font-bold text-center">¡Excelente!</h2>

  <main class="flex flex-col gap-10 items-center justify-center">
    <p class="text-xl text-center text-balance">
      Haz juntado las moléculas y células correctas, dirígete a continuar para
      seguir con la experiencia.
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
    z-index: 999;
  }
</style>
