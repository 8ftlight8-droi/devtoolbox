"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { name: "JSON", href: "/json-formatter" },
  { name: "Regex", href: "/regex-tester" },
  { name: "Base64", href: "/base64" },
  { name: "JWT", href: "/jwt-decoder" },
  { name: "Hash", href: "/hash-generator" },
  { name: "URL", href: "/url-encoder" },
  { name: "Color", href: "/color-converter" },
  { name: "Cron", href: "/cron-builder" },
  { name: "Time", href: "/timestamp-converter" },
  { name: "Diff", href: "/json-diff" },
  { name: "MD", href: "/markdown-preview" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold">
            DT
          </div>
          <span className="text-lg font-semibold text-white">DevToolBox</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === tool.href
                  ? "bg-brand-600/10 text-brand-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              {tool.name}
            </Link>
          ))}
        </nav>

        {/* Mobile nav toggle placeholder */}
        <button
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 md:hidden"
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
