import type { Metadata } from "next";
import { JsonDiffTool } from "./JsonDiffTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "JSON Diff Viewer — Compare Two JSON Objects Online",
  description:
    "Free online JSON diff tool. Compare two JSON objects and see differences highlighted. Find added, removed, and changed values. No data leaves your browser.",
  keywords: [
    "json diff",
    "json compare",
    "compare json objects",
    "json difference",
    "json diff viewer",
    "json compare tool",
  ],
  alternates: { canonical: "/json-diff" },
};

export default function JsonDiffPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="JSON Diff Viewer"
        description="Free online JSON diff tool. Compare two JSON objects and see differences highlighted."
        url="/json-diff"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "JSON Diff", url: "/json-diff" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">JSON Diff Viewer</h1>
        <p className="mt-2 text-gray-400">
          Paste two JSON objects to compare. Differences are highlighted: added, removed, and changed values.
        </p>
      </div>

      <AdSlot slot="diff-top" className="mb-6" />

      <JsonDiffTool />

      <AdSlot slot="diff-bottom" className="mt-8" />
    </div>
  );
}
