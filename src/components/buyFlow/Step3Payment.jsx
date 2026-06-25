import { useEffect, useState } from "react";
import { Lock, ShieldCheck, RotateCcw, Zap } from "lucide-react";
import { calculatePrice } from "../../services/subscriptionService";
import { createPaymentOrder, verifyPayment } from "../../services/paymentServices";

const SLOT_LABELS = {
  lunch: "Lunch only",
  dinner: "Dinner only",
  both: "Lunch + Dinner",
};
const SLOT_TIMES = {
  lunch: "12 – 2 PM",
  dinner: "6 – 8 PM",
  both: "12–2 PM · 6–8 PM",
};
const PLAN_DAYS = { Trial: "4 days", Weekly: "7 days", Monthly: "30 days" };

function SummaryRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-text-muted">{label}</span>
      <span className={`text-sm font-medium ${accent ? "text-emerald" : "text-forest"}`}>
        {value}
      </span>
    </div>
  );
}

export default function Step3Payment({ tier, plan, slotChoice, onSuccess }) {
  const [pricing, setPricing] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  const slotsPerDay = slotChoice === "both" ? 2 : 1;

  useEffect(() => {
    if (tier && plan) {
      calculatePrice(tier.id, plan.id, slotsPerDay).then(setPricing);
    }
  }, [tier, plan, slotsPerDay]);

  const handlePay = async () => {
    setPaying(true);
    setError(null);
    try {
      const slots =
        slotChoice === "both"
          ? [{ lunch: "12-2pm" }, { dinner: "6-8pm" }]
          : slotChoice === "lunch"
          ? [{ lunch: "12-2pm" }]
          : [{ dinner: "6-8pm" }];

      const order = await createPaymentOrder({
        category_id: tier.id,
        plan_id: plan.id,
        slots,
      });

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Macra",
        description: `${plan.name} · ${tier.name}`,
        order_id: order.order_id,
        handler: async (response) => {
          try {
            await verifyPayment({
              subscription_id: order.subscription_id,
              gateway_order_id: response.razorpay_order_id,
              gateway_payment_id: response.razorpay_payment_id,
              gateway_signature: response.razorpay_signature,
            });
            onSuccess(order);
          } catch (err) {
            setError(err.response?.data?.message || "Payment verification failed. Contact support.");
          } finally {
            setPaying(false);
          }
        },
        modal: { ondismiss: () => setPaying(false) },
        theme: { color: "#2CD377" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (res) => {
        setError(res.error.description || "Payment failed. Please try again.");
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create order. Please try again.");
      setPaying(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startStr = tomorrow.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  if (!pricing) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-7 w-40 animate-pulse rounded-lg bg-sage/50" />
        <div className="h-52 animate-pulse rounded-2xl bg-sage/40" />
        <div className="h-28 animate-pulse rounded-2xl bg-sage/30" />
        <div className="h-14 animate-pulse rounded-full bg-sage/40" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-bold text-forest">Almost there</h2>
        <p className="mt-1 text-sm text-text-muted">Review your order and complete payment.</p>
      </div>

      {/* Plan card */}
      <div className="overflow-hidden rounded-2xl border border-sage bg-white shadow-sm">
        {/* Green accent line */}
        <div className="h-1" style={{ background: "linear-gradient(90deg, #2CD377, #16A85E)" }} />

        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-heading text-base font-bold text-forest">{tier?.name}</p>
              <p className="text-sm text-text-muted">{plan?.name} plan · {PLAN_DAYS[plan?.name]}</p>
            </div>
            <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
              {pricing.total_slots} bowls
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Meals</p>
              <p className="mt-0.5 text-sm font-medium text-forest">{SLOT_LABELS[slotChoice]}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Delivery</p>
              <p className="mt-0.5 text-sm font-medium text-forest">{SLOT_TIMES[slotChoice]}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">First delivery</p>
              <p className="mt-0.5 text-sm font-medium text-forest">{startStr}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Days per week</p>
              <p className="mt-0.5 text-sm font-medium text-forest">Mon – Sat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="rounded-2xl bg-sage/20 px-5 py-1">
        <SummaryRow
          label={`${pricing.total_slots} bowls × ₹${pricing.bowl_price}`}
          value={`₹${pricing.bowl_total}`}
        />
        {pricing.delivery_total > 0 && (
          <SummaryRow
            label={`Delivery (${pricing.total_slots} × ₹${pricing.delivery_charge})`}
            value={`₹${pricing.delivery_total}`}
          />
        )}
        {pricing.discount_amount > 0 && (
          <SummaryRow
            label={`Discount (${pricing.discount_percentage}% off)`}
            value={`−₹${pricing.discount_amount}`}
            accent
          />
        )}
        <div
          className="mt-1 flex items-center justify-between border-t border-sage py-3"
        >
          <span className="font-heading text-sm font-semibold text-forest">Total due today</span>
          <span className="font-heading text-2xl font-bold text-forest">₹{pricing.total}</span>
        </div>
      </div>

      {/* Trust pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[
          { icon: ShieldCheck, label: "Secure payment" },
          { icon: RotateCcw,   label: "Refundable" },
          { icon: Zap,         label: "Instant activation" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-sage bg-white px-3 py-1.5 text-xs font-medium text-text-muted"
          >
            <Icon size={11} className="text-emerald" />
            {label}
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={paying}
        className="relative w-full overflow-hidden rounded-full py-4 font-heading text-base font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #2CD377 0%, #16A85E 100%)" }}
      >
        {paying ? (
          <span className="flex items-center justify-center gap-2.5">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Opening secure checkout…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Lock size={14} strokeWidth={2.5} />
            Pay ₹{pricing.total} securely
          </span>
        )}
      </button>

      <p className="text-center text-xs text-text-muted">
        Powered by Razorpay · UPI · Cards · Net Banking · Wallets
      </p>

    </div>
  );
}
