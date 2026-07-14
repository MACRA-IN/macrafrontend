import { useEffect, useState } from "react";
import { MapPin, MapPinOff, Loader2, RefreshCw } from "lucide-react";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import { getPlans, calculatePrice } from "../../services/subscriptionService";
import { useAuth } from "../../context/authContext";
import { checkDeliveryArea } from "../../services/locationService";
import VegBadge from "../common/VegBadge";

const SLOT_OPTIONS = [
  { id: "lunch", emoji: "☀️", label: "Lunch", desc: "12–2 PM", perDay: 1 },
  { id: "dinner", emoji: "🌙", label: "Dinner", desc: "6–8 PM", perDay: 1 },
  { id: "both", emoji: "✨", label: "Both", desc: "Lunch + Dinner", perDay: 2 },
];

const PLAN_DESC = {
  Trial: "4 days · up to 8 bowls. free delivery.",
  Weekly: "6 days · up to 12 bowls. Pause up to 3 days.",
  Monthly: "25 days · up to 50 bowls. Lowest price per bowl.",
};

const POPULAR_PLAN = "Monthly";

function RadioDot({ selected }) {
  return (
    <div
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
        selected ? "border-emerald bg-emerald" : "border-sage bg-white"
      }`}
    >
      {selected && <div className="h-2 w-2 rounded-full bg-white" />}
    </div>
  );
}

function StepBadge({ n, done, active }) {
  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
        done
          ? "bg-emerald text-white"
          : active
            ? "bg-forest text-white"
            : "bg-sage/60 text-text-muted"
      }`}
    >
      {done ? "✓" : n}
    </div>
  );
}

export default function Step1TierPlan({
  tier,
  plan,
  slotChoice,
  onSelectTier,
  onSelectPlan,
  onSelectSlot,
  onContinue,
}) {
  const { user } = useAuth();
  const [tiers, setTiers] = useState([]);
  const [plans, setPlans] = useState([]);
  console.log("Step1TierPlan render",plan);
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [, setCustomerLocation] = useState(null);

  useEffect(() => {
    Promise.all([getCategories(), getProducts(), getPlans()]).then(
      ([categories, products, plansData]) => {
        console.log("p",plansData)
        if (categories && products) {
          const result = categories
            .filter((c) => c.is_subscribable)
            .map((cat) => {
              const bowls = products.filter(
                (p) => p.category_id === cat.id && p.is_active,
              );
              return {
                id: cat.id,
                name: cat.name,
                price: parseFloat(bowls[0]?.price ?? 0),
                avgProtein:
                  bowls.length > 0
                    ? Math.round(
                        bowls.reduce(
                          (sum, b) => sum + parseFloat(b.protein_g || 0),
                          0,
                        ) / bowls.length,
                      )
                    : 0,
                hasVeg: bowls.some((b) => b.is_veg),
                hasNonVeg: bowls.some((b) => !b.is_veg),
              };
            });
          setTiers(result);
        }
        if (plansData) {
          const filtered = user?.trial_used
            ? plansData.filter((p) => !p.is_trial)
            : plansData;
          setPlans(filtered);
        }
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    if (tier && plan && slotChoice) {
      setPricing(null);
      const slotsPerDay =
        SLOT_OPTIONS.find((s) => s.id === slotChoice)?.perDay ?? 2;
      calculatePrice(tier.id, plan.id, slotsPerDay).then((data) =>
        setPricing(data),
      );
    }
  }, [tier, plan, slotChoice]);

  const runLocationCheck = () => {
    setLocationError("");
    setCheckingLocation(true);

    if (!navigator.geolocation) {
      setLocationError("Your browser doesn't support location access.");
      setCheckingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const result = await checkDeliveryArea(latitude, longitude);
          if (!result.data.serviceable) {
            setLocationError(
              "Sorry, Macra is currently unavailable in your area.",
            );
            setCheckingLocation(false);
            return;
          }
          setCustomerLocation({ latitude, longitude });
          setCheckingLocation(false);
        } catch {
          setLocationError("Unable to verify your location. Please try again.");
          setCheckingLocation(false);
        }
      },
      () => {
        setLocationError("Please allow location access to continue.");
        setCheckingLocation(false);
      },
    );
  };

  useEffect(() => {
    runLocationCheck();
  }, []);

  /* ── Location: checking ── */
  if (checkingLocation) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-sage/30">
            <MapPin size={26} className="text-emerald" />
          </div>
        </div>
        <h3 className="font-heading text-lg font-bold text-forest">
          Checking delivery area
        </h3>
        <p className="mt-2 max-w-xs text-sm text-text-muted">
          Just a moment while we confirm we deliver to you.
        </p>
        <div className="mt-5 flex gap-1.5">
          {[0, 0.15, 0.3].map((delay, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald/60"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── Location: error ── */
  if (locationError) {
    const isPermission = locationError.includes("allow location");
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <MapPinOff size={26} className="text-red-400" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-bold text-forest">
          {isPermission ? "Location access needed" : "Not in your area yet"}
        </h3>
        <p className="mt-2 max-w-xs text-sm text-text-muted">{locationError}</p>
        {!isPermission && (
          <p className="mt-1 text-xs text-text-muted">
            Macra delivers across select areas of Hyderabad. We're growing fast.
          </p>
        )}
        {isPermission && (
          <button
            onClick={runLocationCheck}
            className="mt-6 flex items-center gap-2 rounded-full border border-sage px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-sage/30"
          >
            <RefreshCw size={14} /> Try again
          </button>
        )}
      </div>
    );
  }

  /* ── Data loading skeleton ── */
  if (loading) {
    return (
      <div className="space-y-7 animate-pulse">
        <div>
          <div className="mb-4 h-3.5 w-20 rounded-full bg-sage/60" />
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="mb-2 h-14 rounded-2xl bg-sage/40" />
          ))}
        </div>
        <div>
          <div className="mb-4 h-3.5 w-28 rounded-full bg-sage/60" />
          {[1, 2, 3].map((n) => (
            <div key={n} className="mb-2 h-20 rounded-2xl bg-sage/40" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 rounded-2xl bg-sage/40" />
          ))}
        </div>
      </div>
    );
  }

  /* ── Main form ── */
  return (
    <div className="space-y-7">

      {/* Delivery confirmed badge */}
      <div
        className="flex items-center gap-2.5 rounded-2xl border px-4 py-3"
        style={{ background: "rgba(44,211,119,0.08)", borderColor: "rgba(44,211,119,0.30)" }}
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-xs font-semibold text-emerald">
          We deliver to your area{" "}
          <span className="font-normal text-text-muted">· pick your setup below</span>
        </p>
      </div>

      {/* ── Section 1: Bowl tier ── */}
      <div>
        <div className="mb-3 flex items-center gap-2.5">
          <StepBadge n={1} done={!!tier} active={!tier} />
          <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-forest">
            Bowl tier
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTier(t)}
              className={`flex items-center gap-3 rounded-2xl p-3.5 text-left transition-all duration-200 ${
                tier?.id === t.id
                  ? "border-2 border-emerald bg-sage/20 shadow-sm"
                  : "border border-sage bg-white hover:border-emerald/40 hover:bg-sage/10"
              }`}
            >
              <RadioDot selected={tier?.id === t.id} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-heading text-sm font-bold text-forest">
                    {t.name}
                  </p>
                  <span className="flex items-center gap-1 rounded-full border border-sage bg-white px-1.5 py-0.5 text-[9px] font-semibold text-text-muted">
                    {t.hasVeg && <VegBadge isVeg size={10} />}
                    {t.hasNonVeg && <VegBadge isVeg={false} size={10} />}
                    {t.hasVeg && t.hasNonVeg ? "Veg & Non-veg" : t.hasVeg ? "Veg only" : "Non-veg only"}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1 w-16 overflow-hidden rounded-full bg-sage">
                    <div
                      className="h-1 rounded-full bg-emerald"
                      style={{ width: `${Math.min((t.avgProtein / 50) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-text-muted">~{t.avgProtein}g protein</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading text-base font-bold text-emerald">
                  ₹{t.price.toFixed(0)}
                </p>
                <p className="text-[10px] text-text-muted">/ bowl</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Section 2: Plan ── */}
      <div
        className={`transition-opacity duration-300 ${tier ? "opacity-100" : "pointer-events-none opacity-35"}`}
      >
        <div className="mb-3 flex items-center gap-2.5">
          <StepBadge n={2} done={!!plan} active={!!tier && !plan} />
          <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-forest">
            Subscription plan
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {plans.map((p) => {
            const isPopular = p.name === POPULAR_PLAN;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPlan(p)}
                className={`rounded-2xl p-3.5 text-left transition-all duration-200 ${
                  plan?.id === p.id
                    ? "border-2 border-emerald bg-sage/20 shadow-sm"
                    : "border border-sage bg-white hover:border-emerald/40 hover:bg-sage/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <RadioDot selected={plan?.id === p.id} />
                  <span className="font-heading text-sm font-bold text-forest">
                    {p.name}
                  </span>
                  {isPopular && (
                    <span className="rounded-full bg-forest px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wide text-emerald">
                      Best value
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-text-muted">
                    {p.duration_days} days
                  </span>
                </div>
                <p className="mt-1.5 pl-7 text-[11px] leading-relaxed text-text-muted">
                  {PLAN_DESC[p.name] ?? ""}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Section 3: Delivery slots ── */}
      <div
        className={`transition-opacity duration-300 ${plan ? "opacity-100" : "pointer-events-none opacity-35"}`}
      >
        <div className="mb-3 flex items-center gap-2.5">
          <StepBadge n={3} done={!!slotChoice} active={!!plan && !slotChoice} />
          <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-forest">
            Delivery time
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SLOT_OPTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSlot(s.id)}
              className={`flex flex-col items-center rounded-2xl py-4 px-2 text-center transition-all duration-200 ${
                slotChoice === s.id
                  ? "border-2 border-emerald bg-sage/20 shadow-sm"
                  : "border border-sage bg-white hover:border-emerald/40 hover:bg-sage/10"
              }`}
            >
              <span className="text-2xl">{s.emoji}</span>
              <p className="mt-2 font-heading text-xs font-bold text-forest">
                {s.label}
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-text-muted">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Price summary ── */}
      {tier && plan && slotChoice && (
        <div className="rounded-2xl border border-sage bg-white p-4 shadow-card">
          {pricing ? (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>
                    {pricing.total_slots} bowls × ₹{pricing.bowl_price}
                  </span>
                  <span>
                    ₹{(pricing.total_slots * pricing.bowl_price).toFixed(0)}
                  </span>
                </div>
                {pricing.discount_amount > 0 && (
                  <div className="flex justify-between font-medium text-emerald-dark">
                    <span>Discount</span>
                    <span>−₹{pricing.discount_amount}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-muted">
                  <span>
                    Delivery
                    {pricing.delivery_total > 0 && (
                      <span className="ml-1 text-[10px]">
                        ({pricing.days} days × ₹{pricing.delivery_charge})
                      </span>
                    )}
                  </span>
                  <span
                    className={
                      pricing.delivery_total === 0
                        ? "font-semibold text-emerald"
                        : ""
                    }
                  >
                    {pricing.delivery_total === 0
                      ? "Free"
                      : `₹${pricing.delivery_total}`}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-sage pt-3">
                <span className="font-heading text-sm font-bold text-forest">
                  Total
                </span>
                <span className="font-heading text-2xl font-bold text-forest">
                  ₹{pricing.total}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Loader2 size={14} className="animate-spin text-emerald" />
              Calculating price…
            </div>
          )}
        </div>
      )}

      {/* ── CTA ── */}
      <button
        onClick={onContinue}
        disabled={!tier || !plan || !slotChoice || !pricing}
        className="w-full rounded-full py-4 font-heading text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #2CD377 0%, #16A85E 100%)" }}
      >
        Continue to Delivery →
      </button>
    </div>
  );
}
