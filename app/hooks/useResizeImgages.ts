"use client";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Image } from "@/models/Image";

interface UseResizeImagesProps {
  images: Image[];
}

export function useResizeImages() {
  const resizeAndDownload = async ({ images }: UseResizeImagesProps) => {
      if (!images.length) return;
    console.log("Resizing and downloading images:", images[0]);
    const zip = new JSZip();

    await Promise.all(
        images.map(async (image) => {
        if (!image.resizedWidth || !image.resizedHeight) return;

        const bitmap = await createImageBitmap(image.uri ? await fetch(image.uri).then((res) => res.blob()) : new Blob());

        let blob: Blob;

        if ("OffscreenCanvas" in window) {
          const canvas = new OffscreenCanvas(
            image.resizedWidth,
            image.resizedHeight
          );

          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          ctx.drawImage(
            bitmap,
            0,
            0,
            image.resizedWidth,
            image.resizedHeight
          );

          bitmap.close();

          blob = await canvas.convertToBlob({
            type: image.type,
            quality: 0.92,
          });
        } else {
          const canvas = document.createElement("canvas");

          canvas.width = image.resizedWidth;
          canvas.height = image.resizedHeight;

          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          ctx.drawImage(
            bitmap,
            0,
            0,
            image.resizedWidth,
            image.resizedHeight
          );

          bitmap.close();

          blob = await new Promise((resolve) => {
            canvas.toBlob(
              (b) => resolve(b!),
              image.type,
              0.92
              );
          });
        }

        zip.file(image.name, blob);
      })
    );

    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
    });

    saveAs(zipBlob, "resized-images.zip");
  };

  return {
    resizeAndDownload,
  };
}