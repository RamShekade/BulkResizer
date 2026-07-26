"use client";

import { useRef } from "react";
import { Image } from "@/models/Image";
import ImageCard from "./imageCard";

type ImageCanvasProps = {
  images: Image[];
  onRemoveImage: (id: string) => void;
  onAddFiles: (files: FileList | null) => void;
};

export function ImageCanvas({
  images,
  onRemoveImage,
  onAddFiles,
}: ImageCanvasProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="relative min-h-[50vh] flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
        <div className="group relative">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Add more images"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-pink-600 text-white shadow-md transition hover:bg-pink-700 sm:h-12 sm:w-12"
          >
            <span className="text-[36px] leading-none sm:text-[40px]">+</span>

            {images.length > 0 && (
              <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-600 bg-black text-[10px] font-semibold text-white">
                {images.length}
              </span>
            )}
          </button>

          <div
            role="tooltip"
            className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-neutral-800 px-3 py-1.5 text-sm text-white opacity-0 shadow transition group-hover:opacity-100 sm:block"
          >
            Add more images
            <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-neutral-800" />
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => onAddFiles(e.target.files)}
        />
      </div>

      {images.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center rounded-2xl border-2 border-dashed border-pink-200 bg-white sm:h-[70vh] sm:rounded-3xl">
          <p className="px-4 text-center text-base text-gray-500 sm:text-lg">
            No Images Uploaded
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pt-14 sm:grid-cols-2 sm:gap-6 sm:pt-0 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onRemoveImage={onRemoveImage}
            />
          ))}
        </div>
      )}
    </section>
  );
}
