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
    <section className="bg-forest py-14 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald">
          The science
        </p>
        <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Every bowl, scanned to the gram.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          No estimates, no mystery fillers. Every bowl is weighed, logged, and
          cooked in olive oil — so your macros are exact before it reaches your door.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <p className="font-heading text-4xl font-bold text-emerald">
                {stat.value}
              </p>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/science")}
          className="mt-10 rounded-full bg-emerald px-8 py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark"
        >
          See the science →
        </button>

      </div>
    </section>
  );
}

export default ScienceCTA;