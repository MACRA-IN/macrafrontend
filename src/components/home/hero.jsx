import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import getSnakOptions from "../../utils/snakUtils";

const snaks = getSnakOptions();


const WHATSAPP = "918309180145";
const MESSAGE = encodeURIComponent(
  "Hi Nandu, I saw the 10-minute delivery plan on macra.in. I'd like to know more.",
);

const Hero = () => {
  const navigate = useNavigate();
  const waHref = `https://wa.me/${WHATSAPP}?text=${MESSAGE}`;

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Left: pitch */}
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted sm:text-xs">
              <span className="h-px w-6 bg-forest/30" />
              High-protein bowls · Hyderabad
            </p>

            <h1
              className="mt-4 font-heading font-bold leading-[0.95] tracking-tight text-forest"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Hit your protein.
              <br />
              <span className="text-emerald">Skip the cooking.</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
              Subscribe to daily protein bowls built to your macros. Pick a
              tier, plan your week, and we deliver fresh — lunch, dinner, or
              both.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={() => navigate("/subscribe")}
                className="rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-95"
              >
                Start your 4-day trial — ₹599
              </button>
              <a
                href="#bowls"
                className="rounded-full border border-sage bg-white px-6 py-3 text-center font-heading text-sm font-semibold text-forest transition-colors hover:bg-sage active:scale-95"
              >
                See the menu ↓
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted sm:text-sm">
              <span>✓ No app needed</span>
              <span>✓ Cancel anytime</span>
              <span>✓ Free delivery on trial</span>
            </div>
          </div>

          {/* Right: bowl image + floating badges */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-sage">
              <img
                src="/banners/bowl2.avif"
                alt="High-protein bowl with grilled chicken, rice and vegetables"
                width={800}
                height={600}
                fetchPriority="high"
                className="h-72 w-full object-cover sm:h-96"
              />
            </div>

            <div className="absolute left-5 top-5 rounded-2xl bg-white px-4 py-2 shadow-md">
              <span className="font-heading text-lg font-bold text-emerald">38g</span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                protein
              </span>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white px-4 py-2 shadow-md">
              <span className="font-heading text-lg font-bold text-forest">520</span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                kcal
              </span>
            </div>
            <div className="absolute bottom-5 left-5 rounded-2xl bg-forest px-4 py-2 shadow-md">
              <span className="font-heading text-lg font-bold text-emerald">12g</span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-white/60">
                fiber
              </span>
            </div>
          </div>
        </div>

        {/* ── 10-minute delivery · mobile ── */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-2xl border-2 border-forest bg-cream p-2.5 active:scale-[0.98] sm:hidden"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 -rotate-6 flex-col items-center justify-center rounded-xl border-2 border-forest bg-punch font-mono leading-none text-forest">
              <span className="text-sm font-bold">10</span>
              <span className="mt-px text-[7px] tracking-[0.06em]">MIN</span>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-heading text-sm font-bold leading-tight text-forest">
                10-minute delivery
              </span>
              <span className="mt-0.5 block font-mono text-[9px] tracking-[0.08em] text-emerald">
                COMING SOON
              </span>
            </span>

            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-emerald text-white">
              <MessageCircle size={18} />
            </span>
          </span>

          <span className="mt-2.5 block text-[10.5px] leading-relaxed text-text-muted">
            Interested, or have an idea for us? Message us — we read everything.
          </span>
        </a>

        {/* ── 10-minute delivery · desktop ── */}
        <div className="mt-10 hidden border-t border-sage pt-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              <span className="h-px w-6 bg-forest/30" />
              Coming soon
            </p>
            <h2 className="mt-2 font-heading text-xl font-bold leading-tight text-forest">
              We're starting 10-minute delivery.
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              Interested, or have an idea for us? Message us — we read everything.
            </p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full border border-sage bg-white px-6 py-3 font-heading text-sm font-semibold text-forest transition-colors hover:bg-sage active:scale-95"
          >
            <MessageCircle size={15} />
            Ping us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;