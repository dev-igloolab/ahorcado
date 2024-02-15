<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    interface Molecule {
      x: number;
      y: number;
      color: string;
    }

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
      } while (isOverlapping(molecule));
      molecules.push(molecule);
    }

    // Check if two molecules are close enough to join
    function checkMoleculesToJoin() {
      molecules.forEach((molecule1) => {
        molecules.forEach((molecule2) => {
          if (
            molecule1 !== molecule2 &&
            distanceBetween(molecule1, molecule2) < moleculeRadius * 2
          ) {
            moleculesToJoin.add(molecule1);
            moleculesToJoin.add(molecule2);
          }
        });
      });
    }

    // Check if a molecule overlaps with any other molecule
    function isOverlapping(newMolecule: Molecule) {
      return molecules.some(
        (molecule) =>
          distanceBetween(newMolecule, molecule) < moleculeRadius * 2
      );
    }

    // Calculate distance between two molecules
    function distanceBetween(molecule1: Molecule, molecule2: Molecule) {
      return Math.sqrt(
        Math.pow(molecule2.x - molecule1.x, 2) +
          Math.pow(molecule2.y - molecule1.y, 2)
      );
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
        checkMoleculesToJoin();
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
        } while (isOverlapping(newPosition));
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
        checkMoleculesToJoin();
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
        } while (isOverlapping(newPosition));
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

<section class="grid min-h-screen place-content-center">
  <canvas id="gameCanvas" width="500" height="500"></canvas>
</section>

<style>
  canvas {
    display: block;
    background-color: #f0f0f0;
    margin: 0 auto;
    border-radius: 10px;
  }
</style>
