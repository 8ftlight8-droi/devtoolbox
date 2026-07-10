"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";

const PRESETS = [
  { label: "Every minute", cron: "* * * * *" },
  { label: "Every hour", cron: "0 * * * *" },
  { label: "Every day at midnight", cron: "0 0 * * *" },
  { label: "Every Monday at 9am", cron: "0 9 * * 1" },
  { label: "Every weekday at 9am", cron: "0 9 * * 1-5" },
  { label: "Every 5 minutes", cron: "*/5 * * * *" },
  { label: "Every 15 minutes", cron: "*/15 * * * *" },
  { label: "Every Sunday at 2am", cron: "0 2 * * 0" },
  { label: "1st of every month", cron: "0 0 1 * *" },
  { label: "Every 6 hours", cron: "0 */6 * * *" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function explainCron(parts: string[]): string {
  if (parts.length !== 5) return "Invalid cron expression (need 5 fields)";
  const [min, hour, dom, month, dow] = parts;

  const pieces: string[] = [];

  if (min === "*" && hour === "*") pieces.push("Every minute");
  else if (min.startsWith("*/")) pieces.push(`Every ${min.slice(2)} minutes`);
  else if (hour === "*") pieces.push(`At minute ${min} of every hour`);
  else if (min === "0" && hour.startsWith("*/")) pieces.push(`Every ${hour.slice(2)} hours`);
  else pieces.push(`At ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`);

  if (dom !== "*") pieces.push(`on day ${dom} of the month`);
  if (month !== "*") {
    const monthNames = month.split(",").map(m => MONTHS[parseInt(m) - 1] || m).join(", ");
    pieces.push(`in ${monthNames}`);
  }
  if (dow !== "*") {
    const dayNames = dow.split(",").map(d => {
      if (d.includes("-")) {
        const [start, end] = d.split("-");
        return `${DAYS[parseInt(start)]}-${DAYS[parseInt(end)]}`;
      }
      return DAYS[parseInt(d)] || d;
    }).join(", ");
    pieces.push(`on ${dayNames}`);
  }

  return pieces.join(" ");
}

function getNextRuns(parts: string[], count: number): Date[] {
  if (parts.length !== 5) return [];
  const runs: Date[] = [];
  const now = new Date();
  const check = new Date(now);
  check.setSeconds(0, 0);

  for (let i = 0; i < 525600 && runs.length < count; i++) {
    check.setMinutes(check.getMinutes() + 1);
    if (matchesCron(check, parts)) runs.push(new Date(check));
  }
  return runs;
}

function matchesCron(date: Date, parts: string[]): boolean {
  const [min, hour, dom, month, dow] = parts;
  return (
    matchField(min, date.getMinutes()) &&
    matchField(hour, date.getHours()) &&
    matchField(dom, date.getDate()) &&
    matchField(month, date.getMonth() + 1) &&
    matchField(dow, date.getDay())
  );
}

function matchField(field: string, value: number): boolean {
  if (field === "*") return true;
  return field.split(",").some(part => {
    if (part.includes("/")) {
      const [range, step] = part.split("/");
      const s = parseInt(step);
      if (range === "*") return value % s === 0;
      const start = parseInt(range);
      return value >= start && (value - start) % s === 0;
    }
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      return value >= start && value <= end;
    }
    return parseInt(part) === value;
  });
}

export function CronBuilderTool() {
  const [cron, setCron] = useState("0 9 * * 1-5");

  const parts = cron.trim().split(/\s+/);
  const explanation = useMemo(() => explainCron(parts), [cron]);
  const nextRuns = useMemo(() => getNextRuns(parts, 5), [cron]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label htmlFor="cron-input" className="mb-1 block text-sm font-medium text-gray-400">
          Cron Expression
        </label>
        <div className="flex gap-2">
          <input
            id="cron-input"
            type="text"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="* * * * *"
            className="input-field flex-1 font-mono text-lg"
            spellCheck={false}
          />
          <CopyButton text={cron} />
        </div>
        <div className="mt-1 flex gap-4 text-xs text-gray-600 font-mono">
          <span>min</span><span>hour</span><span>day</span><span>month</span><span>dow</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <div className="text-xs text-gray-500 mb-1">Human-readable</div>
        <div className="text-lg text-white">{explanation}</div>
      </div>

      {/* Next Runs */}
      {nextRuns.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-400">Next 5 Run Times</h3>
          <div className="space-y-1">
            {nextRuns.map((date, i) => (
              <div key={i} className="flex items-center gap-2 rounded border border-gray-800 bg-gray-900 px-3 py-2 font-mono text-sm text-gray-300">
                <span className="text-gray-600">{i + 1}.</span>
                {date.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-400">Common Presets</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {PRESETS.map((p) => (
            <button
              key={p.cron}
              onClick={() => setCron(p.cron)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-left transition-colors hover:border-brand-500/50"
            >
              <div className="font-mono text-xs text-brand-400">{p.cron}</div>
              <div className="text-xs text-gray-500 mt-0.5">{p.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
