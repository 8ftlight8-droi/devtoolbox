import type { Metadata } from "next";
import { Base64Tool } from "./Base64Tool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder — Encode and Decode Base64 Online",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 and back instantly. Supports UTF-8. No data leaves your browser.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 online",
    "encode base64",
    "decode base64",
    "base64 converter",
    "text to base64",
  ],
  alternates: { canonical: "/base64" },
};

export default function Base64Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="Base64 Encoder/Decoder"
        description="Free online Base64 encoder and decoder. Convert text to Base64 and back instantly. Supports UTF-8."
        url="/base64"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Base64", url: "/base64" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Base64 Encoder / Decoder
        </h1>
        <p className="mt-2 text-gray-400">
          Encode text to Base64 or decode Base64 back to text. Supports UTF-8
          characters. All processing happens in your browser.
        </p>
      </div>

      <AdSlot slot="base64-top" className="mb-6" />

      <Base64Tool />

      <AdSlot slot="base64-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">
          About Base64 Encoding
        </h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            Base64 is a binary-to-text encoding scheme that represents binary data in
            an ASCII string format. It&apos;s commonly used to embed binary data in JSON,
            HTML, CSS, emails, and URLs.
          </p>
          <p>
            This tool handles UTF-8 text encoding properly, so international characters,
            emojis, and special symbols are encoded and decoded correctly.
          </p>
        </div>
      </section>
    </div>
  );
}
