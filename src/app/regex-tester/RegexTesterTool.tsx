"use client";

import { useState, useMemo } from "react";

interface MatchResult {
  match: string;
  index: number;
  groups: string[];
}

const COMMON_PATTERNS = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { name: "URL", pattern: "https?://[^\\s/$.?#].[^\\s]*", flags: "gi" },
  { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])", flags: "g" },
  { name: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "gi" },
  { name: "HTML Tag", pattern: "<([a-z][a-z0-9]*)\\b[^>]*>(.*?)</\\1>", flags: "gi" },
  { name: "Digits Only", pattern: "^\\d+$", flags: "gm" },
];

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const { matches, computedError } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [] as MatchResult[], computedError: null };
    }
    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];
      let match: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return { matches: results, computedError: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid regex";
      return { matches: [] as MatchResult[], computedError: msg };
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testString || matches.length === 0) return null;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;

      let match: RegExpExecArray | null;
      while ((match = regex.exec(testString)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
        }
        parts.push({ text: match[0], isMatch: true });
        lastIndex = match.index + match[0].length;
        if (match[0].length === 0) {
          regex.lastIndex++;
          lastIndex++;
        }
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false });
      }
      return parts;
    } catch {
      return null;
    }
  }, [pattern, flags, testString, matches]);

  const loadPattern = (p: { pattern: string; flags: string }) => {
    setPattern(p.pattern);
    setFlags(p.flags);
  };

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div>
        <label htmlFor="regex-pattern" className="mb-1 block text-sm font-medium text-gray-400">
          Regular Expression
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-3 text-gray-500">/</span>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="input-field pl-6 pr-6 font-mono"
              spellCheck={false}
            />
            <span className="absolute right-3 top-3 text-gray-500">/{flags}</span>
          </div>
        </div>

        {/* Flags */}
        <div className="mt-2 flex items-center gap-3">
          <span className="text-xs text-gray-500">Flags:</span>
          {[
            { flag: "g", label: "Global" },
            { flag: "i", label: "Case-insensitive" },
            { flag: "m", label: "Multiline" },
            { flag: "s", label: "DotAll" },
            { flag: "u", label: "Unicode" },
          ].map(({ flag, label }) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`rounded px-2 py-0.5 text-xs font-mono transition-colors ${
                flags.includes(flag)
                  ? "bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/50"
                  : "bg-gray-800 text-gray-500 hover:text-gray-300"
              }`}
              title={label}
            >
              {flag}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {computedError && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          <strong>Error:</strong> {computedError}
        </div>
      )}

      {/* Test String */}
      <div>
        <label htmlFor="test-string" className="mb-1 block text-sm font-medium text-gray-400">
          Test String
        </label>
        <textarea
          id="test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against..."
          className="textarea-field h-[150px]"
          spellCheck={false}
        />
      </div>

      {/* Highlighted Output */}
      {highlightedText && (
        <div>
          <h3 className="mb-1 text-sm font-medium text-gray-400">
            Match Highlighting
          </h3>
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 font-mono text-sm whitespace-pre-wrap break-all">
            {highlightedText.map((part, i) =>
              part.isMatch ? (
                <mark
                  key={i}
                  className="rounded bg-brand-500/30 px-0.5 text-brand-200"
                >
                  {part.text}
                </mark>
              ) : (
                <span key={i} className="text-gray-300">{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* Match Results */}
      {matches.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-400">
            Matches ({matches.length})
          </h3>
          <div className="max-h-[200px] overflow-y-auto rounded-lg border border-gray-700 bg-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-700 text-xs text-gray-500">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Match</th>
                  <th className="px-3 py-2">Index</th>
                  <th className="px-3 py-2">Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {matches.map((m, i) => (
                  <tr key={i} className="text-gray-300">
                    <td className="px-3 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-brand-300">
                      {m.match}
                    </td>
                    <td className="px-3 py-2 text-gray-500">{m.index}</td>
                    <td className="px-3 py-2 font-mono text-xs text-gray-400">
                      {m.groups.length > 0 ? m.groups.join(", ") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Common Patterns */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-400">
          Common Patterns
        </h3>
        <div className="flex flex-wrap gap-2">
          {COMMON_PATTERNS.map((p) => (
            <button
              key={p.name}
              onClick={() => loadPattern(p)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-brand-500/50 hover:text-brand-300"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
