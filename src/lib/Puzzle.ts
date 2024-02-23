import type { Molecule } from "../types/Puzzle.types";

export function distanceBetween(molecule1: Molecule, molecule2: Molecule) {
  return Math.sqrt(
    Math.pow(molecule2.x - molecule1.x, 2) +
      Math.pow(molecule2.y - molecule1.y, 2)
  );
}

// Check if two molecules are close enough to join
export function checkMoleculesToJoin(
  molecules: Molecule[],
  moleculesToJoin: Set<Molecule>,
  moleculeRadius: number
) {
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
export function isOverlapping(
  newMolecule: Molecule,
  molecules: Molecule[],
  moleculeRadius: number
): boolean {
  return molecules.some(
    (molecule) => distanceBetween(newMolecule, molecule) < moleculeRadius * 2
  );
}
