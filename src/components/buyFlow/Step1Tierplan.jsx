import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import { getPlans } from "../../services/subscriptionService";
import { calculatePrice } from "../../services/subscriptionService";
import { useAuth } from "../../context/authContext";

const SLOT_OPTIONS = [
  { id: "lunch", label: "Lunch only", desc: "12–2 PM", perDay: 1 },
  { id: "dinner", label: "Dinner only", desc: "6–8 PM", perDay: 1 },
  { id: "both", label: "Both", desc: "Lunch + Dinner", perDay: 2 },
];

export default function Step1TierPlan({ tier, plan, slotChoice, onSelectTier, onSelectPlan, onSelectSlot, onContinue }) {
  const { user } = useAuth();
  const [tiers, setTiers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts(), getPlans()]).then(
      ([categories, products, plansData]) => {
        if (categories && products) {
          const result = categories
            .filter((c) => c.is_subscribable)
            .map((cat) => {
              const bowls = products.filter((p) => p.category_id === cat.id && p.is_active);
              return {
                id: cat.id,
                name: cat.name,
                price: parseFloat(bowls[0]?.price ?? 0),
                avgProtein: bowls.length > 0
                  ? Math.round(bowls.reduce((sum, b) => sum + parseFloat(b.protein_g || 0), 0) / bowls.length)
                  : 0,
              };
            });
          setTiers(result);
        }
        if (plansData) {
          // Hide Trial if customer already used it
          const filtered = user?.trial_used
            ? plansData.filter((p) => !p.is_trial)
            : plansData;
          setPlans(filtered);
        }
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (tier && plan && slotChoice) {
      setPricing(null);
      const slotsPerDay = SLOT_OPTIONS.find((s) => s.id === slotChoice)?.perDay ?? 2;
      calculatePrice(tier.id, plan.id, slotsPerDay).then((data) => setPricing(data));
    }
  }, [tier, plan, slotChoice]);

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      {/* Tier */}
      <h2 className="font-heading text-2xl font-bold text-forest">Choose your bowl tier</h2>
      <div className="mt-4 flex flex-col gap-2.5">
        {tiers.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectTier(t)}
            className={`flex items-center justify-between rounded-2xl p-4 text-left transition-all ${
              tier?.id === t.id ? "border-2 border-emerald bg-sage/30" : "border border-sage bg-white hover:border-emerald/50"
            }`}
          >
            <div>
              <p className="font-heading font-bold text-forest">{t.name}</p>
              <p className="text-xs text-text-muted">~{t.avgProtein}g protein</p>
            </div>
            <p className="font-heading text-xl font-bold text-emerald">
              ₹{t.price.toFixed(0)}<span className="text-xs font-normal text-text-muted"> /bowl</span>
            </p>
          </button>
        ))}
      </div>

      {/* Plan */}
      <h2 className="mt-8 font-heading text-2xl font-bold text-forest">Choose your plan</h2>
      <p className="mt-1 text-sm text-text-muted">
        {tier ? `${tier.name} · ₹${tier.price.toFixed(0)}/bowl` : "Select a tier first"}
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {plans.map((p) => {
          const isPopular = p.name === "Weekly";
          return (
            <button
              key={p.id}
              onClick={() => onSelectPlan(p)}
              className={`rounded-2xl p-4 text-left transition-all ${
                plan?.id === p.id ? "border-2 border-emerald bg-sage/30" : "border border-sage bg-white hover:border-emerald/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <p className="font-heading font-bold text-forest">{p.name}</p>
                {isPopular && (
                  <span className="rounded-full bg-emerald px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Popular</span>
                )}
                <span className="ml-auto text-xs font-semibold text-text-muted">{p.duration_days} days</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Delivery slots */}
      <h2 className="mt-8 font-heading text-2xl font-bold text-forest">Delivery slots</h2>
      <p className="mt-1 text-sm text-text-muted">When should we deliver?</p>
      <div className="mt-4 flex gap-2.5">
        {SLOT_OPTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectSlot(s.id)}
            className={`flex-1 rounded-2xl p-4 text-center transition-all ${
              slotChoice === s.id ? "border-2 border-emerald bg-sage/30" : "border border-sage bg-white hover:border-emerald/50"
            }`}
          >
            <p className="font-heading font-bold text-forest">{s.label}</p>
            <p className="text-xs text-text-muted">{s.desc}</p>
          </button>
        ))}
      </div>

      {/* Live price */}
      {tier && plan && slotChoice && (
        <div className="mt-6 rounded-2xl bg-sage/20 p-4">
          {pricing ? (
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-muted">
                {pricing.total_slots} bowls × ₹{pricing.bowl_price}
                {pricing.discount_amount > 0 && (
                  <span className="ml-2 text-emerald">(-₹{pricing.discount_amount} discount)</span>
                )}
              </div>
              <p className="font-heading text-2xl font-bold text-forest">₹{pricing.total}</p>
            </div>
          ) : (
            <p className="text-sm text-text-muted">Calculating price...</p>
          )}
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={!tier || !plan || !slotChoice || !pricing}
        className="mt-8 w-full rounded-full bg-emerald py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue →
      </button>
    </div>
  );
}