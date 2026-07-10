import type { Metadata } from "next";
import { TimestampTool } from "./TimestampTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Convert Epoch Time to Human Date",
  description:
    "Free online Unix timestamp converter. Convert epoch timestamps to human-readable dates and vice versa. Shows current timestamp live. No data leaves your browser.",
  keywords: [
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time",
    "epoch time",
    "current unix timestamp",
  ],
  alternates: { canonical: "/timestamp-converter" },
};

export default function TimestampPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="Unix Timestamp Converter"
        description="Free online Unix timestamp converter. Convert epoch time to human-readable dates and back."
        url="/timestamp-converter"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Timestamp Converter", url: "/timestamp-converter" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Unix Timestamp Converter</h1>
        <p className="mt-2 text-gray-400">
          Convert Unix epoch timestamps to human-readable dates and back. Shows your current timestamp live.
        </p>
      </div>

      <AdSlot slot="timestamp-top" className="mb-6" />

      <TimestampTool />

      <AdSlot slot="timestamp-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">About Unix Timestamps</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>A Unix timestamp (epoch time) is the number of seconds since January 1, 1970 00:00:00 UTC. It&apos;s used universally in programming for storing and comparing dates.</p>
          <p>Common formats: seconds (10 digits), milliseconds (13 digits). This tool handles both automatically.</p>
        </div>
      </section>
    </div>
  );
}
