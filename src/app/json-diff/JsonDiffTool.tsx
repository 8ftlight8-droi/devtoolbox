"use client";

import { useState } from "react";

interface DiffItem {
  path: string;
  type: "added" | "removed" | "changed";
  oldValue?: string;
  newValue?: string;
}

function deepDiff(obj1: unknown, obj2: unknown, path = ""): DiffItem[] {
  const diffs: DiffItem[] = [];

  if (typeof obj1 !== typeof obj2 || Array.isArray(obj1) !== Array.isArray(obj2)) {
    diffs.push({ path: path || "(root)", type: "changed", oldValue: JSON.stringify(obj1), newValue: JSON.stringify(obj2) });
    return diffs;
  }

  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      diffs.push({ path: path || "(root)", type: "changed", oldValue: JSON.stringify(obj1), newValue: JSON.stringify(obj2) });
    }
    return diffs;
  }

  const o1 = obj1 as Record<string, unknown>;
  const o2 = obj2 as Record<string, unknown>;
  const allKeys = Array.from(new Set(Object.keys(o1).concat(Object.keys(o2))));

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in o1)) {
      diffs.push({ path: currentPath, type: "added", newValue: JSON.stringify(o2[key]) });
    } else if (!(key in o2)) {
      diffs.push({ path: currentPath, type: "removed", oldValue: JSON.stringify(o1[key]) });
    } else {
      diffs.push(...deepDiff(o1[key], o2[key], currentPath));
    }
  }

  return diffs;
}

export function JsonDiffTool() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diffs, setDiffs] = useState<DiffItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = () => {
    if (!left.trim() || !right.trim()) {
      setError("Please paste JSON in both panels.");
      setDiffs(null);
      return;
    }
    try {
      const obj1 = JSON.parse(left);
      const obj2 = JSON.parse(right);
      const result = deepDiff(obj1, obj2);
      setDiffs(result);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(`Parse error: ${msg}`);
      setDiffs(null);
    }
  };

  const handleClear = () => { setLeft(""); setRight(""); setDiffs(null); setError(null); };

  const handleSample = () => {
    setLeft(JSON.stringify({ name: "DevToolBox", version: "1.0", tools: 7, config: { theme: "dark", ads: false } }, null, 2));
    setRight(JSON.stringify({ name: "DevToolBox", version: "2.0", tools: 11, config: { theme: "dark", ads: true }, newField: "hello" }, null, 2));
    setDiffs(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button onClick={handleCompare} className="btn-primary">Compare</button>
        <button onClick={handleSample} className="btn-secondary">Load Sample</button>
        <button onClick={handleClear} className="btn-secondary">Clear</button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">Original JSON</label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="textarea-field h-[300px]"
            placeholder='{"paste": "original JSON"}'
            spellCheck={false}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">Modified JSON</label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="textarea-field h-[300px]"
            placeholder='{"paste": "modified JSON"}'
            spellCheck={false}
          />
        </div>
      </div>

      {/* Results */}
      {diffs !== null && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-400">
            {diffs.length === 0 ? "No differences found" : `${diffs.length} difference${diffs.length > 1 ? "s" : ""} found`}
          </h3>
          {diffs.length === 0 ? (
            <div className="rounded-lg border border-green-800/50 bg-green-950/30 px-4 py-3 text-sm text-green-400">
              Objects are identical.
            </div>
          ) : (
            <div className="space-y-2">
              {diffs.map((d, i) => (
                <div
                  key={i}
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    d.type === "added" ? "border-green-800/50 bg-green-950/20 text-green-400" :
                    d.type === "removed" ? "border-red-800/50 bg-red-950/20 text-red-400" :
                    "border-yellow-800/50 bg-yellow-950/20 text-yellow-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded px-1.5 py-0.5 text-xs font-medium bg-gray-800">
                      {d.type === "added" ? "+ ADDED" : d.type === "removed" ? "- REMOVED" : "~ CHANGED"}
                    </span>
                    <span className="font-mono text-gray-300">{d.path}</span>
                  </div>
                  {d.type === "changed" && (
                    <div className="mt-1 text-xs">
                      <span className="text-red-400">{d.oldValue}</span>
                      <span className="text-gray-600"> → </span>
                      <span className="text-green-400">{d.newValue}</span>
                    </div>
                  )}
                  {d.type === "added" && <div className="mt-1 text-xs text-green-400">{d.newValue}</div>}
                  {d.type === "removed" && <div className="mt-1 text-xs text-red-400">{d.oldValue}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
