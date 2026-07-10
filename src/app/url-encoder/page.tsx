import type { Metadata } from "next";
import { UrlEncoderTool } from "./UrlEncoderTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "URL Encoder/Decoder — Encode and Decode URLs Online",
  description:
    "Free online URL encoder and decoder. Encode special characters for URLs or decode percent-encoded strings. Handles UTF-8. No data leaves your browser.",
  keywords: [
    "url encoder",
    "url decoder",
    "percent encoding",
    "encode url online",
    "decode url",
    "urlencode",
    "urldecode",
  ],
  alternates: { canonical: "/url-encoder" },
};

export default function UrlEncoderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="URL Encoder/Decoder"
        description="Free online URL encoder and decoder. Encode special characters for URLs or decode percent-encoded strings."
        url="/url-encoder"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "URL Encoder", url: "/url-encoder" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          URL Encoder / Decoder
        </h1>
        <p className="mt-2 text-gray-400">
          Encode special characters for safe use in URLs, or decode
          percent-encoded strings back to readable text.
        </p>
      </div>

      <AdSlot slot="url-top" className="mb-6" />

      <UrlEncoderTool />

      <AdSlot slot="url-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">About URL Encoding</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            URL encoding (percent-encoding) replaces unsafe characters with a percent
            sign followed by two hex digits. This is required for characters like spaces,
            ampersands, and non-ASCII characters in URLs.
          </p>
          <p>
            This tool supports both <code className="text-gray-300">encodeURIComponent</code> (encodes
            everything except unreserved chars) and <code className="text-gray-300">encodeURI</code> (preserves
            URL structure characters like : / ? # @ etc).
          </p>
        </div>
      </section>
    </div>
  );
}
