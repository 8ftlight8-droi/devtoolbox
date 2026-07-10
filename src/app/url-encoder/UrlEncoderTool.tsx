"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Mode = "encode" | "decode";
type EncodeType = "component" | "uri";

export function UrlEncoderTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeType, setEncodeType] = useState<EncodeType>("component");
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
        const encoded =
          encodeType === "component"
            ? encodeURIComponent(input)
            : encodeURI(input);
        setOutput(encoded);
      } else {
        const decoded =
          encodeType === "component"
            ? decodeURIComponent(input)
            : decodeURI(input);
        setOutput(decoded);
      }
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : `Failed to ${mode}`;
      setError(msg);
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
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => { setMode("encode"); setOutput(""); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "encode" ? "bg-brand-600 text-white" : "bg-gray-800 text-gray-400 hover:text-gray-200"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode("decode"); setOutput(""); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "decode" ? "bg-brand-600 text-white" : "bg-gray-800 text-gray-400 hover:text-gray-200"
          }`}
        >
          Decode
        </button>

        <span className="ml-4 text-xs text-gray-500">Type:</span>
        <button
          onClick={() => setEncodeType("component")}
          className={`rounded px-2 py-1 text-xs transition-colors ${
            encodeType === "component"
              ? "bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/50"
              : "bg-gray-800 text-gray-500 hover:text-gray-300"
          }`}
          title="encodeURIComponent — encodes everything except A-Z a-z 0-9 - _ . ~ "
        >
          Component
        </button>
        <button
          onClick={() => setEncodeType("uri")}
          className={`rounded px-2 py-1 text-xs transition-colors ${
            encodeType === "uri"
              ? "bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/50"
              : "bg-gray-800 text-gray-500 hover:text-gray-300"
          }`}
          title="encodeURI — preserves URL structure chars like : / ? # @ "
        >
          Full URI
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={handleConvert} className="btn-primary">
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        <button onClick={handleSwap} className="btn-secondary">Swap</button>
        <button onClick={handleClear} className="btn-secondary">Clear</button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="url-input" className="mb-1 block text-sm font-medium text-gray-400">
            {mode === "encode" ? "Plain Text / URL" : "Encoded String"}
          </label>
          <textarea
            id="url-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "hello world & more" : "hello%20world%20%26%20more"}
            className="textarea-field h-[250px]"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="url-output" className="text-sm font-medium text-gray-400">
              {mode === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            id="url-output"
            value={output}
            readOnly
            placeholder="Result..."
            className="textarea-field h-[250px]"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
