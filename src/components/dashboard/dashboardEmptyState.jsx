import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, LogOut } from "lucide-react";

const BENEFITS = [
  "Macro-balanced bowls crafted by nutritionists",
  "Pause or skip any delivery, no questions asked",
  "Cancel anytime — zero lock-in",
];

export default function DashboardEmptyState({ onLogout }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-sm px-4 py-20 text-center sm:px-6">
      {/* Illustration */}
      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
        style={{ background: "linear-gradient(135deg, #E3F2E8 0%, #c8ead4 100%)" }}
      >
        <span className="text-4xl leading-none">🥗</span>
      </div>

      <h1 className="mt-6 font-heading text-2xl font-bold text-forest sm:text-3xl">
        Your first bowl is waiting
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Start your free trial and get fresh macro-balanced bowls delivered to your door every day.
      </p>

      {/* Benefit bullets */}
      <ul className="mt-6 flex flex-col gap-2.5 text-left">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-forest">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(44,211,119,0.15)" }}
            >
              <Check size={11} style={{ color: "#2CD377" }} strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/subscribe")}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 font-heading text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #2CD377 0%, #16A85E 100%)" }}
      >
        Start your free trial <ArrowRight size={16} />
      </button>

      <div className="mt-8 border-t border-sage pt-6">
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-forest"
        >
          <LogOut size={14} /> Log out
        </button>
      </div>
    </div>
  );
}
