import type { Metadata } from "next";
import { JsonFormatterTool } from "./JsonFormatterTool";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Format, Beautify, and Validate JSON Online",
  description:
    "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. Syntax error detection with line numbers. No data leaves your browser.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minify",
    "format json online",
    "validate json",
    "pretty print json",
  ],
};

export default function JsonFormatterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          JSON Formatter & Validator
        </h1>
        <p className="mt-2 text-gray-400">
          Paste your JSON to format, beautify, minify, or validate it instantly.
          Everything runs in your browser — no data is sent anywhere.
        </p>
      </div>

      <AdSlot slot="json-top" className="mb-6" />

      <JsonFormatterTool />

      <AdSlot slot="json-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">
          About This Tool
        </h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            This JSON formatter helps developers quickly validate and beautify JSON data.
            It detects syntax errors and shows exactly where problems are in your JSON.
          </p>
          <p>
            Features: Format with custom indentation (2 or 4 spaces, tabs), minify JSON,
            validate structure, and copy results with one click.
          </p>
          <p>
            <strong className="text-gray-300">Privacy:</strong> All processing happens
            client-side. Your data never leaves your browser.
          </p>
        </div>
      </section>
    </div>
  );
}
