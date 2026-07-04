import Image from "next/image";

interface ImageCardProps {
  image: string;
  fileName: string;
  originalSize: string;
  resizedSize: string;
}

export default function ImageCard({
  image,
  fileName,
  originalSize,
  resizedSize,
}: ImageCardProps) {
  return (
    <div className="w-64 rounded-2xl border border-pink-100 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-pink-50">
        <Image
          src={image}
          alt={fileName}
          fill
          className="object-cover"
        />
      </div>

      <p className="mt-4 truncate text-center text-sm font-medium text-gray-700">
        {fileName}
      </p>

      <div className="mt-3 flex justify-center gap-2">
        <span className="rounded-md bg-gray-200 px-2 py-1 text-[11px] font-medium text-gray-700">
          {originalSize}
        </span>

        <span className="rounded-md bg-pink-500 px-2 py-1 text-[11px] font-medium text-white">
          {resizedSize}
        </span>
      </div>
    </div>
  );
}