import { useEffect, useRef, useState } from "react";
import {
  IconMapPin,
  IconCheck,
  IconAlertTriangle,
  IconLoader2,
  IconSearch,
  IconUserPlus,
  IconUsers,
  IconRoute,
  IconPhoneCall,
  IconShoppingBag,
  IconArrowRight,
} from "@tabler/icons-react";

const STATUS = { IDLE: "idle", LOADING: "loading", SUCCESS: "success", ERROR: "error" };

const STEPS = [
  { icon: IconUserPlus, label: "Join\nwaitlist" },
  { icon: IconUsers, label: "People\njoin" },
  { icon: IconRoute, label: "We arrange\nroute" },
  { icon: IconPhoneCall, label: "We call\nyou" },
  { icon: IconShoppingBag, label: "Order\ntoday" },
];

/* Fades a state block in on mount — used so each state transition gets a soft entrance. */
function FadeIn({ children }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className={`transition-all duration-300 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      {children}
    </div>
  );
}

/* Horizontal snap-scroll strip visualizing the 5-step waitlist → delivery flow.
   The card itself stays narrow at every breakpoint (see max-w-120 below), so this
   scrolls on all screen sizes rather than trying to force a no-scroll 5-across row. */
function StepCarousel({ dimmed = false, secondary = false }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    if (max > 0) setActiveIndex(Math.round((el.scrollLeft / max) * (STEPS.length - 1)));
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  const scrollToIndex = (i) => {
    scrollRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div
      className={`transition-opacity duration-300 ${dimmed ? "opacity-50" : secondary ? "opacity-70" : "opacity-100"}`}
    >
      <div className="relative">
        {/* Edge fades — hint there's more to scroll, only shown on the side with content */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-white to-transparent transition-opacity duration-200 ${atStart ? "opacity-0" : "opacity-100"}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-white to-transparent transition-opacity duration-200 ${atEnd ? "opacity-0" : "opacity-100"}`}
        />

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="scrollbar-none flex snap-x snap-mandatory items-center gap-2 overflow-x-auto scroll-smooth px-0.5 pb-1 [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className="flex w-24 shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-lg bg-sage/30 p-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-sage/50 active:scale-95"
                >
                  <Icon size={28} className="text-emerald-dark" strokeWidth={1.75} />
                  <span className="whitespace-pre-line text-center text-xs font-bold leading-tight text-forest">
                    {step.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <IconArrowRight size={14} strokeWidth={2} className="shrink-0 text-text-muted" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step dots — track which card is currently in view */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {STEPS.map((step, i) => (
          <button
            key={step.label}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-4 bg-emerald" : "w-1.5 bg-sage"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Waitlist screen for the "outside delivery zone" checkout flow.
 * The waitlist is a call trigger, not a passive queue: once enough nearby customers
 * stack up, Macra batches one efficient delivery to that area and calls everyone on
 * the list to order. Kept deliberately compact and text-led — no benefit cards, no
 * bullet lists — so it reads as a warm, human explanation rather than a sales pitch.
 *
 * Always renders in the app's light theme — the surrounding checkout flow has no dark
 * background anywhere, so this intentionally does not use `dark:` text variants (those
 * would flip text white against a card that stays white, making it unreadable).
 *
 * Props:
 *  - areaName:      string   — friendly area name, e.g. "Madhapur"
 *  - onJoinWaitlist: () => Promise<void>  — reject to surface the error state
 *  - onSearchArea:   () => void
 *  - onBackHome:     () => void
 */
export default function WaitlistScreen({ areaName = "your area", onJoinWaitlist, onSearchArea, onBackHome }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const isLoading = status === STATUS.LOADING;

  const handleJoin = async () => {
    setStatus(STATUS.LOADING);
    try {
      await onJoinWaitlist?.();
      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div className="mx-auto w-full max-w-120">
      <style>{`
        @keyframes waitlist-check-pop {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        .wl-check { animation: waitlist-check-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      `}</style>

      {/* ── Error ── */}
      {status === STATUS.ERROR && (
        <FadeIn>
          <div className="rounded-xl border border-sage p-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <IconAlertTriangle size={22} className="text-red-500" strokeWidth={1.75} />
            </div>
            <h2 className="mt-3 text-lg font-bold text-forest">Something went wrong</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              We couldn't add you to the waitlist. Please try again.
            </p>
            <button
              onClick={handleJoin}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-emerald text-sm font-semibold text-white transition-colors hover:bg-emerald-dark active:scale-[0.98]"
            >
              Try again
            </button>
            <button
              onClick={() => setStatus(STATUS.IDLE)}
              className="mt-1.5 text-sm font-medium text-text-muted transition-colors hover:text-forest"
            >
              Cancel
            </button>
          </div>
        </FadeIn>
      )}

      {/* ── Success ── */}
      {status === STATUS.SUCCESS && (
        <FadeIn>
          <div className="rounded-xl border border-sage p-4 text-center">
            <div className="wl-check mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald">
              <IconCheck size={22} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="mt-3 text-lg font-bold text-forest">You're in!</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              We'll call you when we arrange delivery to <span className="font-semibold text-forest">{areaName}</span>.
            </p>

            <div className="mt-4">
              <StepCarousel secondary />
            </div>

            <button
              onClick={() => {
                setStatus(STATUS.IDLE);
                onSearchArea?.();
              }}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-emerald text-sm font-semibold text-white transition-colors hover:bg-emerald-dark active:scale-[0.98]"
            >
              Check another area
            </button>
            <button
              onClick={() => onBackHome?.()}
              className="mt-1.5 text-sm font-medium text-text-muted transition-colors hover:text-forest"
            >
              Done
            </button>
          </div>
        </FadeIn>
      )}

      {/* ── Idle / Loading ── */}
      {(status === STATUS.IDLE || status === STATUS.LOADING) && (
        <FadeIn>
          <div className="rounded-xl border border-sage p-4 text-center">
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald/12 transition-opacity duration-300 ${isLoading ? "opacity-40" : "opacity-100"}`}
            >
              <IconMapPin size={22} className="text-emerald-dark" strokeWidth={1.75} />
            </div>

            <div className={`transition-opacity duration-300 ${isLoading ? "opacity-40" : "opacity-100"}`}>
              <h2 className="mt-3 text-lg font-bold leading-snug text-forest">
                We can't deliver to {areaName} yet
              </h2>
              <p className="mt-1 text-sm font-semibold text-emerald-dark">
                But here's the good part...
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                When we have customers nearby, we batch orders and add your area to the route.
                Join the waitlist and we'll call you when we arrange delivery.
              </p>
            </div>

            <div className="mt-4 mb-1 border-b border-sage pb-4">
              <StepCarousel dimmed={isLoading} />
            </div>

            <button
              onClick={handleJoin}
              disabled={isLoading}
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <IconLoader2 size={17} className="animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Waitlist"
              )}
            </button>

            <button
              type="button"
              onClick={() => onSearchArea?.()}
              disabled={isLoading}
              className={`mt-1.5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium text-emerald-dark transition-opacity ${isLoading ? "pointer-events-none opacity-40" : "hover:text-emerald"}`}
            >
              <IconSearch size={13} />
              Search another area
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
