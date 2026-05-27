export default function Loader() {
  return (
    <>
      {/* Indeterminate progress bar — sweeps left to right, loops until page loads */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: 2,
          zIndex: 9999,
          overflow: "hidden",
          background: "rgba(0,245,255,0.06)",
        }}
        role="status"
        aria-label="Loading"
      >
        <div
          style={{
            width: "30%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, #00F5FF, #6366f1, transparent)",
            boxShadow: "0 0 8px rgba(0,245,255,0.6)",
            animation: "progress-sweep 1.4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Dark page fill */}
      <div style={{ minHeight: "100vh", background: "#050810" }} />
    </>
  );
}
