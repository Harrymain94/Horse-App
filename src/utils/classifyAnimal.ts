export function classifyAnimal(weight?: number | null): string {
  if (weight === null || weight === undefined) {
    return "-";
  }

  return weight >= 400 ? "Horse" : "Pony";
}