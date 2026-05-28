"use client";
import { useState } from "react";

interface ColorPickerProps {
  name: string;
  defaultValue?: string;
  error?: string;
}

const PRESETS = [
  "#00F5FF",
  "#3B82F6",
  "#7C3AED",
  "#10B981",
  "#FFB800",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
  "#84CC16",
];

function isValidHex(val: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(val);
}

export default function ColorPicker({
  name,
  defaultValue = "#00F5FF",
  error,
}: ColorPickerProps) {
  const [hex, setHex] = useState(defaultValue || "#00F5FF");

  const safeHex = isValidHex(hex) ? hex : "#000000";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-white/80">
        Accent Color{" "}
        <span className="ml-1 text-cyan" aria-hidden>
          *
        </span>
      </span>

      <input type="hidden" name={name} value={hex} />

      {/* Swatch + text input row */}
      <div className="flex items-center gap-2">
        <label className="relative cursor-pointer">
          <input
            type="color"
            value={safeHex}
            onChange={(e) => setHex(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div
            className="h-10 w-10 rounded-lg border-2 border-white/20 shadow-inner transition-transform hover:scale-105"
            style={{ backgroundColor: safeHex }}
          />
        </label>

        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="#00F5FF"
          spellCheck={false}
          className="h-10 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 font-mono text-sm text-white placeholder-white/30 hover:border-white/20 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20"
        />
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            title={preset}
            onClick={() => setHex(preset)}
            className={`h-6 w-6 cursor-pointer rounded-md border-2 transition-transform hover:scale-110 ${
              hex === preset ? "border-white/60 scale-110" : "border-white/10"
            }`}
            style={{ backgroundColor: preset }}
          />
        ))}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
