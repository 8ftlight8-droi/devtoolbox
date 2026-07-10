"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean | null;
  expiresAt: string | null;
  issuedAt: string | null;
}

function decodeBase64Url(str: string): string {
  // Add padding
  let padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  if (pad) padded += "=".repeat(4 - pad);
  return atob(padded);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (value?: string) => {
    const token = (value ?? input).trim();
    if (!token) {
      setError("Please paste a JWT token to decode.");
      setDecoded(null);
      return;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format. A JWT should have 3 parts separated by dots (header.payload.signature).");
      setDecoded(null);
      return;
    }

    try {
      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));
      const signature = parts[2];

      let isExpired: boolean | null = null;
      let expiresAt: string | null = null;
      let issuedAt: string | null = null;

      if (typeof payload.exp === "number") {
        isExpired = Date.now() / 1000 > payload.exp;
        expiresAt = formatDate(payload.exp);
      }

      if (typeof payload.iat === "number") {
        issuedAt = formatDate(payload.iat);
      }

      setDecoded({ header, payload, signature, isExpired, expiresAt, issuedAt });
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to decode";
      setError(`Invalid JWT: ${msg}`);
      setDecoded(null);
    }
  };

  const handleInput = (value: string) => {
    setInput(value);
    if (value.trim() && value.includes(".")) {
      handleDecode(value);
    } else {
      setDecoded(null);
      setError(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setDecoded(null);
    setError(null);
  };

  const handleSample = () => {
    // A sample JWT with a past expiry
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=/g, "");
    const payload = btoa(
      JSON.stringify({
        sub: "1234567890",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        iat: Math.floor(Date.now() / 1000) - 3600,
        exp: Math.floor(Date.now() / 1000) + 3600,
      })
    ).replace(/=/g, "");
    const sampleToken = `${header}.${payload}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    handleInput(sampleToken);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label htmlFor="jwt-input" className="mb-1 block text-sm font-medium text-gray-400">
          Paste JWT Token
        </label>
        <textarea
          id="jwt-input"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0..."
          className="textarea-field h-[120px]"
          spellCheck={false}
        />
        <div className="mt-2 flex gap-2">
          <button onClick={() => handleDecode()} className="btn-primary">
            Decode
          </button>
          <button onClick={handleSample} className="btn-secondary">
            Load Sample
          </button>
          <button onClick={handleClear} className="btn-secondary">
            Clear
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Decoded Result */}
      {decoded && (
        <div className="space-y-4">
          {/* Expiry Status */}
          {decoded.isExpired !== null && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                decoded.isExpired
                  ? "border-red-800/50 bg-red-950/30 text-red-400"
                  : "border-green-800/50 bg-green-950/30 text-green-400"
              }`}
            >
              {decoded.isExpired ? "⚠ Token is EXPIRED" : "✓ Token is valid (not expired)"}
              {decoded.expiresAt && <span className="ml-2 text-gray-500">— Expires: {decoded.expiresAt}</span>}
            </div>
          )}

          {/* Time info */}
          {(decoded.issuedAt || decoded.expiresAt) && (
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              {decoded.issuedAt && <span>Issued: {decoded.issuedAt}</span>}
              {decoded.expiresAt && <span>Expires: {decoded.expiresAt}</span>}
            </div>
          )}

          {/* Header */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">Header (JOSE)</h3>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <pre className="rounded-lg border border-gray-700 bg-gray-800 p-4 font-mono text-sm text-red-300 overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">Payload (Claims)</h3>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <pre className="rounded-lg border border-gray-700 bg-gray-800 p-4 font-mono text-sm text-purple-300 overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Signature */}
          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-400">Signature</h3>
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 font-mono text-sm text-cyan-300 break-all">
              {decoded.signature}
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Note: Signature verification requires the secret/public key and is not performed client-side.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
