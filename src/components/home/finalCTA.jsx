import { useNavigate } from "react-router-dom";
import stickerZeroExcuses from "../../assets/stickers/macra-0-excuses.png";

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-bg py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">

          {/* Left: heading + subtext */}
          <div>
            <h2 className="font-heading text-2xl font-bold leading-tight text-forest sm:text-3xl lg:text-4xl">
              Try it nearly free. Subscribe only if you love it.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
              Four bowls, four days, one flat price. No commitment until you've
              tasted Macra.
            </p>
          </div>

          {/* Right: dark trial-box card */}
          <div className="relative overflow-hidden rounded-2xl bg-forest p-6 sm:p-8">
            {/* 0 Excuses sticker — top-right */}
            <img
              src={stickerZeroExcuses}
              alt="0 Excuses"
              className="absolute right-3 top-3 h-12 w-12 rounded-xl object-cover opacity-90 sm:right-4 sm:top-4 sm:h-16 sm:w-16"
              style={{ transform: "rotate(5deg)" }}
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
              Trial box
            </p>
            <p className="mt-2 font-heading text-xl font-bold text-white sm:text-2xl">
              4 bowls · ₹599
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Free delivery · cancel anytime · 
            </p>
            <button
              onClick={() => navigate("/subscribe")}
              className="mt-5 w-full rounded-full bg-emerald py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
            >
              Preorder now →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}