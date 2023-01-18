export function scale(height0: number, width0: number, width: number) {
  const scalingFactor = width / width0;
  const height = height0 * scalingFactor;

  return height;
}
