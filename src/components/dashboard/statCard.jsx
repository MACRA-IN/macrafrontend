export default function StatCard({ icon: Icon, label, value, sub, highlight }) {
  return (
    <div
      className="rounded-2xl p-3.5"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <Icon size={11} style={{ color: highlight ? "#2CD377" : "rgba(255,255,255,0.32)" }} />
        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.32)" }}>
          {label}
        </p>
      </div>
      <p className={`mt-1.5 font-heading text-2xl font-bold leading-none ${highlight ? "text-emerald" : "text-white"}`}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px]" style={{ color: "rgba(255,255,255,0.32)" }}>
        {sub}
      </p>
    </div>
  );
}
