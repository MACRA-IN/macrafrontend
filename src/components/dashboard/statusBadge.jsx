const STATUS_STYLES = {
  active: { label: "Active", cls: "border-emerald/30 bg-emerald/15 text-emerald" },
  trialing: { label: "Trial", cls: "border-emerald/30 bg-emerald/15 text-emerald" },
  paused: { label: "Paused", cls: "border-amber-300/40 bg-amber-400/15 text-amber-300" },
  expired: { label: "Expired", cls: "border-red-400/40 bg-red-500/15 text-red-300" },
  cancelled: { label: "Cancelled", cls: "border-white/20 bg-white/10 text-white/60" },
};

export default function StatusBadge({ status }) {
  const key = (status || "").toLowerCase();
  const { label, cls } = STATUS_STYLES[key] || {
    label: status || "Unknown",
    cls: "border-white/20 bg-white/10 text-white/60",
  };
  return (
    <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}
