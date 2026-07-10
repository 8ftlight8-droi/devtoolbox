import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-600 text-xs font-bold">
              DT
            </div>
            <span className="text-sm text-gray-400">
              DevToolBox — Free developer utilities
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link href="/json-formatter" className="hover:text-gray-300">
              JSON Formatter
            </Link>
            <Link href="/regex-tester" className="hover:text-gray-300">
              Regex Tester
            </Link>
            <Link href="/base64" className="hover:text-gray-300">
              Base64
            </Link>
            <Link href="/jwt-decoder" className="hover:text-gray-300">
              JWT Decoder
            </Link>
          </nav>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} DevToolBox. All tools run
          client-side. Your data never leaves your browser.
        </div>
      </div>
    </footer>
  );
}
