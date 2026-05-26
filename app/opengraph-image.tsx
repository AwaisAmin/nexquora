import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERVICES = [
  "AI & Automation",
  "Web & Mobile",
  "DevOps",
  "Fintech",
  "Bookkeeping",
  "UI/UX",
];

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#050810",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 72px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* Cyan glow top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Purple glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Top: Logo */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(0,229,255,0.12)",
            border: "1px solid rgba(0,229,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              background: "linear-gradient(135deg, #00e5ff, #6366f1)",
              display: "flex",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          Nexquora
          <span style={{ color: "#00e5ff" }}>·</span>
        </span>
      </div>

      {/* Center: Headline */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 1 }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Build What&apos;s{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00e5ff, #6366f1)",
              backgroundClip: "text",
              color: "transparent",
              marginLeft: 18,
            }}
          >
            Next
          </span>
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 640,
            display: "flex",
          }}
        >
          From AI automation to fintech platforms — engineering digital products
          that scale, perform, and last.
        </div>
      </div>

      {/* Bottom: Service chips + URL */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {SERVICES.map((s) => (
            <div
              key={s}
              style={{
                padding: "6px 16px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                fontWeight: 500,
                display: "flex",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
            nexquora.com
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: 100,
              padding: "6px 18px",
            }}
          >
            <span style={{ color: "#00e5ff", fontSize: 13, fontWeight: 600 }}>
              Start a project →
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #00e5ff, #6366f1, transparent)",
          display: "flex",
        }}
      />
    </div>,
    { ...size },
  );
}
