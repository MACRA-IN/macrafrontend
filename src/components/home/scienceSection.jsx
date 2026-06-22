import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

const stats = [
  { value: "52g", label: "max protein" },
  { value: "100%", label: "preservative-free" },
  { value: "₹99", label: "starting at" },
  { value: "0", label: "mystery fillers" },
];

export default function ScienceSection() {
  const [bowls, setBowls] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getProducts().then((data) => {
      if (data) setBowls(data.filter((p) => p.is_active));
    });
  }, []);

  const bowl = bowls[selected];
  const total = bowl ? parseFloat(bowl.protein_g) + parseFloat(bowl.carbs_g) + parseFloat(bowl.fat_g) : 1;
  const proteinPct = bowl ? (parseFloat(bowl.protein_g) / total) * 100 : 0;
  const carbsPct   = bowl ? (parseFloat(bowl.carbs_g)   / total) * 100 : 0;
  const fatPct     = bowl ? (parseFloat(bowl.fat_g)     / total) * 100 : 0;

  return (
    <section id="science" className="bg-forest py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald">Why Snak</p>
        <h2 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
          Every bowl, scanned to the gram.
        </h2>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          We don't round, we don't estimate. Pick a bowl to see the full macro breakdown.
        </p>

        {!bowl ? (
          <p className="mt-6 text-sm text-emerald">Loading...</p>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* Left: image + bar */}
            <div>
              <div
                className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: "rgba(15,43,29,0.7)",
                  backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(0,0,0,0.18) 20px, rgba(0,0,0,0.18) 36px)",
                }}
              >
                {bowl.image_url ? (
                  <img src={bowl.image_url} alt={bowl.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    Bowl Photo
                  </span>
                )}
              </div>

              <div className="mt-3">
                <p className="font-heading text-base font-bold text-white">{bowl.name}</p>
                <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full">
                  <div className="bg-emerald transition-all duration-300" style={{ width: `${proteinPct}%` }} />
                  <div className="bg-citrus transition-all duration-300"  style={{ width: `${carbsPct}%` }} />
                  <div className="bg-crimson transition-all duration-300"  style={{ width: `${fatPct}%` }} />
                </div>
                <div className="mt-1.5 flex gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald" />Protein</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-citrus" />Carbs</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-crimson" />Fat</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <p className="font-heading text-lg font-bold text-emerald">{stat.value}</p>
                    <p className="mt-0.5 text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: macros + selector */}
            <div className="flex flex-col gap-3">

              {/* Macro cards */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Protein", value: parseFloat(bowl.protein_g).toFixed(0), color: "text-emerald", dot: "bg-emerald" },
                  { label: "Carbs",   value: parseFloat(bowl.carbs_g).toFixed(0),   color: "text-citrus",  dot: "bg-citrus"  },
                  { label: "Fat",     value: parseFloat(bowl.fat_g).toFixed(0),     color: "text-crimson", dot: "bg-crimson" },
                ].map(({ label, value, color, dot }) => (
                  <div key={label} className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <p className={`flex items-center gap-1 text-xs font-semibold uppercase ${color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />{label}
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold text-white">
                      {value}<span className="text-sm font-normal">g</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Energy + Fiber */}
              <div className="flex gap-2">
                <div className="flex flex-1 items-center justify-between rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <p className="text-xs font-semibold uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Energy</p>
                  <p className="font-heading text-xl font-bold text-white">
                    {bowl.calories} <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.5)" }}>kcal</span>
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-between rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <p className="text-xs font-semibold uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Fiber</p>
                  <p className="font-heading text-xl font-bold text-white">
                    {parseFloat(bowl.fiber_g).toFixed(0)}<span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.5)" }}>g</span>
                  </p>
                </div>
              </div>

              {/* Bowl selector */}
              <div className="flex flex-wrap gap-2">
                {bowls.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setSelected(i)}
                    className={`rounded-full px-3 py-1 font-heading text-xs font-semibold transition-all duration-200 ${
                      selected === i ? "bg-emerald text-white" : "border"
                    }`}
                    style={selected !== i ? { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" } : {}}
                  >
                    {b.name}
                  </button>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
