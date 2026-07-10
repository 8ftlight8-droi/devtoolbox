import type { Metadata } from "next";
import { RegexTesterTool } from "./RegexTesterTool";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online in Real-Time",
  description:
    "Free online regex tester. Test regular expressions against sample text with real-time match highlighting. Supports JavaScript regex flags. No signup required.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex online",
    "test regex",
    "regex match",
    "regex validator",
    "javascript regex",
  ],
};

export default function RegexTesterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Regex Tester
        </h1>
        <p className="mt-2 text-gray-400">
          Test your regular expressions against sample text with real-time match
          highlighting. Supports all JavaScript regex flags.
        </p>
      </div>

      <AdSlot slot="regex-top" className="mb-6" />

      <RegexTesterTool />

      <AdSlot slot="regex-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">
          About This Tool
        </h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            Test and debug regular expressions in real-time. See all matches highlighted
            in your test string, with match groups and indices displayed clearly.
          </p>
          <p>
            Supports JavaScript regex flags: global (g), case-insensitive (i),
            multiline (m), dotAll (s), and unicode (u).
          </p>
          <p>
            Includes a library of common regex patterns for emails, URLs, phone numbers,
            and more.
          </p>
        </div>
      </section>
    </div>
  );
}
