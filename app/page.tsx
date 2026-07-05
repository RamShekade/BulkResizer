"use client";

import { useCallback, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { Image } from "@/models/Image";

import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants/query-keys";
import { useRouter } from "next/navigation";

interface UploadHeroProps {
  onFilesSelected?: (files: File[]) => void;
}


export default function UploadHero({
  onFilesSelected,
}: UploadHeroProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const queryClient = useQueryClient();
const router = useRouter();
  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList) return;

      const files = Array.from(fileList).filter((file) =>
        file.type.startsWith("image/")
      );
      if (!files.length) return;
      console.log("files", files);
      const images: Image[] = [];

      await Promise.all(
        files.map(async (file) => {
          const imageBitmap = await createImageBitmap(file);
          const Image: Image = {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            type: file.type,

            uri: URL.createObjectURL(file),
            height: imageBitmap.height,
            width: imageBitmap.width,
          };
          images.push(Image);
        })
      );
      console.log("images", images);
    
      queryClient.setQueryData(QUERY_KEYS.IMAGES.ALL, images);
      console.log(
  queryClient.getQueryData(QUERY_KEYS.IMAGES.ALL)
      );
      router.replace("/dashboard");
      onFilesSelected?.(files);
    },
    [onFilesSelected]
  );

  return (
    <section className="flex flex-col items-center py-24">
      <h1 className="text-6xl font-bold">
        Resize Images
      </h1>

      <p className="mt-4 text-center text-lg text-gray-600">
        Upload multiple images and resize them in seconds.
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`
          mt-14
          flex
          h-72
          w-full
          max-w-3xl
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-3xl
          border-2
          border-dashed
          transition-all

          ${
            dragging
              ? "border-pink-500 bg-pink-100"
              : "border-pink-200 bg-pink-50"
          }
        `}
      >
        <CloudUpload
          size={70}
          className="text-pink-600"
        />

        <h2 className="mt-6 text-3xl font-bold">
          Drop Images Here
        </h2>

        <p className="mt-3 text-gray-500">
          or click to browse
        </p>

        <input
          ref={inputRef}
          hidden
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </section>
  );
}