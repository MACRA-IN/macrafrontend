import { Calendar, Clock, Pause } from "lucide-react";
import StatCard from "./statCard";
import StatusBadge from "./statusBadge";
import RenewalBanner from "./renewalBanner";

export default function SubscriptionCard({ subscription, feedback, onPauseHint, onRenewed }) {
  const startDate = new Date(subscription.start_date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const now = new Date();
  const startD = new Date(subscription.start_date);
  const nextDeliveryLabel = now < startD ? startDate : "Tomorrow";

  const deliverySlots = subscription.delivery_slot || [];
  const firstSlot =
    Array.isArray(deliverySlots) && deliverySlots.length > 0
      ? Object.values(deliverySlots[0])[0]
      : "12–2 PM";

  const progressPct =
    subscription.total_delivery_days > 0
      ? ((subscription.total_delivery_days - subscription.remaining_delivery_days) /
          subscription.total_delivery_days) *
        100
      : 0;

  const isComplete = subscription.remaining_delivery_days === 0;
  const hasPauseDays = subscription.pause_days_left > 0;
  const daysUsed = subscription.total_delivery_days - subscription.remaining_delivery_days;

  return (
    <div
      className="relative overflow-hidden rounded-3xl text-white"
      style={{ background: "linear-gradient(150deg, #0F2B1D 0%, #091a0e 100%)" }}
    >
      {/* Decorative radial glow — top-right corner */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(44,211,119,0.18) 0%, transparent 70%)" }}
      />

      {/* Top accent bar */}
      <div
        className="h-0.75"
        style={{ background: "linear-gradient(90deg, #2CD377 0%, #16A85E 45%, transparent 100%)" }}
      />

      <div className="relative p-5 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald">
              {isComplete ? "Subscription complete" : "Active subscription"}
            </p>
            <h2 className="mt-1.5 truncate font-heading text-xl font-bold sm:text-2xl">
              {subscription.plan_name}
            </h2>
            <p className="mt-0.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {subscription.tier_name} tier
            </p>
            <p className="mt-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              ₹{parseFloat(subscription.plan_price).toFixed(0)} · started {startDate}
            </p>
          </div>
          <StatusBadge status={subscription.status} />
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="text-[10px] font-semibold uppercase tracking-wide"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Delivery progress
            </span>
            <span className="text-[11px] font-bold text-emerald">
              {isComplete ? "Complete ✓" : `${daysUsed} of ${subscription.total_delivery_days} days`}
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #2CD377, #16A85E)",
                boxShadow: progressPct > 0 ? "0 0 10px rgba(44,211,119,0.45)" : "none",
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatCard
            icon={Calendar}
            label="Days left"
            value={subscription.remaining_delivery_days}
            sub={`of ${subscription.total_delivery_days}`}
            highlight
          />
          <StatCard
            icon={Clock}
            label="Next delivery"
            value={isComplete ? "—" : nextDeliveryLabel}
            sub={isComplete ? "All done" : firstSlot}
          />
          <StatCard
            icon={Pause}
            label="Pause days"
            value={subscription.pause_days_left}
            sub={hasPauseDays ? "available" : "used up"}
            highlight={hasPauseDays}
          />
        </div>

        {/* Pause action */}
        {!isComplete && (
          <div className="mt-4">
            <button
              onClick={onPauseHint}
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-heading text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "rgba(44,211,119,0.1)",
                color: "#2CD377",
                border: "1px solid rgba(44,211,119,0.2)",
              }}
            >
              <Pause size={13} /> Pause a delivery
            </button>
          </div>
        )}

        <RenewalBanner subscription={subscription} onRenewed={onRenewed} />
      </div>

      {feedback && (
        <div className="border-t border-white/10 bg-emerald/10 px-5 py-2.5 text-center text-sm font-medium text-emerald">
          {feedback}
        </div>
      )}
    </div>
  );
}
