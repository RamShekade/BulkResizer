"use client";

import Link from "next/link";
import { Images } from "lucide-react";

export function Header() {
  return (
    <header className="bg-[#faf8fc] border-b border-gray-200">
      <div className="flex h-16 items-center px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-sm shadow-pink-200">
            <Images className="h-5 w-5" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Bulk Resizer
            </span>
            <span className="mt-0.5 text-[11px] font-medium text-pink-500">
              Resize images in seconds
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}