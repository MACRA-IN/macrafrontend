import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Hooks ─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Video ──────────────────────────────────────────────────────────────── */
function KitchenVideo() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    el.play().catch(() => {});
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePlay = useCallback(() => {
    videoRef.current?.play().catch(() => {});
    setStarted(true);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl  bg-forest/10"
      style={{ aspectRatio: "4/5" }}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sage/40 to-sage/20" />
      )}

      <video
        ref={videoRef}
        src="/videos/founder_making2.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setLoaded(true)}
        onPlay={() => setStarted(true)}
        className={[
          "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-label="Inside the Macra kitchen"
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: "inset 0 0 80px rgba(15,43,29,0.30)" }}
      />

      {/* Play overlay */}
      {!started && (
        <button
          onClick={handlePlay}
          aria-label="Play kitchen video"
          className="absolute inset-0 flex items-center justify-center bg-forest/20 backdrop-blur-[1px] transition-opacity duration-300"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95">
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
              <path d="M2 1.5l14 9-14 9V1.5z" fill="#0F2B1D" />
            </svg>
          </span>
        </button>
      )}

      {/* Our Kitchen label — top of video */}
      <div className="absolute left-4 top-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <div className="h-px w-4 bg-emerald" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald">Our Kitchen</span>
        </div>
        {/* Live badge below */}
        <div className="flex items-center gap-1.5 rounded-full bg-forest/70 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">Live kitchen</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function KitchenSection() {
  const [sectionRef, inView] = useInView(0.06);

  return (
    <section ref={sectionRef} className="bg-bg py-14 sm:py-20 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className={`mb-6 flex items-center gap-2 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-6 bg-emerald" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald sm:text-xs">Our Kitchen</p>
        </div>

        {/* Two-column: video left, text right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">

          {/* Left — video */}
          <div className={`transition-all duration-600 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <KitchenVideo />
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald text-[10px] font-bold text-white">✓</span>
              <p className="text-xs font-medium text-text-muted">No stock footage. This is our real kitchen.</p>
            </div>
          </div>

          {/* Right — text */}
          <div className={`transition-all duration-500 ease-out delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="font-heading text-2xl font-bold leading-tight text-forest sm:text-3xl lg:text-[34px] lg:leading-[1.22]">
              See Where Your<br /> Food Is Made.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-[15px]">
              Every Macra meal is freshly prepared in our professional partner kitchen,
              carefully packed, and delivered straight to your doorstep.
            </p>

            {/* Feature pills */}
            <div className="mt-6 flex flex-col gap-3">
              {[
                { icon: "⚖️", text: "Portioned to your exact macros" },
                { icon: "👨🍳", text: "Cooked fresh every single day" },
                { icon: "🚚", text: "Delivered Mon – Sat, on time" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage text-base">{icon}</span>
                  <p className="text-sm font-medium text-forest">{text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Trust banner */}
        <div
          className={[
            "mt-10 overflow-hidden rounded-2xl px-6 py-5 sm:px-8 sm:py-6",
            "transition-all duration-500 ease-out delay-200",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ background: "linear-gradient(135deg, #0F2B1D 0%, #091a0e 100%)" }}
        >
          <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-3">
            <span className="text-lg">❤️</span>
            <p className="text-sm font-semibold text-white sm:text-base">
              Trusted by healthy meal subscribers across Hyderabad.
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <p className="text-xs text-white/50 sm:text-sm">Real kitchen. Real food. Real results.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
