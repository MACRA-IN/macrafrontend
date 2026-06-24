import { useNavigate } from "react-router-dom";

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-bg py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left: heading + subtext */}
          <div>
            <h2 className="font-heading text-4xl font-bold leading-tight text-forest sm:text-5xl">
              Try it nearly free. Subscribe only if you love it.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Four bowls, four days, one flat price. No commitment until you've
              tasted Macra.
            </p>
          </div>

          {/* Right: dark trial-box card */}
          <div className="rounded-3xl bg-forest p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
              Trial box
            </p>
            <p className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
              4 bowls · ₹599
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Free delivery · cancel anytime · refundable until first delivery.
            </p>
            <button
              onClick={() => navigate("/subscribe")}
              className="mt-6 w-full rounded-full bg-emerald py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark"
            >
              Preorder now →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}