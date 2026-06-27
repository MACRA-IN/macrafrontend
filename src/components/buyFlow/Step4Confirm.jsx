import { useNavigate } from "react-router-dom";
import { Check, Calendar, Timer, Utensils } from "lucide-react";

export default function Step4Confirm({ tier, plan, orderData }) {
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
  const startStr = tomorrow.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col items-center text-center">

      {/* Success icon */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-full bg-emerald/20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald">
          <Check size={30} strokeWidth={3} className="text-white" />
        </div>
      </div>

      <h2 className="mt-5 font-heading text-2xl font-bold text-forest">You're subscribed!</h2>
      <p className="mt-2 text-sm text-text-muted">
        Your {plan?.name} plan is active. First delivery on {startStr}.
      </p>

      {/* Summary card */}
      <div className="mt-6 w-full rounded-2xl bg-sage/20 p-5 text-left">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage">
              <Utensils size={16} className="text-forest" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Tier</p>
              <p className="font-heading text-sm font-semibold text-forest">{tier?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage">
              <Calendar size={16} className="text-forest" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Plan</p>
              <p className="font-heading text-sm font-semibold text-forest">
                {plan?.name} · {plan?.duration_days} days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage">
              <Timer size={16} className="text-forest" />
            </div>
            <div>
              <p className="text-xs text-text-muted">First delivery</p>
              <p className="font-heading text-sm font-semibold text-forest">{startStr}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next step nudge */}
      <div className="mt-4 flex w-full items-start gap-2 rounded-xl bg-sage/30 p-3 text-left">
        <span>📋</span>
        <p className="text-xs text-text-muted">
          <strong className="text-forest">Before first delivery:</strong> go to your dashboard
          to choose which bowls you want each day.
        </p>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 w-full rounded-full bg-emerald py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark"
      >
        Plan my bowls →
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-2 text-sm text-text-muted transition-colors hover:text-forest"
      >
        Back to home
      </button>

    </div>
  );
}
