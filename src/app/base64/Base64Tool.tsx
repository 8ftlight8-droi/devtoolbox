"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Mode = "encode" | "decode";

export function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    if (!input.trim()) {
      setError(`Please enter text to ${mode}.`);
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        // Handle UTF-8 properly
        const encoded = btoa(
          encodeURIComponent(input).replace(
            /%([0-9A-F]{2})/g,
            (_, p1) => String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(encoded);
      } else {
        // Decode Base64 with UTF-8 support
        const decoded = decodeURIComponent(
          Array.from(atob(input))
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        setOutput(decoded);
      }
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : `Failed to ${mode}`;
      setError(`Invalid input: ${msg}`);
      setOutput("");
    }
  };

  const handleSwap = () => {
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput("");
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setMode("encode"); setOutput(""); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "encode"
              ? "bg-brand-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-gray-200"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode("decode"); setOutput(""); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "decode"
              ? "bg-brand-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-gray-200"
          }`}
        >
          Decode
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleConvert} className="btn-primary">
          {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
        </button>
        <button onClick={handleSwap} className="btn-secondary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Swap
        </button>
        <button onClick={handleClear} className="btn-secondary">
          Clear
        </button>
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
          <label htmlFor="base64-input" className="mb-1 block text-sm font-medium text-gray-400">
            {mode === "encode" ? "Plain Text" : "Base64 String"}
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Enter Base64 string to decode..."
            }
            className="textarea-field h-[300px]"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="base64-output" className="text-sm font-medium text-gray-400">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            id="base64-output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="textarea-field h-[300px]"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Stats */}
      {output && (
        <div className="flex gap-6 text-xs text-gray-500">
          <span>Input: {input.length} chars</span>
          <span>Output: {output.length} chars</span>
          {mode === "encode" && (
            <span>
              Size increase: {((output.length / input.length - 1) * 100).toFixed(0)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
