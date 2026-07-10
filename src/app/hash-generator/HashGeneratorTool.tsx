"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

interface HashResults {
  md5: string;
  "sha-1": string;
  "sha-256": string;
  "sha-512": string;
}

// MD5 implementation (Web Crypto doesn't support MD5)
function md5(input: string): string {
  // Simple MD5 implementation for client-side use
  function rotateLeft(val: number, shift: number) {
    return (val << shift) | (val >>> (32 - shift));
  }

  function addUnsigned(x: number, y: number) {
    const result = (x & 0x7fffffff) + (y & 0x7fffffff);
    if (x & 0x80000000 && y & 0x80000000) return result ^ 0x80000000 ^ 0x80000000;
    if (x & 0x80000000 || y & 0x80000000) {
      if (result & 0x80000000) return result ^ 0x80000000;
      return result | 0x80000000;
    }
    return result;
  }

  function f(x: number, y: number, z: number) { return (x & y) | (~x & z); }
  function g(x: number, y: number, z: number) { return (x & z) | (y & ~z); }
  function h(x: number, y: number, z: number) { return x ^ y ^ z; }
  function ii(x: number, y: number, z: number) { return y ^ (x | ~z); }

  function transform(func: (x: number, y: number, z: number) => number, a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(func(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function wordToHex(val: number) {
    let result = "";
    for (let i = 0; i <= 3; i++) {
      result += ("0" + ((val >>> (i * 8)) & 255).toString(16)).slice(-2);
    }
    return result;
  }

  // Convert to word array
  const msgLen = input.length;
  const wordsNeeded = ((((msgLen + 8) >>> 6) + 1) << 4);
  const words = new Array(wordsNeeded).fill(0);

  for (let i = 0; i < msgLen; i++) {
    words[i >>> 2] |= input.charCodeAt(i) << ((i % 4) * 8);
  }
  words[msgLen >>> 2] |= 0x80 << ((msgLen % 4) * 8);
  words[wordsNeeded - 2] = msgLen * 8;

  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

  const S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  const T = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000));
  const K = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12,
    5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2,
    0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9
  ];
  const funcs = [f, g, h, ii];

  for (let blockStart = 0; blockStart < wordsNeeded; blockStart += 16) {
    let aa = a, bb = b, cc = c, dd = d;

    for (let i = 0; i < 64; i++) {
      const round = Math.floor(i / 16);
      const sIdx = round * 4 + (i % 4);
      const result = transform(funcs[round], a, b, c, d, words[blockStart + K[i]], S[sIdx], T[i]);
      a = d; d = c; c = b; b = result;
    }

    a = addUnsigned(a, aa);
    b = addUnsigned(b, bb);
    c = addUnsigned(c, cc);
    d = addUnsigned(d, dd);
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
}

async function hashWithCrypto(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<HashResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const [sha1, sha256, sha512] = await Promise.all([
        hashWithCrypto(input, "SHA-1"),
        hashWithCrypto(input, "SHA-256"),
        hashWithCrypto(input, "SHA-512"),
      ]);

      setResults({
        md5: md5(input),
        "sha-1": sha1,
        "sha-256": sha256,
        "sha-512": sha512,
      });
    } catch {
      setResults(null);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setInput("");
    setResults(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="hash-input" className="mb-1 block text-sm font-medium text-gray-400">
          Input Text
        </label>
        <textarea
          id="hash-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="textarea-field h-[150px]"
          spellCheck={false}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={handleGenerate} className="btn-primary" disabled={loading}>
          {loading ? "Generating..." : "Generate Hashes"}
        </button>
        <button onClick={handleClear} className="btn-secondary">Clear</button>
      </div>

      {results && (
        <div className="space-y-3">
          {(Object.entries(results) as [string, string][]).map(([algo, hash]) => (
            <div key={algo} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium uppercase text-gray-500">{algo}</span>
                <CopyButton text={hash} />
              </div>
              <code className="block break-all font-mono text-sm text-gray-300">{hash}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
