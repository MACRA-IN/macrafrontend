export default function Hero() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage bg-white px-5 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
              <span className="text-sm font-medium text-forest">
                Founding batch · ships{" "}
                <span className="font-semibold text-emerald">August 2026</span>
              </span>
            </div>

            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-forest sm:text-5xl lg:text-6xl">
              High protein. Great taste. Zero compromise.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              Ready-to-eat meals with macros you can actually trust. No mystery
              numbers, no compromise on taste. Heat it, eat it, get on with your day.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-emerald px-8 py-4 font-heading font-semibold text-white transition-all hover:bg-emerald-dark active:scale-95">
                Start your 4-day trial — ₹399
              </button>
              <button className="rounded-full border border-sage bg-white px-8 py-4 font-heading font-semibold text-forest transition-colors hover:bg-sage active:scale-95">
                See the science ↓
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-text-muted">
              <span>✓ Dietitian-formulated</span>
              <span>✓ Glycemic-tested</span>
              <span>✓ No mystery fillers</span>
            </div>
          </div>

          {/* Bowl image */}
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

            <div className="absolute bottom-5 left-5 rounded-full bg-white px-4 py-2 shadow-md">
              <span className="font-heading text-sm font-semibold text-forest">38g protein</span>
            </div>
            <div className="absolute bottom-5 left-40 rounded-full bg-white px-4 py-2 shadow-md">
              <span className="font-heading text-sm font-semibold text-forest">520 kcal</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
