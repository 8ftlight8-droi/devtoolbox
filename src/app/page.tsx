import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

const tools = [
  {
    name: "JSON Formatter & Validator",
    description:
      "Beautify, minify, and validate JSON data instantly. Detect syntax errors with clear messages.",
    href: "/json-formatter",
    icon: "{ }",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    name: "Regex Tester",
    description:
      "Test regular expressions against sample text with real-time match highlighting and common patterns.",
    href: "/regex-tester",
    icon: ".*",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "Base64 Encoder/Decoder",
    description:
      "Encode text to Base64 or decode Base64 strings back to text. Supports UTF-8 characters.",
    href: "/base64",
    icon: "B64",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "JWT Decoder",
    description:
      "Decode and inspect JSON Web Tokens. View header, payload, claims, and expiration status.",
    href: "/jwt-decoder",
    icon: "JWT",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Free Developer Tools
          <span className="block text-brand-400">That Just Work</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Fast, free, and privacy-first. All tools run entirely in your browser —
          no data is ever sent to a server. No signup required.
        </p>
      </section>

      <AdSlot slot="home-top" className="mt-8" />

      {/* Tools Grid */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card group">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${tool.bg} font-mono text-sm font-bold ${tool.color}`}
              >
                {tool.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <AdSlot slot="home-bottom" className="mt-10" />

      {/* Features / Trust Signals */}
      <section className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
        <div>
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white">100% Client-Side</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your data never leaves your browser. No server processing, no logging.
          </p>
        </div>
        <div>
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white">Instant Results</h3>
          <p className="mt-1 text-sm text-gray-500">
            No loading spinners. Tools respond in real-time as you type.
          </p>
        </div>
        <div>
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white">Free Forever</h3>
          <p className="mt-1 text-sm text-gray-500">
            No signup, no paywall. All tools are free to use without limits.
          </p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-16 rounded-xl border border-gray-800 bg-gray-900/50 p-8">
        <h2 className="text-xl font-semibold text-white">
          Why DevToolBox?
        </h2>
        <div className="mt-4 space-y-3 text-sm text-gray-400">
          <p>
            DevToolBox provides the essential developer utilities you need every day,
            without the bloat. Whether you&apos;re debugging a JSON API response, testing
            a regex pattern, encoding data for an API call, or inspecting a JWT token,
            we&apos;ve got you covered.
          </p>
          <p>
            Unlike other tools, DevToolBox is built with privacy first. Every tool runs
            entirely in your browser using JavaScript — your data is never transmitted
            to any server. This makes it safe to use with sensitive data like API keys,
            tokens, and internal configurations.
          </p>
          <p>
            Built by developers, for developers. New tools are added regularly.
          </p>
        </div>
      </section>
    </div>
  );
}
