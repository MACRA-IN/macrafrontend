import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";

const POPULAR_TIER_ID = 3; // Regular Signature gets the green highlight

const TiersPreview = () => {
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(
      ([categories, products]) => {
        if (!categories || !products) {
          setLoading(false);
          return;
        }

        const result = categories
          .filter((c) => c.is_subscribable)
          .map((cat) => {
            const bowls = products.filter(
              (p) => p.category_id === cat.id && p.is_active,
            );

            const price = bowls[0]?.price ?? 0;

            const avgProtein =
              bowls.length > 0
                ? Math.round(
                    bowls.reduce(
                      (sum, b) => sum + parseFloat(b.protein_g || 0),
                      0,
                    ) / bowls.length,
                  )
                : 0;

            return {
              id: cat.id,
              name: cat.name,
              price: parseFloat(price),
              avgProtein,
            };
          });

        setTiers(result);
        setLoading(false);
      },
    );
  }, []);

  return (
    <section id="bowls" className="bg-bg py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-dark sm:text-sm">
          Bowl tiers
        </p>
        <h2 className="mb-2 font-heading text-2xl font-bold text-forest sm:text-3xl lg:text-4xl">
          One tier for every goal.
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-text-muted sm:mb-10 sm:text-base">
          All bowls cooked in olive oil. 100% preservative-free. Macros on every box.
        </p>

        {loading ? (
          <p className="font-body text-sm text-text-muted">Loading tiers...</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {tiers.map((tier) => {
              const isPopular = tier.id === POPULAR_TIER_ID;
              return (
                <button
                  key={tier.id}
                  onClick={() => navigate("/subscribe")}
                  className={`rounded-2xl bg-white p-4 text-left shadow-card transition-all hover:shadow-lg active:scale-[0.98] sm:p-5 ${
                    isPopular ? "border-2 border-emerald" : "border border-sage"
                  }`}
                >
                  {isPopular && (
                    <span className="mb-2 inline-block rounded-full bg-forest px-2.5 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wide text-emerald">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-heading text-sm font-bold text-forest sm:text-base">
                    {tier.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-muted">
                    ~{tier.avgProtein}g protein
                  </p>
                  <p className="mt-3 font-heading text-xl font-bold text-emerald sm:text-2xl">
                    ₹{tier.price.toFixed(0)}
                    <span className="ml-1 text-xs font-normal text-text-muted">
                      / bowl
                    </span>
                  </p>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

export default TiersPreview;