"use client";

import {
    ImagePlus,
    ArrowRight,
    Percent,
    ScanLine,
    Check
} from "lucide-react";

export default function Dashboard() {
    return (
        <main className="flex h-screen bg-[#FFF7FB]">

            {/* Left */}

            <section className="flex-1 p-8">

                <div className="relative h-full rounded-3xl bg-white border border-pink-100 shadow-sm">

                    {/* Floating Buttons */}

                    <div className="absolute right-6 top-6 flex flex-col gap-3">

                        <button className="h-14 w-14 rounded-full bg-pink-500 text-white shadow-lg flex items-center justify-center">
                            <ImagePlus size={28}/>
                        </button>

                        <button className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center">
                            A↓Z
                        </button>

                    </div>

                    {/* Images */}

                    <div className="flex gap-8 p-16">

                        {[1,2].map((i)=>(
                            <div
                                key={i}
                                className="w-64 rounded-3xl bg-white shadow-lg border border-pink-100 p-4 hover:shadow-xl transition"
                            >

                                <div className="aspect-[4/3] rounded-xl bg-pink-50"/>

                                <h3 className="mt-5 text-center font-medium truncate">
                                    kitchen-image-{i}.jpg
                                </h3>

                                <div className="mt-4 flex justify-center gap-2">

                                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs">
                                        3840 × 2559
                                    </span>

                                    <span className="rounded-full bg-pink-500 text-white px-3 py-1 text-xs">
                                        1920 × 1280
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* Right Panel */}

            <aside className="w-[380px] bg-white border-l border-pink-100 flex flex-col">

                <div className="p-8">

                    <h1 className="text-4xl font-bold">
                        Resize Options
                    </h1>

                    {/* Toggle */}

                    <div className="mt-8 grid grid-cols-2 rounded-2xl border overflow-hidden">

                        <button className="flex flex-col items-center py-7 hover:bg-pink-50">

                            <ScanLine
                                className="mb-2 text-pink-500"
                                size={38}
                            />

                            By Pixels

                        </button>

                        <button className="bg-pink-50 flex flex-col items-center py-7 relative">

                            <Check
                                size={18}
                                className="absolute left-3 top-3 rounded-full bg-green-500 text-white p-0.5"
                            />

                            <Percent
                                className="mb-2 text-pink-600"
                                size={38}
                            />

                            By Percentage

                        </button>

                    </div>

                    {/* Presets */}

                    <div className="mt-8 rounded-2xl border divide-y">

                        {[
                            "25% Smaller",
                            "50% Smaller",
                            "75% Smaller",
                            "Custom"
                        ].map((item,index)=>(
                            <button
                                key={item}
                                className={`flex w-full items-center justify-between px-6 py-5 transition hover:bg-pink-50 ${
                                    index===1 && "bg-pink-50"
                                }`}
                            >
                                <span className="font-medium">
                                    {item}
                                </span>

                                {index===1 &&
                                    <div className="h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                }

                            </button>
                        ))}

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-auto p-6">

                    <button className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 py-5 text-xl font-semibold text-white shadow-lg hover:scale-[1.02] transition">

                        <div className="flex items-center justify-center gap-3">

                            Resize Images

                            <ArrowRight/>

                        </div>

                    </button>

                </div>

            </aside>

        </main>
    );
}