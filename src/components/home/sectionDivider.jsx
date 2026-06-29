export default function SectionDivider({ from, to }) {
  const W = 1440;
  const H = 48;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const n = isMobile ? 5 : 12;
  const step = W / n;

  let d = `M0,${H}`;
  for (let i = 0; i < n; i++) {
    d += ` Q${(i + 0.5) * step},0 ${(i + 1) * step},${H}`;
  }
  d += ` L${W},${H} L0,${H} Z`;

  return (
    <div style={{ background: from, lineHeight: 0, display: "block" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block", width: "100%", height: "clamp(24px, 4vw, 48px)" }}
      >
        <path d={d} fill={to} />
      </svg>
    </div>
  );
}