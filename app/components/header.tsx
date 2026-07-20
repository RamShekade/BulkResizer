import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between bg-white text-black px-4 py-2 rounded-md">
            <div className="flex items-center gap-4">
                <button className="text-black px-4 py-2 font-bold rounded-md hover:text-pink-500 transition-colors">
                    <Link href="/">Home</Link>
                </button>
            </div>
        </header>
    );
}