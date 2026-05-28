"use client";
import { useState } from "react";
import { SERVICE_ICON_OPTIONS } from "@/lib/data/services";
import ServiceIcon from "@/components/icons/ServiceIcon";

interface IconPickerProps {
  name: string;
  defaultValue?: string;
  error?: string;
}

export default function IconPicker({
  name,
  defaultValue = "",
  error,
}: IconPickerProps) {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-white/80">
        Icon{" "}
        <span className="ml-1 text-cyan" aria-hidden>
          *
        </span>
      </span>

      <input type="hidden" name={name} value={selected} />

      <div className="grid grid-cols-4 gap-1.5">
        {SERVICE_ICON_OPTIONS.map((icon) => {
          const active = selected === icon;
          return (
            <button
              key={icon}
              type="button"
              title={icon}
              onClick={() => setSelected(icon)}
              className={`cursor-pointer flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 transition-all ${
                active
                  ? "border-cyan/50 bg-cyan/10 text-cyan"
                  : "border-white/8 bg-white/3 text-muted hover:border-white/20 hover:text-white"
              }`}
            >
              <ServiceIcon name={icon} size={18} strokeWidth={1.6} />
              <span className="text-[9px] font-mono leading-none">{icon}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
