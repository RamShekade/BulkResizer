export function getSizeByPercentage(
  originalWidth: number,
    originalHeight: number,
  percentage: number) {
  const resizedWidth = Math.round(originalWidth * (1 - percentage / 100));
  const resizedHeight = Math.round(originalHeight * (1 - percentage / 100));
  return { resizedWidth, resizedHeight };
}