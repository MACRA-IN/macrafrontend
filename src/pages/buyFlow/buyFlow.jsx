import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import SEO from "../../components/common/SEO";
import macraLogo from "../../assets/logo/Macra.png";

import stickerFlex           from "../../assets/stickers/macra-sticker-flex.png";
import stickerStreak         from "../../assets/stickers/macra-sticker-streak.png";
import stickerVibe           from "../../assets/stickers/macra-sticker-vibe.png";
import stickerBuiltDifferent from "../../assets/stickers/macra-built-different.png";

import Step1TierPlan from "../../components/buyFlow/Step1Tierplan";
import Step2Address  from "../../components/buyFlow/Step2Address";
import Step3Payment  from "../../components/buyFlow/Step3Payment";
import Step4Confirm  from "../../components/buyFlow/Step4Confirm";

const STEP_LABELS = ["Your Plan", "Delivery", "Payment", "Confirmed"];

/* ── Wavy scalloped card border ─────────────────────────────────────────── */
function wavyPath(W, H, amp = 7, bump = 22, r = 24) {
  if (!W || !H) return "";
  const tN = Math.max(3, Math.round((W - 2 * r) / bump));
  const sN = Math.max(2, Math.round((H - 2 * r) / bump));
  const sx = (W - 2 * r) / tN;
  const sy = (H - 2 * r) / sN;
  let d = `M ${r},0`;
  for (let i = 0; i < tN; i++)
    d += ` Q ${r + i*sx + sx/2},${-amp} ${r + (i+1)*sx},0`;
  d += ` A ${r},${r} 0 0,1 ${W},${r}`;
  for (let i = 0; i < sN; i++)
    d += ` Q ${W+amp},${r + i*sy + sy/2} ${W},${r + (i+1)*sy}`;
  d += ` A ${r},${r} 0 0,1 ${W-r},${H}`;
  for (let i = tN-1; i >= 0; i--)
    d += ` Q ${r + i*sx + sx/2},${H+amp} ${r + i*sx},${H}`;
  d += ` A ${r},${r} 0 0,1 0,${H-r}`;
  for (let i = sN-1; i >= 0; i--)
    d += ` Q ${-amp},${r + i*sy + sy/2} 0,${r + i*sy}`;
  d += ` A ${r},${r} 0 0,1 ${r},0 Z`;
  return d;
}

function WavyCard({ children, className = "", style = {} }) {
  const ref  = useRef(null);
  const [sz, setSz] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      if (ref.current)
        setSz({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const d = wavyPath(sz.w, sz.h);
  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      {d && (
        <svg aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 1 }}>
          <path d={d} fill="none" stroke="#2CD377" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      )}
      {children}
    </div>
  );
}

/* Corner sticker config — only visible on lg+ */
const CORNER_STICKERS = [
  { src: stickerFlex,           alt: "Fuel Your Gains",  cls: "fixed left-4 top-28 hidden lg:block h-20 w-20",  rotate: -8  },
  { src: stickerStreak,         alt: "Protein Power",    cls: "fixed right-4 top-36 hidden lg:block h-16 w-16", rotate:  7  },
  { src: stickerVibe,           alt: "Eating Clean",     cls: "fixed left-6 bottom-28 hidden lg:block h-16 w-16", rotate: 6  },
  { src: stickerBuiltDifferent, alt: "Built Different",  cls: "fixed right-4 bottom-20 hidden lg:block h-20 w-20", rotate: -6 },
];

export default function BuyFlow() {
  const navigate = useNavigate();
  const [step, setStep]           = useState(1);
  const [tier, setTier]           = useState(null);
  const [plan, setPlan]           = useState(null);
  const [slotChoice, setSlotChoice] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const totalSteps = 4;
  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const goBack = () => {
    if (step === 1) navigate("/");
    else setStep((s) => s - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1TierPlan
            tier={tier} plan={plan} slotChoice={slotChoice}
            onSelectTier={setTier} onSelectPlan={setPlan} onSelectSlot={setSlotChoice}
            onContinue={goNext}
          />
        );
      case 2: return <Step2Address onContinue={goNext} />;
      case 3:
        return (
          <Step3Payment
            tier={tier} plan={plan} slotChoice={slotChoice}
            onSuccess={(data) => { setOrderData(data); goNext(); }}
          />
        );
      case 4: return <Step4Confirm tier={tier} plan={plan} orderData={orderData} />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #EDF7F0 60%, #FAFAF7 100%)" }}>

      <SEO
        title="Start Your Subscription | Macra"
        description="Subscribe to daily protein bowls in 3 simple steps."
        canonicalPath="/subscribe"
        noIndex
      />

      {/* Decorative corner stickers — desktop only */}
      {CORNER_STICKERS.map(({ src, alt, cls, rotate }) => (
        <img
          key={alt}
          src={src}
          alt={alt}
          className={`pointer-events-none rounded-2xl object-cover shadow-lg opacity-80 ${cls}`}
          style={{ transform: `rotate(${rotate}deg)` }}
        />
      ))}

      <div className="mx-auto max-w-lg px-4 pb-16 pt-6">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          {step < 4 ? (
            <button
              onClick={goBack}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sage bg-white shadow-sm transition-colors hover:bg-sage/30"
            >
              <ChevronLeft size={18} className="text-forest" />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <img src={macraLogo} alt="Macra" className="h-8 w-auto" />
          <span className="min-w-10 text-right text-sm font-medium text-text-muted">
            {step < 4 ? `${step} / 3` : ""}
          </span>
        </div>

        {/* Progress bar + step label */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    n < step ? "bg-emerald" : n === step ? "bg-emerald" : "bg-sage"
                  }`}
                  style={n === step ? { background: "linear-gradient(90deg, #2CD377, #16A85E)" } : {}}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald">Step {step} of 3</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs font-medium text-text-muted">{STEP_LABELS[step - 1]}</span>
            </div>
          </div>
        )}

        {/* Step card — wavy scalloped border */}
        <WavyCard
          className="rounded-3xl bg-white p-6 sm:p-8"
          style={{ boxShadow: "0 8px 40px rgba(15,43,29,0.10)" }}
        >
          {renderStep()}
        </WavyCard>

        {/* Bottom trust strip — only during payment steps */}
        {step < 4 && (
          <p className="mt-5 text-center text-xs text-text-muted">
            🔒 Secure checkout · Cancel anytime · Free trial delivery
          </p>
        )}

      </div>
    </div>
  );
}
