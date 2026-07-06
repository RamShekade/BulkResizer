export function getSizeByPercentage(
  originalWidth: number,
    originalHeight: number,
  percentage: number) {
  
  const resizedWidth = Math.round(originalWidth * (1 - percentage / 100));
  const resizedHeight = Math.round(originalHeight * (1 - percentage / 100));
  
  return { resizedWidth, resizedHeight };
}

export function getSizeByPixels(
  originalWidth: number,
  originalHeight: number,
  width: number,
  height: number) {
  
  let resizedWidth = width;
  let resizedHeight = height;
  const ratio = originalHeight / originalWidth; 

  if (originalHeight > originalWidth) {
    resizedHeight = Math.min(originalHeight, height);
    resizedWidth = Math.round(resizedHeight / ratio);``
  } else {
    resizedWidth = Math.min(originalWidth, width);
    resizedHeight = Math.round(resizedWidth * ratio);
  }
  return { resizedWidth, resizedHeight };
}