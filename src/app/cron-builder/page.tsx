import type { Metadata } from "next";
import { CronBuilderTool } from "./CronBuilderTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Cron Expression Builder — Generate and Explain Cron Schedules",
  description:
    "Free online cron expression builder. Generate cron schedules visually, see human-readable explanations, and get the next 5 run times. No data leaves your browser.",
  keywords: [
    "cron expression builder",
    "cron generator",
    "crontab generator",
    "cron schedule",
    "cron syntax",
    "cron expression generator",
    "cron job builder",
  ],
  alternates: { canonical: "/cron-builder" },
};

export default function CronBuilderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="Cron Expression Builder"
        description="Free online cron expression builder. Generate and explain cron schedules visually."
        url="/cron-builder"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Cron Builder", url: "/cron-builder" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Cron Expression Builder</h1>
        <p className="mt-2 text-gray-400">
          Build cron expressions visually. See human-readable explanations and upcoming run times.
        </p>
      </div>

      <AdSlot slot="cron-top" className="mb-6" />

      <CronBuilderTool />

      <AdSlot slot="cron-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">Cron Syntax Reference</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-gray-500 border-b border-gray-700">
              <tr><th className="pb-2 pr-4">Field</th><th className="pb-2 pr-4">Values</th><th className="pb-2">Special</th></tr>
            </thead>
            <tbody className="text-gray-400 divide-y divide-gray-800">
              <tr><td className="py-2 pr-4 text-gray-300">Minute</td><td className="py-2 pr-4">0-59</td><td className="py-2">* , - /</td></tr>
              <tr><td className="py-2 pr-4 text-gray-300">Hour</td><td className="py-2 pr-4">0-23</td><td className="py-2">* , - /</td></tr>
              <tr><td className="py-2 pr-4 text-gray-300">Day of Month</td><td className="py-2 pr-4">1-31</td><td className="py-2">* , - /</td></tr>
              <tr><td className="py-2 pr-4 text-gray-300">Month</td><td className="py-2 pr-4">1-12</td><td className="py-2">* , - /</td></tr>
              <tr><td className="py-2 pr-4 text-gray-300">Day of Week</td><td className="py-2 pr-4">0-6 (Sun=0)</td><td className="py-2">* , - /</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
