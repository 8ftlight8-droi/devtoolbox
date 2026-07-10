"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export function ColorConverterTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const updateFromHex = (value: string) => {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      const [r, g, b] = parsed;
      setRgb({ r, g, b });
      const [h, s, l] = rgbToHsl(r, g, b);
      setHsl({ h, s, l });
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    const [h, s, l] = rgbToHsl(r, g, b);
    setHsl({ h, s, l });
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const [r, g, b] = hslToRgb(h, s, l);
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
  };

  const hexStr = hex.startsWith("#") ? hex : `#${hex}`;
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex items-center gap-4">
        <div
          className="h-20 w-20 rounded-xl border border-gray-700"
          style={{ backgroundColor: hexStr }}
        />
        <div className="space-y-1 text-sm text-gray-400">
          <p><span className="text-gray-500">HEX:</span> <span className="text-white">{hexStr}</span></p>
          <p><span className="text-gray-500">RGB:</span> <span className="text-white">{rgbStr}</span></p>
          <p><span className="text-gray-500">HSL:</span> <span className="text-white">{hslStr}</span></p>
        </div>
      </div>

      {/* HEX Input */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="hex-input" className="text-sm font-medium text-gray-400">HEX</label>
          <CopyButton text={hexStr} />
        </div>
        <input
          id="hex-input"
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="input-field font-mono"
          placeholder="#3b82f6"
        />
      </div>

      {/* RGB Inputs */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-400">RGB</label>
          <CopyButton text={rgbStr} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="r-input" className="text-xs text-gray-600">R (0-255)</label>
            <input id="r-input" type="number" min={0} max={255} value={rgb.r}
              onChange={(e) => updateFromRgb(+e.target.value, rgb.g, rgb.b)}
              className="input-field font-mono" />
          </div>
          <div>
            <label htmlFor="g-input" className="text-xs text-gray-600">G (0-255)</label>
            <input id="g-input" type="number" min={0} max={255} value={rgb.g}
              onChange={(e) => updateFromRgb(rgb.r, +e.target.value, rgb.b)}
              className="input-field font-mono" />
          </div>
          <div>
            <label htmlFor="b-input" className="text-xs text-gray-600">B (0-255)</label>
            <input id="b-input" type="number" min={0} max={255} value={rgb.b}
              onChange={(e) => updateFromRgb(rgb.r, rgb.g, +e.target.value)}
              className="input-field font-mono" />
          </div>
        </div>
      </div>

      {/* HSL Inputs */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-400">HSL</label>
          <CopyButton text={hslStr} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="h-input" className="text-xs text-gray-600">H (0-360)</label>
            <input id="h-input" type="number" min={0} max={360} value={hsl.h}
              onChange={(e) => updateFromHsl(+e.target.value, hsl.s, hsl.l)}
              className="input-field font-mono" />
          </div>
          <div>
            <label htmlFor="s-input" className="text-xs text-gray-600">S (0-100%)</label>
            <input id="s-input" type="number" min={0} max={100} value={hsl.s}
              onChange={(e) => updateFromHsl(hsl.h, +e.target.value, hsl.l)}
              className="input-field font-mono" />
          </div>
          <div>
            <label htmlFor="l-input" className="text-xs text-gray-600">L (0-100%)</label>
            <input id="l-input" type="number" min={0} max={100} value={hsl.l}
              onChange={(e) => updateFromHsl(hsl.h, hsl.s, +e.target.value)}
              className="input-field font-mono" />
          </div>
        </div>
      </div>
    </div>
  );
}
