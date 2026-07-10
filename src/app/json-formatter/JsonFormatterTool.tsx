"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type IndentType = "2" | "4" | "tab";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<IndentType>("2");

  const getIndent = (): string | number => {
    if (indent === "tab") return "\t";
    return parseInt(indent);
  };

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please paste some JSON to format.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, getIndent());
      setOutput(formatted);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setError("Please paste some JSON to minify.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      setError("Please paste some JSON to validate.");
      setOutput("");
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      setOutput("✓ Valid JSON");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleSample = () => {
    const sample = JSON.stringify(
      {
        name: "DevToolBox",
        version: "1.0.0",
        tools: ["json-formatter", "regex-tester", "base64", "jwt-decoder"],
        config: { theme: "dark", indent: 2 },
      },
      null,
      2
    );
    setInput(sample);
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={handleFormat} className="btn-primary">
          Format
        </button>
        <button onClick={handleMinify} className="btn-secondary">
          Minify
        </button>
        <button onClick={handleValidate} className="btn-secondary">
          Validate
        </button>
        <button onClick={handleClear} className="btn-secondary">
          Clear
        </button>
        <button onClick={handleSample} className="btn-secondary text-xs">
          Load Sample
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="indent-select" className="text-xs text-gray-500">
            Indent:
          </label>
          <select
            id="indent-select"
            value={indent}
            onChange={(e) => setIndent(e.target.value as IndentType)}
            className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-300"
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tabs</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="json-input"
            className="mb-1 block text-sm font-medium text-gray-400"
          >
            Input JSON
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"paste": "your JSON here"}'
            className="textarea-field h-[400px]"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label
              htmlFor="json-output"
              className="text-sm font-medium text-gray-400"
            >
              Output
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="Formatted result will appear here..."
            className="textarea-field h-[400px] bg-gray-850"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
