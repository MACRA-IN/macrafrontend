import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import VegBadge from "../common/VegBadge";

const TiersPreview = () => {
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState(null);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(
      ([categories, products]) => {
        if (!categories || !products) {
          setLoading(false);
          return;
        }

        const result = categories
          .filter((c) => c.is_subscribable)
          .map((cat) => ({
            id: cat.id,
            name: cat.name,
            price: parseFloat(
              products.find((p) => p.category_id === cat.id)?.price ?? 0,
            ),
            bowls: products.filter(
              (p) => p.category_id === cat.id && p.is_active,
            ),
          }))
          .filter((tier) => tier.bowls.length > 0);

        setTiers(result);
        const regular = result.find((t) => t.name.toLowerCase().includes("regular")) || result[0];
        setTierFilter(regular?.id ?? null);
        setLoading(false);
      },
    );
  }, []);

  const totalBowls = useMemo(
    () => tiers.reduce((sum, t) => sum + t.bowls.length, 0),
    [tiers],
  );

  return (
    <section id="bowls" className="bg-forest py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-emerald" />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 sm:text-xs">
            The menu
          </p>
        </div>

        <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {totalBowls} bowls. You never repeat one in a plan.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
          Every bowl is listed with its real protein and calories, so you know
          exactly what you're eating before you pay. Cooked in olive oil, 100%
          preservative-free.
        </p>

        {/* Tier filters */}
        <div className="mt-6 flex flex-wrap gap-2">
         
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setTierFilter(tier.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                tierFilter === tier.id
                  ? "border-emerald bg-emerald text-white"
                  : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {tier.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-10 font-body text-sm text-white/50">Loading menu...</p>
        ) : (
          <div className="mt-8 flex flex-col gap-10">
            {tiers.map((tier) => {
              if (tierFilter && tier.id !== tierFilter) return null;
              return (
                <div key={tier.id}>
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                      {tier.name}
                    </h3>
                    <span className="text-xs text-white/40 sm:text-sm">
                      ₹{tier.price.toFixed(0)} / bowl
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {tier.bowls.map((bowl) => (
                      <button
                        key={bowl.id}
                        onClick={() => navigate("/menu")}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-emerald/40 hover:bg-white/[0.07] active:scale-[0.98]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-heading text-sm font-bold text-white sm:text-base">
                            {bowl.name}
                          </p>
                          <VegBadge isVeg={bowl.is_veg} size={13} className="mt-1 shrink-0" />
                        </div>
                        <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50 sm:text-sm">
                          <span className="font-semibold text-white/80">
                            {parseFloat(bowl.protein_g).toFixed(0)}g protein
                          </span>
                          <span className="text-white/25">·</span>
                          <span>{bowl.calories} kcal</span>
                          <span className="text-white/25">·</span>
                          <span className="font-semibold text-emerald">
                            ₹{parseFloat(bowl.price).toFixed(0)}
                          </span>
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

export default TiersPreview;
