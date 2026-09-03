import { useState } from "react";
import { Bolt, Star } from "lucide-react";

export default function AnnouncementBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="relative w-full overflow-hidden bg-emerald">
      <Star className="pointer-events-none absolute left-[8%] top-1.5 hidden -rotate-[15deg] text-forest/25 sm:block" size={13} />
      <Star className="pointer-events-none absolute bottom-1 right-[22%] hidden rotate-12 text-white/50 sm:block" size={11} />

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-3 py-2.5 sm:gap-3.5 sm:px-6 sm:py-3.5">
        {/* mobile stamp */}
        <span className="flex h-[34px] w-[34px] shrink-0 rotate-[9deg] items-center justify-center rounded-full border-2 border-white bg-forest text-punch sm:hidden">
          <Bolt size={16} />
        </span>

        {/* desktop badge */}
        <span className="hidden -rotate-[5deg] items-center gap-1.5 rounded-full border-2 border-forest bg-punch px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-forest sm:inline-flex">
          <Bolt size={13} /> Coming soon
        </span>

        <span
          className="font-heading text-sm font-bold tracking-tight text-white sm:text-xl"
          style={{ textShadow: "2px 2px 0 #0F3D24" }}
        >
          <span className="sm:hidden">10-min delivery soon</span>
          <span className="hidden sm:inline">10-minute delivery in Hyderabad</span>
        </span>

        {/* desktop stamp */}
        <span className="hidden h-[46px] w-[46px] rotate-[9deg] flex-col items-center justify-center rounded-full border-2 border-white bg-forest font-mono leading-none text-punch sm:flex">
          <span className="text-sm font-semibold">10</span>
          <span className="text-[8px] tracking-[0.1em]">MIN</span>
        </span>
      </div>

      <button
        onClick={() => setShow(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-lg leading-none text-forest/50 transition-colors hover:text-forest sm:right-6"
      >
        ×
      </button>
    </div>
  );
}