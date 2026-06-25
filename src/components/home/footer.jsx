import macraLogo from "../../assets/logo/Macra.png";

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
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
                  href="https://instagram.com/macra.in"
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
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-4 text-xs sm:flex-row sm:justify-between sm:px-6"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <p>© 2026 Macra · KPHB, Hyderabad, Telangana, India</p>
          <p>nanduboda13@gmail.com · +91 83091 80145</p>
        </div>
      </div>
    </footer>
  );
}
