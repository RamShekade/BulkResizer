import { Image } from "@/models/Image";
import { getSizeByPercentage, getSizeByPixels } from "../utils/getSize";

type ResizeSettings = {
  mode: "pixels" | "percentage";
  percentage: number;
  width: number | "";
  height: number | "";
  maintainAspectRatio: boolean;
};

export function usePreviewImages(
  images: Image[],
  { mode, percentage, width, height, maintainAspectRatio }: ResizeSettings
) {
  return images.map((image) => {
    const { resizedWidth, resizedHeight } =
      mode === "percentage"
        ? getSizeByPercentage(image.width, image.height, percentage)
        : getSizeByPixels(
            image.width,
            image.height,
            width === "" ? undefined : width,
            height === "" ? undefined : height,
            maintainAspectRatio
          );

    return { ...image, resizedWidth, resizedHeight };
  });
}
