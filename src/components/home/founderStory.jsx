import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const TRUST_PILLS = [
  { emoji: "🥗", text: "Cooked fresh daily" },
  { emoji: "⚖️", text: "Weighed to the gram" },
  { emoji: "🚫", text: "Zero preservatives" },
];

const QUOTE_WORDS = "Make healthy living effortless.".split(" ");
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function FounderStory() {
  const navigate = useNavigate();
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section ref={sectionRef} className="bg-bg py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Label */}
        <div
          className={`mb-8 flex items-center gap-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="h-px w-8 bg-emerald" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
            Meet the Founder{" "}
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: photo + floating elements ── */}
          <div
            className={`relative transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Photo */}
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/banners/nandukitchen1.avif"
                alt="Founder of Macra in the kitchen"
                className="h-[420px] w-full object-cover object-top sm:h-[480px] lg:h-[520px]"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest/20 to-transparent" />
            </div>

            {/* Floating: years card */}
            <div className="absolute -right-3 top-6 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-right-5">
              <p className="font-heading text-2xl font-bold text-forest">3+</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                yrs in kitchens
              </p>
            </div>

            {/* Floating: bowls served */}
            <div className="absolute -left-3 bottom-8 rounded-2xl bg-forest px-4 py-3 shadow-lg sm:-left-5">
              <p className="font-heading text-2xl font-bold text-emerald">
                500+
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
                Healthy meals served
              </p>
            </div>

            {/* Floating: location pill */}
            <div className="absolute bottom-8 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              <p className="text-[11px] font-semibold text-forest">
                Hyderabad, IN
              </p>
            </div>
          </div>

          {/* ── Right: story ── */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Animated pull quote */}
            <blockquote className="mb-6 font-heading text-2xl font-bold leading-snug text-forest sm:text-3xl lg:text-[2rem]">
              {QUOTE_WORDS.map((word, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: inView ? `${300 + i * 40}ms` : "0ms",
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </blockquote>

            {/* Story body */}

            <div className="space-y-1 text-sm leading-relaxed text-text-muted sm:text-base">
              <p>
                <span className="font-semibold text-forest">
                  Hi, I'm Nandu.
                </span>
              </p>

              <p>
                Most people don't need more motivation to eat healthy. They
                already want to live a healthier life.
              </p>

              <p>
                The real challenge is finding healthy food that's easy, tasty,
                and fits into a busy day.
              </p>

              <p className="font-semibold text-forest">
                That's why I built Macra.
              </p>

              <p>
                Every meal is freshly prepared, balanced with the right
                nutrition, and delivered to your doorstep—so you can focus on
                your life while we take care of your meals.
              </p>

              <p className="font-medium text-forest">
                Make healthy living effortless.
              </p>
            </div>

            {/* Founder signature */}
            <div className="mt-6 flex items-center gap-3 border-t border-sage pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/60 text-lg font-bold text-forest">
                N
              </div>
              <div>
                <p className="text-sm font-bold text-forest">Nandu</p>
                <p className="text-xs text-text-muted">
                  Founder, Macra · Hyderabad
                </p>
              </div>
            </div>

            {/* Trust pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {TRUST_PILLS.map((pill) => (
                <span
                  key={pill.text}
                  className="flex items-center gap-1.5 rounded-full border border-sage bg-white px-3 py-1.5 text-xs font-medium text-forest"
                >
                  <span>{pill.emoji}</span>
                  {pill.text}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button
                onClick={() => navigate("/subscribe")}
                className="rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-95"
              >
                Start Your 4-Day Trial
              </button>
              <a
                href="https://www.instagram.com/trymacra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-forest"
              >
                <span>Follow the journey</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
