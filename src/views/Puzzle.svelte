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
    const moleculeRadius = 20;
    const moleculeColors = ["#ff0000", "#0000ff", "#00ff00"]; // Colors for the two types of molecules
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
          if (joinedMolecules[0].color === joinedMolecules[1].color) {
            alert("¡Ganaste!");
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
          if (joinedMolecules[0].color === joinedMolecules[1].color) {
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

    // Draw molecules
    function drawMolecules() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      molecules.forEach((molecule) => {
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, moleculeRadius, 0, Math.PI * 2);
        ctx.fillStyle = molecule.color;
        ctx.fill();
        ctx.closePath();
      });
    }

    drawMolecules();
  });
</script>

<section>
  <h1 class="font-light absolute top-10 left-10 text-4xl">
    Junta la interlicina-5 con la molécula de mepolizmab
  </h1>
  <canvas id="gameCanvas" width="1840" height="800"></canvas>
</section>

<Modal bind:showModal modalId="modalPuzzle">
  <h2 slot="header" class="text-5xl font-bold">¡Excelente!</h2>

  <main class="flex flex-col gap-10 items-center justify-center">
    <p class="text-xl">
      Eres bueno en esto de juntar cosas... dale a continuar para seguir con la
      experiencia
    </p>

    <Button on:click={() => step.set(GameStatus.OrderWords)}>Continuar</Button>
  </main>
</Modal>

<style>
  canvas {
    display: block;
    background-color: transparent;
    margin: 0 auto;
    border-radius: 10px;
  }
</style>
