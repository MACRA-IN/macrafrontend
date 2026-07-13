import macraLogo from "../../assets/logo/Macra.png";
import stickerBuiltDifferent from "../../assets/stickers/macra-built-different.png";
import stickerVibe           from "../../assets/stickers/macra-sticker-vibe.png";
import stickerNoBroScience   from "../../assets/stickers/macra-no-bro-science.png";
import stickerBowl           from "../../assets/stickers/macra-sticker-bowl.png";
import stickerDelivery       from "../../assets/stickers/macra-kitchen-to-doorstep.png";
import stickerEatSleepGains  from "../../assets/stickers/macra-eat-sleep-gains.png";
import stickerStreak         from "../../assets/stickers/macra-sticker-streak.png";

/* Sticker scene — tallest in centre, flanking ones step down */
const SCENE = [
  { src: stickerBuiltDifferent, alt: "Built Different",     rotate: -5, cls: "hidden sm:block h-20 w-20 lg:h-24 lg:w-24" },
  { src: stickerStreak,         alt: "Protein Power",       rotate:  3, cls: "h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28" },
  { src: stickerVibe,           alt: "Eating Clean",        rotate: -3, cls: "h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32" },
  { src: stickerNoBroScience,   alt: "No Bro Science",      rotate:  2, cls: "h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36" },
  { src: stickerBowl,           alt: "So Good",             rotate: -2, cls: "h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32" },
  { src: stickerDelivery,       alt: "Kitchen to Doorstep", rotate:  4, cls: "h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28" },
  { src: stickerEatSleepGains,  alt: "Eat Sleep Gains",     rotate: -4, cls: "hidden sm:block h-20 w-20 lg:h-24 lg:w-24" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">

          {/* Brand + email */}
          <div className="lg:col-span-1">
            <img src={macraLogo} alt="Macra" className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Fresh, macro-perfect protein bowls delivered daily across Hyderabad.
              Subscribe, plan your week, eat clean.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Get launch updates
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-emerald"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
              />
              <button className="shrink-0 rounded-full bg-emerald px-4 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark">
                Notify
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Product
            </p>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li><a href="/menu"      className="transition-colors hover:text-white">Menu</a></li>
              <li><a href="/#plans"    className="transition-colors hover:text-white">Plans</a></li>
              <li><a href="/#science"  className="transition-colors hover:text-white">The science</a></li>
              <li><a href="/subscribe" className="transition-colors hover:text-white">Start trial</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Legal
            </p>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li><a href="/privacy-policy"  className="transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms"           className="transition-colors hover:text-white">Terms &amp; Conditions</a></li>
              <li><a href="/refund-policy"   className="transition-colors hover:text-white">Refund Policy</a></li>
              <li><a href="/delivery-policy" className="transition-colors hover:text-white">Delivery Policy</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Company
            </p>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li><a href="/about"   className="transition-colors hover:text-white">About</a></li>
              <li><a href="/contact" className="transition-colors hover:text-white">Contact Us</a></li>
              <li>
                <a
                  href="https://www.instagram.com/trymacra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Sticker scene — characters lined up along the bottom */}
        <div className="mt-12 flex items-end justify-center gap-2 sm:mt-16 sm:gap-4 lg:gap-5">
          {SCENE.map(({ src, alt, rotate, cls }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className={`shrink-0 rounded-2xl object-cover shadow-xl transition-transform duration-200 hover:scale-105 ${cls}`}
              style={{ transform: `rotate(${rotate}deg)` }}
            />
          ))}
        </div>

      </div>

      {/* Copyright bar */}
      <div className="mt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-4 text-xs sm:flex-row sm:justify-between sm:px-6"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <p>© 2026 Macra · KPHB, Hyderabad, Telangana, India</p>
          <p>nandu@macra.in · +91 83091 80145</p>
        </div>
      </div>
    </footer>
  );
}
