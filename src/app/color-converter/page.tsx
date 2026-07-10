import type { Metadata } from "next";
import { ColorConverterTool } from "./ColorConverterTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Color Converter — HEX, RGB, HSL Converter Online",
  description:
    "Free online color converter. Convert between HEX, RGB, and HSL color formats instantly. Live preview included. No data leaves your browser.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hsl converter",
    "color picker",
    "hex to hsl",
    "css color converter",
  ],
  alternates: { canonical: "/color-converter" },
};

export default function ColorConverterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="Color Converter"
        description="Free online color converter. Convert between HEX, RGB, and HSL color formats instantly with live preview."
        url="/color-converter"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Color Converter", url: "/color-converter" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Color Converter</h1>
        <p className="mt-2 text-gray-400">
          Convert colors between HEX, RGB, and HSL formats. See a live preview
          as you type.
        </p>
      </div>

      <AdSlot slot="color-top" className="mb-6" />

      <ColorConverterTool />

      <AdSlot slot="color-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">About Color Formats</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            <strong className="text-gray-300">HEX:</strong> A 6-digit hexadecimal
            representation (#RRGGBB). Most common in CSS and web design.
          </p>
          <p>
            <strong className="text-gray-300">RGB:</strong> Red, Green, Blue values
            from 0-255. Used in CSS as rgb(R, G, B).
          </p>
          <p>
            <strong className="text-gray-300">HSL:</strong> Hue (0-360), Saturation
            (0-100%), Lightness (0-100%). More intuitive for color manipulation.
          </p>
        </div>
      </section>
    </div>
  );
}
