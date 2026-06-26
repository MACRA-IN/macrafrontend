import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../common/SEO";
import Header from "../../components/home/header";

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": "Macra Protein Bowl Menu",
  "description": "High-protein bowls in 4 tiers, every bowl weighed to the gram with full macro breakdown",
  "url": "https://macra.in/menu",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Mini Bowl",
      "description": "Starter protein bowl — great for light meals or calorie-controlled diets",
      "hasMenuItem": [{
        "@type": "MenuItem",
        "name": "Mini Protein Bowl",
        "description": "High-protein mini bowl, weighed to the gram, cooked in olive oil",
        "offers": { "@type": "Offer", "price": "149", "priceCurrency": "INR" },
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "350 calories",
          "proteinContent": "25 g",
          "carbohydrateContent": "35 g",
          "fatContent": "8 g"
        }
      }]
    },
    {
      "@type": "MenuSection",
      "name": "Standard Bowl",
      "description": "Our most popular tier — balanced macros for everyday fitness goals",
      "hasMenuItem": [{
        "@type": "MenuItem",
        "name": "Standard Protein Bowl",
        "description": "High-protein standard bowl, weighed to the gram, cooked in olive oil",
        "offers": { "@type": "Offer", "price": "179", "priceCurrency": "INR" },
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "450 calories",
          "proteinContent": "35 g",
          "carbohydrateContent": "45 g",
          "fatContent": "10 g"
        }
      }]
    },
    {
      "@type": "MenuSection",
      "name": "Pro Bowl",
      "description": "For serious athletes and heavy lifters who need extra fuel",
      "hasMenuItem": [{
        "@type": "MenuItem",
        "name": "Pro Protein Bowl",
        "description": "High-protein pro bowl for athletes, weighed to the gram, cooked in olive oil",
        "offers": { "@type": "Offer", "price": "219", "priceCurrency": "INR" },
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "550 calories",
          "proteinContent": "45 g",
          "carbohydrateContent": "55 g",
          "fatContent": "12 g"
        }
      }]
    },
    {
      "@type": "MenuSection",
      "name": "Large Bowl",
      "description": "Maximum protein for maximum gains — our highest-protein tier",
      "hasMenuItem": [{
        "@type": "MenuItem",
        "name": "Large Protein Bowl",
        "description": "Large high-protein bowl, weighed to the gram, cooked in olive oil",
        "offers": { "@type": "Offer", "price": "249", "priceCurrency": "INR" },
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "650 calories",
          "proteinContent": "55 g",
          "carbohydrateContent": "65 g",
          "fatContent": "14 g"
        }
      }]
    }
  ]
};
import Footer from "../../components/home/footer";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";

function BowlCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-sage bg-white shadow-card">
      <div className="h-32 animate-pulse bg-sage/60 sm:h-40" />
      <div className="p-4">
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-sage/60" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded-lg bg-sage/40" />
        <div className="mt-4 flex items-center justify-between">
          <div className="h-6 w-14 animate-pulse rounded-lg bg-sage/50" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-sage/40" />
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [tiers, setTiers]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(([categories, products]) => {
      if (!categories || !products) { setLoading(false); return; }
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
                    bowls.reduce((sum, b) => sum + parseFloat(b.protein_g || 0), 0) / bowls.length
                  )
                : 0,
            bowls,
          };
        });
      setTiers(result);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <SEO
        title="Menu — Every Bowl on the Menu | Macra Hyderabad"
        description="Explore Macra's protein bowl menu — 4 tiers from Mini (₹149) to Large (₹249). Every bowl weighed to the gram with full macro breakdown. 100% preservative-free."
        keywords="protein bowl menu Hyderabad, healthy bowls Hyderabad, chicken bowl, paneer bowl, high protein lunch, macro meals menu, KPHB meal delivery menu"
        canonicalPath="/menu"
        structuredData={menuSchema}
      />
      <Header />

      <section className="bg-sage/20 py-8 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-dark sm:text-sm">
            The menu
          </p>
          <h1 className="font-heading text-2xl font-bold text-forest sm:text-3xl lg:text-4xl">
            Every bowl, on the menu.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">
            Cooked in olive oil, 100% preservative-free, weighed to the gram.
            Macros listed on every bowl — pick what fits your day.
          </p>

          {loading ? (
            // Skeleton tiers
            <div>
              {[1, 2].map((tier) => (
                <div key={tier} className="mt-14">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-40 animate-pulse rounded-full bg-forest/10" />
                    <div className="h-7 w-24 animate-pulse rounded-full bg-emerald/20" />
                  </div>
                  <div className="mt-2 h-4 w-28 animate-pulse rounded-full bg-forest/5" />
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((n) => <BowlCardSkeleton key={n} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            tiers.map((tier) => (
              <div key={tier.id} className="mt-14">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-bold text-forest sm:text-xl">{tier.name}</h2>
                  <span className="rounded-full bg-emerald px-3 py-0.5 font-heading text-xs font-bold text-white">
                    ₹{tier.price.toFixed(0)} / bowl
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-muted">~{tier.avgProtein}g protein</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tier.bowls.map((bowl) => (
                    <div
                      key={bowl.id}
                      className="overflow-hidden rounded-2xl border border-sage bg-white shadow-card transition-shadow hover:shadow-md"
                    >
                      <div
                        className="flex h-32 items-center justify-center sm:h-40"
                        style={{
                          backgroundColor: "#C6E8D4",
                          backgroundImage:
                            "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.45) 20px, rgba(255,255,255,0.45) 36px)",
                        }}
                      >
                        {bowl.image_url ? (
                          <img
                            src={bowl.image_url}
                            alt={bowl.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-mono text-xs uppercase tracking-[0.25em] text-green-500/40">
                            bowl photo
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-heading text-base font-bold text-forest">{bowl.name}</h3>
                        <p className="mt-1.5 text-xs font-semibold text-emerald">
                          {bowl.calories} kcal · {parseFloat(bowl.protein_g).toFixed(0)}g protein · {parseFloat(bowl.fiber_g).toFixed(0)}g fiber
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-heading text-lg font-bold text-forest">
                            ₹{parseFloat(bowl.price).toFixed(0)}
                          </p>
                          <button
                            onClick={() => navigate("/subscribe")}
                            className="rounded-full border border-emerald px-4 py-2 text-xs font-semibold text-emerald transition-colors hover:bg-emerald hover:text-white"
                          >
                            Add to plan
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Bottom CTA */}
          {!loading && tiers.length > 0 && (
            <div className="mt-10 rounded-2xl bg-forest px-6 py-8 text-center text-white sm:mt-12 sm:px-8">
              <h2 className="font-heading text-xl font-bold sm:text-2xl">Ready to start?</h2>
              <p className="mt-2 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Pick a tier and subscribe. Bowls change weekly so you never get bored.
              </p>
              <button
                onClick={() => navigate("/subscribe")}
                className="mt-5 rounded-full bg-emerald px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
              >
                Start your trial →
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
