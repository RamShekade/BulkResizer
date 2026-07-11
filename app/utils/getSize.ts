export function getSizeByPercentage(
  originalWidth: number,
  originalHeight: number,
  percentage: number
) {
  const resizedWidth = Math.round(originalWidth * (1 - percentage / 100));
  const resizedHeight = Math.round(originalHeight * (1 - percentage / 100));

  return { resizedWidth, resizedHeight };
}

export function getSizeByPixels(
  originalWidth: number,
  originalHeight: number,
  width?: number,
  height?: number,
  maintainAspectRatio = true
) {
  const aspect = originalHeight / originalWidth;

  const hasWidth = width != null && width > 0;
  const hasHeight = height != null && height > 0;

  if (hasWidth && hasHeight) {
    if (!maintainAspectRatio) {
      return {
        resizedWidth: Math.min(width, originalWidth),
        resizedHeight: Math.min(height, originalHeight),
      };
    }

    if (width >= height) {
      const resizedWidth = Math.min(width, originalWidth);
      const resizedHeight = Math.round(resizedWidth * aspect);
      return { resizedWidth, resizedHeight };
    }

    const resizedHeight = Math.min(height, originalHeight);
    const resizedWidth = Math.round(resizedHeight / aspect);
    return { resizedWidth, resizedHeight };
  }

  if (hasWidth) {
    const resizedWidth = Math.min(width, originalWidth);
    return {
      resizedWidth,
      resizedHeight: Math.round(resizedWidth * aspect),
    };
  }

  if (hasHeight) {
    const resizedHeight = Math.min(height, originalHeight);
    return {
      resizedWidth: Math.round(resizedHeight / aspect),
      resizedHeight,
    };
  }

  return { resizedWidth: originalWidth, resizedHeight: originalHeight };
}
