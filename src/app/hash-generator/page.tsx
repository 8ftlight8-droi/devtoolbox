import type { Metadata } from "next";
import { HashGeneratorTool } from "./HashGeneratorTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online",
  description:
    "Free online hash generator. Create MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly. All processing in your browser.",
  keywords: [
    "hash generator",
    "md5 hash",
    "sha256 hash",
    "sha1 online",
    "sha512 generator",
    "hash text online",
    "checksum generator",
  ],
  alternates: { canonical: "/hash-generator" },
};

export default function HashGeneratorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="Hash Generator"
        description="Free online hash generator. Create MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly."
        url="/hash-generator"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Hash Generator", url: "/hash-generator" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Hash Generator</h1>
        <p className="mt-2 text-gray-400">
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text.
          Uses the Web Crypto API — all processing happens in your browser.
        </p>
      </div>

      <AdSlot slot="hash-top" className="mb-6" />

      <HashGeneratorTool />

      <AdSlot slot="hash-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">About Hash Functions</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            A hash function takes input data and produces a fixed-size string of characters.
            The same input always produces the same hash, but you cannot reverse a hash
            back to the original input.
          </p>
          <p>
            Common uses: password storage, file integrity checks, digital signatures,
            and data deduplication.
          </p>
          <p>
            <strong className="text-gray-300">Security note:</strong> MD5 and SHA-1 are
            considered weak for security purposes. Use SHA-256 or SHA-512 for
            cryptographic applications.
          </p>
        </div>
      </section>
    </div>
  );
}
