import { useNavigate } from "react-router-dom";
import { AlertTriangle, Clock } from "lucide-react";
import RenewButton from "./renewButton";

/* Surfaces the right renewal message for every lifecycle stage:
   - trial ending tomorrow / already ended -> push to plan picker, not a trial "renewal"
   - paid plan ending tomorrow / already ended -> same-plan renewal via Razorpay */
export default function RenewalBanner({ subscription, onRenewed }) {
  const navigate = useNavigate();
  if (!subscription) return null;

  const pad = (n) => String(n).padStart(2, "0");
  const localDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayStr = localDateStr(new Date());
  const tomorrowStr = localDateStr(new Date(Date.now() + 86400000));

  const isExpired = subscription.end_date < todayStr;
  const isExpiringTomorrow = !isExpired && subscription.end_date <= tomorrowStr;

  if (!isExpired && !isExpiringTomorrow) return null;

  const isTrial = (subscription.plan_name || "").toLowerCase().includes("trial");

  const tone = isExpired
    ? { Icon: AlertTriangle, bg: "rgba(239,68,68,0.12)", border: "rgba(248,113,113,0.35)", text: "#FCA5A5" }
    : { Icon: Clock, bg: "rgba(245,158,11,0.12)", border: "rgba(252,211,77,0.35)", text: "#FCD34D" };

  const message = isTrial
    ? isExpired
      ? "Your free trial has ended. Choose a plan to keep fresh bowls coming."
      : "Your trial ends tomorrow. Pick a plan to keep your streak alive."
    : isExpired
      ? "Your subscription has ended. Renew now to resume deliveries."
      : "Your subscription ends tomorrow. Renew now to avoid any interruption.";

  return (
    <div className="mt-3 rounded-2xl border px-4 py-3.5" style={{ background: tone.bg, borderColor: tone.border }}>
      <div className="flex items-start gap-2.5">
        <tone.Icon size={16} style={{ color: tone.text }} className="mt-0.5 shrink-0" />
        <p className="text-xs leading-relaxed" style={{ color: tone.text }}>
          {message}
        </p>
      </div>
      <div className="mt-3">
        {isTrial ? (
          <button
            onClick={() => navigate("/subscribe")}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-[0.98]"
          >
            Choose a plan →
          </button>
        ) : (
          <RenewButton
            planId={subscription.plan_id}
            planLabel={subscription.plan_name}
            onSuccess={onRenewed}
          />
        )}
      </div>
    </div>
  );
}
