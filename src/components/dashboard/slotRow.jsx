import { Check } from "lucide-react";
import { getStatusBadge } from "./slotStatusBadge";

export default function SlotRow({ slot, today, pausingDate, pauseDaysLeft, onPause, onResume }) {
  const isToday = slot.delivery_date === today;
  const isFuture = slot.delivery_date > today;
  const isPaused = slot.status === "paused";
  const isDelivered = slot.status === "delivered";
  const canTogglePause = isFuture && !isDelivered;

  const accentColor = isDelivered
    ? "#2CD377"
    : isPaused
      ? "#F59E0B"
      : isToday
        ? "#2CD377"
        : "#CBD5D1";

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
        isDelivered
          ? "bg-emerald/5"
          : isPaused
            ? "bg-amber-50/70"
            : isToday
              ? "bg-emerald/5"
              : "bg-sage/20"
      }`}
      style={{
        borderLeft: `3px solid ${accentColor}`,
        boxShadow: isToday && !isDelivered ? "0 0 0 1px rgba(44,211,119,0.25)" : "none",
      }}
    >
      {/* Status icon */}
      <div className="shrink-0">
        {isDelivered ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(44,211,119,0.15)" }}>
            <Check size={13} style={{ color: "#2CD377" }} strokeWidth={3} />
          </div>
        ) : isPaused ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100">
            <span className="text-[13px] leading-none">⏸</span>
          </div>
        ) : isToday ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(44,211,119,0.15)" }}>
            <span className="block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald" />
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage/40">
            <span className="block h-2 w-2 rounded-full" style={{ background: "#CBD5D1" }} />
          </div>
        )}
      </div>

      {/* Bowl info */}
      <div className="min-w-0 flex-1">
        <p className={`truncate font-heading text-sm font-semibold ${isDelivered ? "text-forest/55" : "text-forest"}`}>
          {slot.product_name}
        </p>
        <p className="mt-0.5 text-xs text-text-muted">
          {new Date(slot.delivery_date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
          {" · "}
          {slot.delivery_slot}
          {slot.slottime && ` • ${slot.slottime}`}
        </p>
      </div>

      {/* Status badge */}
      <div className="shrink-0">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusBadge(slot.status).className}`}>
          {getStatusBadge(slot.status).text}
        </span>
      </div>

      {/* Pause / Resume */}
      {canTogglePause && (
        <div className="shrink-0">
          {isPaused ? (
            <button
              onClick={() => onResume(slot.delivery_date)}
              disabled={pausingDate === slot.delivery_date}
              className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-[11px] font-semibold text-emerald transition-all hover:bg-emerald/20 disabled:opacity-50"
            >
              {pausingDate === slot.delivery_date ? "…" : "Resume"}
            </button>
          ) : (
            <button
              onClick={() => onPause(slot.delivery_date)}
              disabled={pausingDate === slot.delivery_date || pauseDaysLeft <= 0}
              title={pauseDaysLeft <= 0 ? "No pause days left this cycle" : undefined}
              className="rounded-full border border-sage bg-white px-3 py-1 text-[11px] font-semibold text-text-muted transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pausingDate === slot.delivery_date ? "…" : "Pause"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
