import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import { getPlans, calculatePrice } from "../../services/subscriptionService";

const SLOT_OPTIONS = [
  { id: "lunch",  label: "Lunch",  desc: "12–2 PM",         emoji: "☀️",  perDay: 1 },
  { id: "dinner", label: "Dinner", desc: "6–8 PM",           emoji: "🌙",  perDay: 1 },
  { id: "both",   label: "Both",   desc: "Lunch + Dinner",   emoji: "🍽️", perDay: 2 },
];

function SectionLabel({ n, title, done }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
          done ? "bg-emerald text-white" : "bg-forest text-white"
        }`}
      >
        {done ? <Check size={13} strokeWidth={3} /> : n}
      </div>
      <h2 className="font-heading text-base font-bold text-forest">{title}</h2>
    </div>
  );
}

function RadioDot({ selected }) {
  return (
    <div
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        selected ? "border-emerald bg-emerald" : "border-gray-300 bg-white"
      }`}
    >
      {selected && <Check size={11} strokeWidth={3} className="text-white" />}
    </div>
  );
}

export default function Step1TierPlan({
  tier, plan, slotChoice,
  onSelectTier, onSelectPlan, onSelectSlot,
  onContinue,
}) {
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
                avgProtein:
                  bowls.length > 0
                    ? Math.round(
                        bowls.reduce((sum, b) => sum + parseFloat(b.protein_g || 0), 0) /
                          bowls.length
                      )
                    : 0,
              };
            });
          setTiers(result);
        }
        if (plansData) setPlans(plansData);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (tier && plan && slotChoice) {
      setPricing(null);
      const slotsPerDay = SLOT_OPTIONS.find((s) => s.id === slotChoice)?.perDay ?? 1;
      calculatePrice(tier.id, plan.id, slotsPerDay).then((data) => setPricing(data));
    }
  }, [tier, plan, slotChoice]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-16 animate-pulse rounded-2xl bg-sage/40" />
        ))}
      </div>
    );
  }

  const cardBase =
    "w-full rounded-2xl border p-4 text-left transition-all";
  const cardSelected =
    "border-2 border-emerald bg-sage/30 shadow-sm";
  const cardIdle =
    "border-sage bg-white hover:border-emerald/40 hover:bg-sage/10";

  return (
    <div className="flex flex-col gap-6">

      {/* 1 — Bowl tier */}
      <section>
        <SectionLabel n={1} title="Choose your bowl tier" done={!!tier} />
        <div className="flex flex-col gap-2">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTier(t)}
              className={`${cardBase} ${tier?.id === t.id ? cardSelected : cardIdle}`}
            >
              <div className="flex items-center gap-3">
                <RadioDot selected={tier?.id === t.id} />
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-semibold text-forest">{t.name}</p>
                  <p className="text-xs text-text-muted">~{t.avgProtein}g protein per bowl</p>
                </div>
                <p className="font-heading font-bold text-emerald whitespace-nowrap">
                  ₹{t.price.toFixed(0)}
                  <span className="text-xs font-normal text-text-muted">/bowl</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 2 — Plan */}
      <section>
        <SectionLabel n={2} title="Choose your plan" done={!!plan} />
        <div className="flex flex-col gap-2">
          {plans.map((p) => {
            const isPopular = p.name === "Weekly";
            return (
              <button
                key={p.id}
                onClick={() => onSelectPlan(p)}
                className={`${cardBase} ${plan?.id === p.id ? cardSelected : cardIdle}`}
              >
                <div className="flex items-center gap-3">
                  <RadioDot selected={plan?.id === p.id} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-heading text-sm font-semibold text-forest">{p.name}</p>
                      {isPopular && (
                        <span className="rounded-full bg-emerald px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{p.duration_days} days</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3 — Delivery slot */}
      <section>
        <SectionLabel n={3} title="Delivery slot" done={!!slotChoice} />
        <p className="mb-3 text-xs text-text-muted">When should we deliver your bowls?</p>
        <div className="grid grid-cols-3 gap-2">
          {SLOT_OPTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSlot(s.id)}
              className={`rounded-2xl border py-4 text-center transition-all ${
                slotChoice === s.id ? cardSelected : cardIdle
              }`}
            >
              <span className="text-xl">{s.emoji}</span>
              <p className="mt-1 font-heading text-xs font-semibold text-forest">{s.label}</p>
              <p className="text-[10px] text-text-muted">{s.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Price summary */}
      {tier && plan && slotChoice && (
        <div className="rounded-2xl bg-sage/20 p-4">
          {pricing ? (
            <>
              <div className="flex items-center justify-between py-1 text-sm">
                <span className="text-text-muted">
                  {pricing.total_slots} bowls × ₹{pricing.bowl_price}
                </span>
                <span className="text-forest">₹{pricing.bowl_total}</span>
              </div>
              {pricing.delivery_total > 0 && (
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-text-muted">Delivery</span>
                  <span className="text-forest">₹{pricing.delivery_total}</span>
                </div>
              )}
              {pricing.discount_amount > 0 && (
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-text-muted">
                    Discount ({pricing.discount_percentage}%)
                  </span>
                  <span className="font-medium text-emerald">−₹{pricing.discount_amount}</span>
                </div>
              )}
              <div className="mt-2 flex items-center justify-between border-t border-sage pt-3">
                <span className="text-sm font-medium text-text-muted">Total</span>
                <span className="font-heading text-2xl font-bold text-forest">
                  ₹{pricing.total}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald border-t-transparent" />
              Calculating price…
            </div>
          )}
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={!tier || !plan || !slotChoice || !pricing}
        className="w-full rounded-full bg-emerald py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue to Payment →
      </button>

    </div>
  );
}
