import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage bg-white px-5 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
              <span className="text-sm font-medium text-forest">
                Founding batch · ships{" "}
                <span className="font-semibold text-emerald">August 2026</span>
              </span>
            </div>

            <h1
              className="mt-6 font-heading text-5xl font-bold leading-tight text-forest sm:text-6xl"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
            >
              Eat clean. Track nothing. We do it for you.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              Subscribe to daily protein bowls built to your macros. Pick a
              tier, plan your week, and we deliver fresh — lunch, dinner, or
              both.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/subscribe")}
                className="rounded-full bg-emerald px-8 py-4 font-heading font-semibold text-white transition-all hover:bg-emerald-dark active:scale-95"
              >
                Start your 4-day trial — ₹599
              </button>
              <a
                href="#bowls"
                className="rounded-full border border-sage bg-white px-8 py-4 text-center font-heading font-semibold text-forest transition-colors hover:bg-sage active:scale-95"
              >
                See the menu ↓
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-text-muted">
              <span>✓ No app needed</span>
              <span>✓ Cancel anytime</span>
              <span>✓ Free delivery on trial</span>
            </div>
          </div>

          {/* Right: bowl image + floating badges */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-sage">
              <div
                className="relative flex h-72 w-full items-center justify-center sm:h-96 lg:h-[480px]"
                style={{
                  backgroundColor: "#C6E8D4",
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.45) 20px, rgba(255,255,255,0.45) 36px)",
                }}
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-green-500/40">
                  Bowl Photo
                </span>
              </div>
            </div>

            <div className="absolute left-5 top-5 rounded-2xl bg-white px-4 py-2 shadow-md">
              <span className="font-heading text-lg font-bold text-emerald">38g</span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">protein</span>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white px-4 py-2 shadow-md">
              <span className="font-heading text-lg font-bold text-forest">520</span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">kcal</span>
            </div>
            <div className="absolute bottom-5 left-5 rounded-2xl bg-forest px-4 py-2 shadow-md">
              <span className="font-heading text-lg font-bold text-emerald">12g</span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-white/60">fiber</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;