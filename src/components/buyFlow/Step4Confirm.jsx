import { useNavigate } from "react-router-dom";
import { Calendar, Timer, Utensils } from "lucide-react";
import stickerBowl   from "../../assets/stickers/macra-sticker-bowl.png";
import stickerFlex   from "../../assets/stickers/macra-sticker-flex.png";
import stickerStreak from "../../assets/stickers/macra-sticker-streak.png";
import stickerGains  from "../../assets/stickers/macra-gains-loading.png";

const CONFETTI = [
  { src: stickerFlex,   rotate: -7, cls: "h-11 w-11" },
  { src: stickerStreak, rotate:  4, cls: "h-14 w-14" },
  { src: stickerGains,  rotate: -4, cls: "h-11 w-11" },
];

const SUMMARY_ROWS = (tier, plan, startStr) => [
  { icon: Utensils, label: "Bowl tier",      value: tier?.name },
  { icon: Calendar, label: "Plan",           value: `${plan?.name} · ${plan?.duration_days} days` },
  { icon: Timer,    label: "First delivery", value: startStr },
];

export default function Step4Confirm({ tier, plan }) {
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
  const startStr = tomorrow.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col items-center text-center">

      {/* Hero sticker with glow */}
      <div className="relative mt-2">
        <div
          className="absolute inset-0 -z-10 animate-pulse rounded-3xl blur-2xl"
          style={{ background: "rgba(44,211,119,0.25)" }}
        />
        <img
          src={stickerBowl}
          alt="So Good"
          className="h-28 w-28 rounded-3xl object-cover shadow-2xl"
          style={{ transform: "rotate(-5deg)" }}
        />
      </div>

      {/* Heading */}
      <h2 className="mt-5 font-heading text-3xl font-bold text-forest">You're in!</h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
        Your{" "}
        <span className="font-semibold text-forest">{plan?.name} plan</span>{" "}
        is live. First bowl drops{" "}
        <span className="font-semibold text-emerald">{startStr}</span>.
      </p>

      {/* Confetti sticker row */}
      <div className="mt-5 flex items-end justify-center gap-2">
        {CONFETTI.map(({ src, rotate, cls }, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className={`${cls} rounded-xl object-cover shadow-md transition-transform duration-200 hover:scale-110`}
            style={{ transform: `rotate(${rotate}deg)` }}
          />
        ))}
      </div>

      {/* Summary card */}
      <div className="mt-6 w-full overflow-hidden rounded-2xl border border-sage bg-white shadow-card">
        <div className="h-1" style={{ background: "linear-gradient(90deg, #2CD377, #16A85E)" }} />
        <div className="divide-y divide-sage p-5 text-left">
          {SUMMARY_ROWS(tier, plan, startStr).map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage">
                <Icon size={16} className="text-forest" />
              </div>
              <div>
                <p className="text-xs text-text-muted">{label}</p>
                <p className="font-heading text-sm font-semibold text-forest">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next step nudge */}
      <div className="mt-4 flex w-full items-start gap-2.5 rounded-xl p-3.5 text-left"
        style={{ background: "rgba(44,211,119,0.10)" }}>
        <span className="text-lg">📋</span>
        <p className="text-xs leading-relaxed text-text-muted">
          <strong className="text-forest">Next step:</strong> head to your dashboard to choose which
          bowls you want each day before the first delivery.
        </p>
      </div>

      {/* CTAs */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 w-full rounded-full py-4 font-heading text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #2CD377 0%, #16A85E 100%)" }}
      >
        Plan my first bowls →
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-3 text-sm text-text-muted transition-colors hover:text-forest"
      >
        Back to home
      </button>

    </div>
  );
}
