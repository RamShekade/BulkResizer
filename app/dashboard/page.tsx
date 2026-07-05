"use client";

import { useCallback, useState } from "react";
import { Check, Percent } from "lucide-react";
import { useImages } from "../hooks/useImages";
import { getSizeByPercentage } from "../utils/getSize";

export default function Dashboard() {
  const { images } = useImages();

    const [percentage, setPercentage] = useState<number>(50);
    const [width, setWidth] = useState<number | "">("");
    const [height, setHeight] = useState<number | "">("");
    const [mode, setMode] = useState<"pixels" | "percentage">("percentage");



  const presets = [25, 50, 75];

  return (
    <main className="flex min-h-screen bg-[#faf8fc]">

      <section className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">
            Uploaded Images
          </h1>

          <div className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            {images.length} Images
          </div>
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
              const {resizedWidth , resizedHeight} = getSizeByPercentage(image.width, image.height, percentage);

              return (
               <div
                key={image.id}
                className="group relative rounded-2xl border border-gray-200 bg-white px-3 py-10 shadow-sm transition-all hover:border-pink-300 hover:shadow-lg"
                >

                <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-gray-500 shadow transition hover:bg-red-50 hover:text-red-500">
                    ✕
                </button>


                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-white">
                    <img
                    src={image.uri}
                    alt={image.name}
                    className="max-h-full max-w-full object-contain"
                    />
                </div>

                <p className="mt-5 truncate text-center text-sm text-gray-700">
                    {image.name}
                </p>


                <div className="mt-3 flex items-center justify-center gap-1 text-[12px] font-medium">
                    <span className="rounded bg-gray-400 px-2 py-1 text-white">
                    {image.width} × {image.height}
                    </span>

                    <span className="text-gray-400">→</span>

                    <span className="rounded bg-blue-500 px-2 py-1 text-white">
                    {resizedWidth} × {resizedHeight}
                    </span>
                </div>
                </div>
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
                    : "hover:bg-pink-50"
                }`}
                >
                <span>{value}%</span>

                {percentage === value && (
                    <Check className="text-green-500" />
                )}
                </button>
            ))}
            </div>

            <div className="p-8">
            <label className="mb-2 block font-medium">
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
                className="w-full rounded-xl border px-4 py-3 pr-12"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                %
                </span>
            </div>
            </div>
        </>
              )}
        {mode === "pixels" && (
        <div className="space-y-6 p-8">
            <div>
            <label className="mb-2 block font-medium">
                Width
            </label>

            <input
                type="number"
                value={width}
                onChange={(e) =>
                setWidth(Number(e.target.value))
                }
                placeholder="Width"
                className="w-full rounded-xl border px-4 py-3"
            />
            </div>

            <div>
            <label className="mb-2 block font-medium">
                Height
            </label>

            <input
                type="number"
                value={height}
                onChange={(e) =>
                setHeight(Number(e.target.value))
                }
                placeholder="Height"
                className="w-full rounded-xl border px-4 py-3"
            />
            </div>

            <label className="flex items-center gap-3">
            <input
                type="checkbox"
                defaultChecked
            />

            <span>Maintain Aspect Ratio</span>
            </label>
        </div>
        )}

        <div className="absolute bottom-0 left-0 w-full border-t bg-white p-6">
          <button className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 py-5 text-xl font-semibold text-white shadow-lg transition hover:scale-[1.02]">
            Resize Images
          </button>
        </div>
      </aside>
    </main>
  );
}