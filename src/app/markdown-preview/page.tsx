import type { Metadata } from "next";
import { MarkdownTool } from "./MarkdownTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Markdown Preview — Live Markdown Editor and Renderer Online",
  description:
    "Free online Markdown preview tool. Write Markdown and see it rendered in real-time. Supports headings, lists, code blocks, links, and images. No data leaves your browser.",
  keywords: [
    "markdown preview",
    "markdown editor online",
    "markdown renderer",
    "live markdown",
    "markdown viewer",
    "markdown to html",
  ],
  alternates: { canonical: "/markdown-preview" },
};

export default function MarkdownPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="Markdown Preview"
        description="Free online Markdown preview. Write and render Markdown in real-time."
        url="/markdown-preview"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Markdown Preview", url: "/markdown-preview" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Markdown Preview</h1>
        <p className="mt-2 text-gray-400">
          Write Markdown on the left, see it rendered in real-time on the right.
        </p>
      </div>

      <AdSlot slot="markdown-top" className="mb-6" />

      <MarkdownTool />

      <AdSlot slot="markdown-bottom" className="mt-8" />
    </div>
  );
}
