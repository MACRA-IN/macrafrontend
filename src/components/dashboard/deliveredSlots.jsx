import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { pauseSubscription, resumeSubscription } from "../../services/subscriptionService";

export default function DeliveredSlots({ subscription }) {
  const [slots, setSlots] = useState(subscription.slots);
  const [pausingDate, setPausingDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSlots(subscription.slots);
  }, [subscription.slots]);

  const delivered = slots.filter((s) => s.status === "delivered").length;

  // Local date string to avoid UTC-offset "today" mismatch for IST users
  const nd = new Date();
  const today = `${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, "0")}-${String(nd.getDate()).padStart(2, "0")}`;

  const pauseDaysLeft = subscription.pause_days_left ?? 0;
  const allDelivered = slots.length > 0 && delivered === slots.length;

  const handlePause = async (date) => {
    if (pauseDaysLeft <= 0) {
      setError("No pause days left this cycle.");
      return;
    }
    setPausingDate(date);
    setError(null);
    try {
      await pauseSubscription(subscription.subscription_id, [date]);
      setSlots(slots.map((s) => (s.delivery_date === date ? { ...s, status: "paused" } : s)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to pause this day.");
    } finally {
      setPausingDate(null);
    }
  };

  const handleResume = async (date) => {
    setPausingDate(date);
    setError(null);
    try {
      await resumeSubscription(subscription.subscription_id, [date]);
      setSlots(slots.map((s) => (s.delivery_date === date ? { ...s, status: "pending" } : s)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resume this day.");
    } finally {
      setPausingDate(null);
    }
  };

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-forest">This week's bowls</h2>
          <p className="mt-0.5 text-xs text-text-muted">Track and manage your deliveries</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-sage/50">
            <div
              className="h-full rounded-full bg-emerald transition-all duration-700"
              style={{ width: slots.length > 0 ? `${(delivered / slots.length) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-xs font-bold text-forest">{delivered}/{slots.length}</span>
        </div>
      </div>

      {allDelivered && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald/25 px-4 py-3" style={{ background: "rgba(44,211,119,0.06)" }}>
          <span className="text-xl">🎉</span>
          <div>
            <p className="font-heading text-sm font-bold text-emerald-dark">All bowls delivered!</p>
            <p className="text-xs text-text-muted">Nice work staying consistent this cycle.</p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-3 flex flex-col gap-2">
        {slots.map((slot, i) => {
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
              key={i}
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
                <div className="flex items-center gap-1.5">
                  <p className={`truncate font-heading text-sm font-semibold ${isDelivered ? "text-forest/55" : "text-forest"}`}>
                    {slot.product_name}
                  </p>
                  {isToday && !isDelivered && (
                    <span className="shrink-0 rounded-full bg-emerald px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                      Today
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-text-muted">
                  {new Date(slot.delivery_date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                  {" · "}{slot.slot}
                </p>
              </div>

              {/* Pause / Resume action */}
              {canTogglePause && (
                <div className="shrink-0">
                  {isPaused ? (
                    <button
                      onClick={() => handleResume(slot.delivery_date)}
                      disabled={pausingDate === slot.delivery_date}
                      className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-[11px] font-semibold text-emerald transition-all hover:bg-emerald/20 disabled:opacity-50"
                    >
                      {pausingDate === slot.delivery_date ? "…" : "Resume"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePause(slot.delivery_date)}
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
        })}
      </div>
    </div>
  );
}
