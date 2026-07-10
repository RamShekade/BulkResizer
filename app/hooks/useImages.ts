"use client";

import { useImageContext } from "../context/ImageContext";

export function useImages() {
  return useImageContext();
}
