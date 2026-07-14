"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useImageContext } from "../hooks/ImageContext";
import { getSizeByPercentage, getSizeByPixels } from "../utils/getSize";
import { useResizeImages } from "../hooks/useResizeImgages";
import ImageCard from "../components/imageCard";
import { Image } from "@/models/Image";
export default function Dashboard() {
    const { images, removeImage, addImages } = useImageContext();
    const router = useRouter();

    useEffect(() => {
        if (images.length === 0) {
            router.replace("/");
        }
    }, [images.length, router]);

    const [percentage, setPercentage] = useState<number>(50);
    const [width, setWidth] = useState<number | "">("");
    const [height, setHeight] = useState<number | "">("");
    const [mode, setMode] = useState<"pixels" | "percentage">("percentage");
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const { resizeAndDownload } = useResizeImages();
    const inputRef = useRef<HTMLInputElement>(null);
    const presets = [25, 50, 75];
    const onRemoveImage = (id: string) => {
        removeImage(id);
    };

    const handleAddFiles = useCallback(
      async (fileList: FileList | null) => {
        if (!fileList) return;
  
        const files = Array.from(fileList).filter((file) =>
          file.type.startsWith("image/")
        );
        if (!files.length) return;
  
        const images: Image[] = [];
  
        await Promise.all(
          files.map(async (file) => {
            const imageBitmap = await createImageBitmap(file);
            const image: Image = {
              id: crypto.randomUUID(),
              name: file.name,
              size: file.size,
              type: file.type,
              uri: URL.createObjectURL(file),
              height: imageBitmap.height,
              width: imageBitmap.width,
            };
            images.push(image);
          })
        );
  
        addImages(images);
      },
      [addImages]
    );
  
  return (
    <main className="flex min-h-screen bg-[#faf8fc]">

      <section className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">
            Uploaded Images
          </h1>

          <button onClick={() => inputRef.current?.click()} className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            Add Images
          </button>

          <input
            type="file"
            ref={inputRef}
            onChange={(e) => handleAddFiles(e.target.files)}
            className="hidden"
            multiple
          />
        </div>

        {images.length === 0 ? (
          <div className="flex h-[70vh] items-center justify-center rounded-3xl border-2 border-dashed border-pink-200 bg-white">
            <p className="text-lg text-gray-500">
              No Images Uploaded
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {images.map((image) => {
              const { resizedWidth, resizedHeight } = mode === "percentage"
                ? getSizeByPercentage(image.width, image.height, percentage)
                : getSizeByPixels(
                    image.width,
                    image.height,
                    width === "" ? undefined : width,
                    height === "" ? undefined : height,
                    maintainAspectRatio
                  );
              image.resizedHeight = resizedHeight;
              image.resizedWidth = resizedWidth;

              return (
                <ImageCard key={image.id} image={image} onRemoveImage={onRemoveImage} />
              );
            })}
          </div>
        )}
      </section>

      <aside className="sticky top-0 h-screen w-[380px] border-l border-pink-100 bg-white shadow-xl">
        <div className="border-b p-8">
          <h2 className="text-4xl font-bold">
            Resize Options
          </h2>
        </div>


        <div className="grid grid-cols-2 border-b">
        <button
            onClick={() => setMode("pixels")}
            className={`relative flex flex-col items-center gap-3 border-r py-8 transition ${
            mode === "pixels"
                ? "bg-pink-50 text-pink-600"
                : "text-gray-400 hover:bg-gray-50"
            }`}
        >
            {mode === "pixels" && (
            <div className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <Check className="h-4 w-4 text-white" />
            </div>
            )}

            <div className="text-5xl">⬚</div>

            <span className="font-medium">
            By Pixels
            </span>
        </button>

        <button
            onClick={() => setMode("percentage")}
            className={`relative flex flex-col items-center gap-3 py-8 transition ${
            mode === "percentage"
                ? "bg-pink-50 text-pink-600"
                : "text-gray-400 hover:bg-gray-50"
            }`}
        >
            {mode === "percentage" && (
            <div className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <Check className="h-4 w-4 text-white" />
            </div>
            )}

            <div className="text-5xl">%</div>

            <span className="font-medium">
            By Percentage
            </span>
        </button>
        </div>

        {mode === "percentage" && (
        <>
            <div className="border-b">
            {presets.map((value) => (
                <button
                key={value}
                onClick={() => setPercentage(value)}
                className={`flex w-full items-center justify-between border-b px-8 py-5 ${
                    percentage === value
                    ? "bg-pink-50 text-pink-600"
                    : "hover:bg-pink-50 text-gray-300"
                }`}
                >
                <span>{value}%</span>

                {percentage === value && (
                    <Check className="text-black-500" />
                )}
                </button>
            ))}
            </div>

            <div className="p-5">
            <label className="mb-2 block font-medium text-gray-700">
                Custom Percentage
            </label>

            <div className="relative">
                <input
                type="number"
                value={percentage}
                min={1}
                max={100}
                onChange={(e) =>
                    setPercentage(
                    Math.max(
                        1,
                        Math.min(100, Number(e.target.value))
                    )
                    )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-500 pr-12"
                />

                <span className="absolute text-gray-500 right-4 top-1/2 -translate-y-1/2">
                %
                </span>
            </div>
            </div>
        </>
              )}
        {mode === "pixels" && (
        <div className="space-y-6 p-8">
            <div>
            <label className="mb-2 block font-medium text-gray-700">
                Width
            </label>

            <input
                type="number"
                value={width}
                onChange={(e) =>
                setWidth(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Width"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-500"
            />
            </div>

            <div>
            <label className="mb-2 block font-medium text-gray-500">
                Height
            </label>

            <input
                type="number"
                value={height}
                onChange={(e) =>
                setHeight(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Height"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-500"
            />
            </div>

            <label className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
            />

            <span className="text-gray-500">Maintain Aspect Ratio</span>
            </label>
        </div>
        )}

        <div className="absolute bottom-0 left-0 w-full border-t bg-white p-6">
          <button className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 py-5 text-xl font-semibold text-white shadow-lg transition hover:scale-[1.02]" onClick={ () => resizeAndDownload({ images }) }>
            Resize Images
          </button>
        </div>
      </aside>
    </main>
  );
}