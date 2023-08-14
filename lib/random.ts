export function random(
  min: number,
  max: number,
  float: boolean = false
): number {
  if (float) return +(Math.random() * (max - min) + min).toFixed(2);

  return Math.floor(Math.random() * (max - min) + min);
}
