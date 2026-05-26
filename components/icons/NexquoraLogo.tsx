import { useId } from "react";

interface NexquoraLogoProps {
  iconSize?: number;
  showText?: boolean;
  className?: string;
}

export default function NexquoraLogo({
  iconSize = 36,
  showText = true,
  className,
}: NexquoraLogoProps) {
  const id = useId();
  const gradientId = `nq-g-${id}`;

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <rect
          width="44"
          height="44"
          rx="12"
          fill="rgba(0,229,255,0.12)"
          stroke="rgba(0,229,255,0.25)"
          strokeWidth="1"
        />
        <rect x="11" y="11" width="22" height="22" rx="4" fill={`url(#${gradientId})`} />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          Nexquora
          <span style={{ color: "#00e5ff" }} aria-hidden>
            ·
          </span>
        </span>
      )}
    </span>
  );
}