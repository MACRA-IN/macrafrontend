import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import { calculatePrice, createSubscription } from "../../services/subscriptionService";

const SLOT_LABELS = { lunch: "Lunch only", dinner: "Dinner only", both: "Lunch + Dinner" };

const METHODS = [
  { id: "upi",        label: "UPI",                    sub: "GPay · PhonePe · Paytm",  emoji: "📱" },
  { id: "card",       label: "Credit / Debit Card",    sub: "Visa · Mastercard · RuPay", emoji: "💳" },
  { id: "netbanking", label: "Net Banking",             sub: "All major banks",           emoji: "🏦" },
];

export default function Step2Payment({ tier, plan, slotChoice, onSuccess }) {
  const [method, setMethod] = useState("upi");
  const [pricing, setPricing] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  const slotsPerDay = slotChoice === "both" ? 2 : 1;

  useEffect(() => {
    if (tier && plan) {
      calculatePrice(tier.id, plan.id, slotsPerDay).then((data) => setPricing(data));
    }
  }, [tier, plan, slotsPerDay]);

  const handlePay = async () => {
    setPaying(true);
    setError(null);
    try {
      const data = await createSubscription({
        category_id: tier.id,
        plan_id: plan.id,
        plan_price: pricing.total,
        slots: slotChoice === "both"
          ? [{ lunch: "12-2pm" }, { dinner: "6-8pm" }]
          : slotChoice === "lunch"
          ? [{ lunch: "12-2pm" }]
          : [{ dinner: "6-8pm" }],
      });
      onSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startStr = tomorrow.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  if (!pricing) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-14 animate-pulse rounded-2xl bg-sage/40" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Title */}
      <div>
        <h2 className="font-heading text-xl font-bold text-forest">Review & pay</h2>
        <p className="mt-1 text-sm text-text-muted">
          {tier?.name} · {SLOT_LABELS[slotChoice]} · starts {startStr}
        </p>
      </div>

      {/* Order summary */}
      <div className="rounded-2xl bg-sage/20 p-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Order Summary
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">
              {pricing.total_slots} bowls × ₹{pricing.bowl_price}
            </span>
            <span className="text-forest">₹{pricing.bowl_total}</span>
          </div>
          {pricing.delivery_total > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">
                Delivery ({pricing.total_slots} × ₹{pricing.delivery_charge})
              </span>
              <span className="text-forest">₹{pricing.delivery_total}</span>
            </div>
          )}
          {pricing.discount_amount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">
                Discount ({pricing.discount_percentage}%)
              </span>
              <span className="font-medium text-emerald">−₹{pricing.discount_amount}</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-sage pt-3">
          <span className="font-heading text-sm font-semibold text-forest">
            {plan?.name} · {tier?.name}
          </span>
          <span className="font-heading text-xl font-bold text-forest">₹{pricing.total}</span>
        </div>
      </div>

      {/* Start date note */}
      <div className="flex items-start gap-2 rounded-xl bg-sage/30 p-3">
        <span className="text-base">📅</span>
        <p className="text-xs text-text-muted">
          Subscription starts{" "}
          <strong className="text-forest">tomorrow ({startStr})</strong>.
          Plan your first week's meals on the dashboard after subscribing.
        </p>
      </div>

      {/* Payment method */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Payment Method
        </p>
        <div className="flex flex-col gap-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                method === m.id
                  ? "border-2 border-emerald bg-sage/30"
                  : "border-sage bg-white hover:border-emerald/40 hover:bg-sage/10"
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-forest">{m.label}</p>
                <p className="text-xs text-text-muted">{m.sub}</p>
              </div>
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  method === m.id
                    ? "border-emerald bg-emerald"
                    : "border-gray-300 bg-white"
                }`}
              >
                {method === m.id && (
                  <Check size={11} strokeWidth={3} className="text-white" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <button
        onClick={handlePay}
        disabled={paying}
        className="w-full rounded-full bg-emerald py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:opacity-60"
      >
        {paying ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing…
          </span>
        ) : (
          `Pay ₹${pricing.total} →`
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted">
        <Lock size={12} />
        <span>100% secure · refundable until first delivery</span>
      </div>

    </div>
  );
}
