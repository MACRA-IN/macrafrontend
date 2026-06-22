import { useEffect, useState } from "react";
import BowlCard from "./bowlCard";
import { getProducts } from "../../services/productService";

const CATEGORY_META = {
  1: { name: "Mini Bowls", tagline: "Perfect size. Big nutrition." },
  2: { name: "Mini Protein Bowls", tagline: "A protein step up." },
  3: { name: "Regular Signature Bowls", tagline: "The full line-up." },
  4: { name: "Large Signature Bowls", tagline: "Bigger. Heartier. More protein." },
};

export default function MenuSection() {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((products) => {
      if (!products) return;
      const grouped = products.reduce((acc, p) => {
        if (!acc[p.category_id]) acc[p.category_id] = [];
        acc[p.category_id].push(p);
        return acc;
      }, {});

      const result = Object.entries(grouped).map(([catId, bowls]) => ({
        id: Number(catId),
        ...CATEGORY_META[catId],
        price: bowls[0]?.price,
        bowls,
      }));

      setTiers(result);
      setLoading(false);
    });
  }, []);

  return (
    <section id="bowls" className="bg-sage/20 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-dark">
          The menu
        </p>
        <h2 className="mb-4 font-heading text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
          Every bowl, on the menu.
        </h2>
        <p className="mb-12 max-w-2xl text-base text-text-muted lg:mb-16">
          Four tiers, from a quick Mini to a protein-packed Large. Every bowl is
          cooked in olive oil and 100% preservative-free.
        </p>

        {loading ? (
          <p className="text-text-muted font-body">Loading menu...</p>
        ) : (
          tiers.map((tier) => (
            <div key={tier.id} className="mb-12 lg:mb-16">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-xl font-bold text-forest sm:text-2xl">{tier.name}</h3>
                <span className="rounded-full bg-forest px-4 py-1 font-heading text-sm font-bold text-emerald">
                  ₹{parseFloat(tier.price).toFixed(0)}
                </span>
                <span className="text-sm text-text-muted">{tier.tagline}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-4">
                {tier.bowls.map((bowl) => (
                  <BowlCard key={bowl.id} bowl={bowl} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
