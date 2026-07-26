import { Image } from "@/models/Image";

export default function ImageCard({
  image,
  onRemoveImage,
}: {
  image: Image;
  onRemoveImage: (id: string) => void;
}) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white px-3 py-6 shadow-sm transition-all hover:border-pink-300 hover:shadow-lg sm:py-10">
      <button
        onClick={() => onRemoveImage(image.id)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-gray-500 shadow transition hover:bg-red-50 hover:text-red-500"
      >
        ✕
      </button>

      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-white">
        <img
          src={image.uri}
          alt={image.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="mt-4 truncate px-1 text-center text-sm text-gray-700 sm:mt-5">
        {image.name}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-[11px] font-medium sm:text-[12px]">
        <span className="rounded bg-gray-400 px-2 py-1 text-white">
          {image.width} × {image.height}
        </span>

        <span className="text-gray-400">→</span>

        <span className="rounded bg-blue-500 px-2 py-1 text-white">
          {image.resizedWidth} × {image.resizedHeight}
        </span>
      </div>
    </div>
  );
}
