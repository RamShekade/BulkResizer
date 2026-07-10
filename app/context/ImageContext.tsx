"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { Image } from "@/models/Image";

type ImageState = {
  images: Image[];
};

type ImageAction =
  | { type: "SET_IMAGES"; payload: Image[] }
  | { type: "ADD_IMAGES"; payload: Image[] }
  | { type: "REMOVE_IMAGE"; payload: string }
  | { type: "CLEAR_IMAGES" };

function revokeImageUris(images: Image[]) {
  images.forEach((img) => URL.revokeObjectURL(img.uri));
}

function imageReducer(state: ImageState, action: ImageAction): ImageState {
  switch (action.type) {
    case "SET_IMAGES":
      revokeImageUris(state.images);
      return { images: action.payload };
    case "ADD_IMAGES":
      return { images: [...state.images, ...action.payload] };
    case "REMOVE_IMAGE": {
      const removed = state.images.find((img) => img.id === action.payload);
      if (removed) URL.revokeObjectURL(removed.uri);
      return {
        images: state.images.filter((img) => img.id !== action.payload),
      };
    }
    case "CLEAR_IMAGES":
      revokeImageUris(state.images);
      return { images: [] };
    default:
      return state;
  }
}

type ImageContextValue = {
  images: Image[];
  setImages: (images: Image[]) => void;
  addImages: (images: Image[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
};

const ImageContext = createContext<ImageContextValue | null>(null);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(imageReducer, { images: [] });

  const setImages = useCallback((images: Image[]) => {
    dispatch({ type: "SET_IMAGES", payload: images });
  }, []);

  const addImages = useCallback((images: Image[]) => {
    dispatch({ type: "ADD_IMAGES", payload: images });
  }, []);

  const removeImage = useCallback((id: string) => {
    dispatch({ type: "REMOVE_IMAGE", payload: id });
  }, []);

  const clearImages = useCallback(() => {
    dispatch({ type: "CLEAR_IMAGES" });
  }, []);

  const value = useMemo(
    () => ({
      images: state.images,
      setImages,
      addImages,
      removeImage,
      clearImages,
    }),
    [state.images, setImages, addImages, removeImage, clearImages]
  );

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}

export function useImageContext() {
  const ctx = useContext(ImageContext);
  if (!ctx) {
    throw new Error("useImageContext must be used inside ImageProvider");
  }
  return ctx;
}
