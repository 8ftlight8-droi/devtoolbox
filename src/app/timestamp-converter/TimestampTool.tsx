"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/CopyButton";

export function TimestampTool() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [tsResult, setTsResult] = useState<string | null>(null);
  const [dateResult, setDateResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestamp = () => {
    if (!tsInput.trim()) { setError("Enter a timestamp"); setDateResult(null); return; }
    const num = parseInt(tsInput.trim());
    if (isNaN(num)) { setError("Invalid number"); setDateResult(null); return; }

    // Auto-detect seconds vs milliseconds
    const ms = num > 9999999999 ? num : num * 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) { setError("Invalid timestamp"); setDateResult(null); return; }

    setDateResult(date.toISOString() + "\n" + date.toLocaleString());
    setError(null);
  };

  const convertDate = () => {
    if (!dateInput.trim()) { setError("Enter a date"); setTsResult(null); return; }
    const date = new Date(dateInput.trim());
    if (isNaN(date.getTime())) { setError("Invalid date format"); setTsResult(null); return; }

    const seconds = Math.floor(date.getTime() / 1000);
    const millis = date.getTime();
    setTsResult(`Seconds: ${seconds}\nMilliseconds: ${millis}`);
    setError(null);
  };

  const nowISO = new Date(now * 1000).toISOString();

  return (
    <div className="space-y-6">
      {/* Live Clock */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div className="text-xs text-gray-500 mb-1">Current Unix Timestamp (live)</div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl text-brand-400">{now}</span>
          <CopyButton text={String(now)} />
        </div>
        <div className="mt-1 text-xs text-gray-500">{nowISO}</div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Timestamp → Date */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Timestamp → Date</h3>
          <input
            type="text"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="e.g. 1720000000"
            className="input-field font-mono"
          />
          <button onClick={convertTimestamp} className="btn-primary">Convert to Date</button>
          {dateResult && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
              <div className="flex items-start justify-between">
                <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">{dateResult}</pre>
                <CopyButton text={dateResult} />
              </div>
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Date → Timestamp</h3>
          <input
            type="text"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            placeholder="e.g. 2026-07-10T12:00:00Z"
            className="input-field font-mono"
          />
          <button onClick={convertDate} className="btn-primary">Convert to Timestamp</button>
          {tsResult && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
              <div className="flex items-start justify-between">
                <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">{tsResult}</pre>
                <CopyButton text={tsResult} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick reference */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-400">Quick Reference</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs">
          {[
            { label: "1 hour", val: 3600 },
            { label: "1 day", val: 86400 },
            { label: "1 week", val: 604800 },
            { label: "1 year", val: 31536000 },
          ].map((item) => (
            <div key={item.label} className="rounded border border-gray-700 bg-gray-800 p-2 text-center">
              <div className="text-gray-500">{item.label}</div>
              <div className="font-mono text-gray-300">{item.val.toLocaleString()}s</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
