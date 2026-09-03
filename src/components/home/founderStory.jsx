import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const CHIPS = ["Fresh daily", "Weighed exact", "No additives"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function FounderStory() {
  const navigate = useNavigate();
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className="bg-bg py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          className={`rounded-3xl border-[1.5px] border-sage bg-cream p-3 transition-all duration-700 sm:p-5 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            {/* ── Photo ── */}
            <div className="relative sm:w-[250px] sm:shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 hidden translate-x-[7px] translate-y-[7px] rounded-[18px] border-2 border-forest/20 sm:block"
              />

              <div className="relative overflow-hidden rounded-2xl border-[3px] border-forest bg-sage/40">
                <img
                  src="/banners/nandukitchen1.avif"
                  alt="Nandu, founder of Macra, in the kitchen"
                  width={500}
                  height={540}
                  loading="lazy"
                  className="h-[240px] w-full object-cover object-[center_25%] sm:h-[270px]"
                />

                <span className="absolute right-2.5 top-2.5 rotate-[4deg] rounded-full border-2 border-forest bg-punch px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-forest sm:text-[10px]">
                  Founder
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-forest px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald font-heading text-[11px] font-bold text-forest">
                      N
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-white">Nandu</p>
                      <p className="text-[9px] text-sage">Founder · Hyderabad</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald px-2 py-0.5 font-mono text-[9px] font-semibold text-forest">
                    500+ meals
                  </span>
                </div>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="flex flex-1 flex-col justify-center gap-3">
              <p className="font-heading text-[19px] font-bold leading-[1.15] tracking-tight text-forest sm:text-[22px]">
                Make healthy living effortless.
              </p>

              <p className="text-[12.5px] leading-relaxed text-text-muted sm:text-[13px]">
                You already want to eat better. The hard part is finding food that's
                easy, tasty, and fits a busy day.{" "}
                <span className="font-semibold text-forest">
                  That's why I built Macra.
                </span>
              </p>

              <div className="grid grid-cols-3 gap-1.5">
                {CHIPS.map((c) => (
                  <span
                    key={c}
                    className="rounded-[10px] border border-sage bg-white px-1 py-1.5 text-center text-[10px] font-medium text-forest sm:text-[11px]"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate("/subscribe")}
                className="w-full rounded-full bg-emerald px-6 py-3 font-heading text-[13px] font-semibold text-white transition-all hover:bg-emerald-dark active:scale-95 sm:w-auto sm:self-start sm:text-sm"
              >
                Start 4-day trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}