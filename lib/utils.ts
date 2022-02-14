export function randomNumber(
  from: number,
  to: number,
  float: boolean = false
): number {
  if (float) return +(Math.random() * (to - from) + from).toFixed(2);

  return Math.floor(Math.random() * (to - from) + from);
}

export function randomArray(
  length: number,
  from: number,
  to: number,
  float: boolean = false
): number[] {
  if (float) {
    return Array.from({ length }, () => randomNumber(from, to, float));
  }

  return Array.from({ length }, () => randomNumber(from, to, float));
}
