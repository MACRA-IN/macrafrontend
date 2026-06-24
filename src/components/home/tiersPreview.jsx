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
    <section id="bowls" className="bg-bg py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-dark">
          Bowl tiers
        </p>
        <h2 className="mb-4 font-heading text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
          One tier for every goal.
        </h2>
        <p className="mb-12 max-w-2xl text-base text-text-muted lg:mb-16">
          All bowls cooked in olive oil. 100% preservative-free. Macros on every box.
        </p>

        {loading ? (
          <p className="font-body text-text-muted">Loading tiers...</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => {
              const isPopular = tier.id === POPULAR_TIER_ID;
              return (
                <button
                  key={tier.id}
                  onClick={() => navigate("/subscribe")}
                  className={`rounded-3xl bg-white p-6 text-left shadow-card transition-all hover:shadow-lg active:scale-[0.98] ${
                    isPopular ? "border-2 border-emerald" : "border border-sage"
                  }`}
                >
                  {isPopular && (
                    <span className="mb-3 inline-block rounded-full bg-forest px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-emerald">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-heading text-lg font-bold text-forest">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    ~{tier.avgProtein}g protein
                  </p>
                  <p className="mt-4 font-heading text-2xl font-bold text-emerald">
                    ₹{tier.price.toFixed(0)}
                    <span className="ml-1 text-sm font-normal text-text-muted">
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