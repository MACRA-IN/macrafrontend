import { useNavigate } from "react-router-dom";

const stats = [
  { value: "52g", label: "Max protein per bowl" },
  { value: "100%", label: "Preservative-free, always" },
  { value: "₹149", label: "Bowls starting at" },
  { value: "0", label: "Mystery fillers" },
];

const ScienceCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-forest py-8 text-white sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald sm:text-sm">
          The science
        </p>
        <h2 className="font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Every bowl, scanned to the gram.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
          No estimates, no mystery fillers. Every bowl is weighed, logged, and
          cooked in olive oil — so your macros are exact before it reaches your door.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 sm:p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <p className="font-heading text-2xl font-bold text-emerald sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/science")}
          className="mt-6 rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark sm:mt-8"
        >
          See the science →
        </button>

      </div>
    </section>
  );
}

export default ScienceCTA;