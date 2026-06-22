import snakLogo from "../../assets/logo/snak_logo.png";

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">

          {/* Brand + email */}
          <div className="lg:col-span-1">
            <img src={snakLogo} alt="Snak" className="h-10 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Ready-to-eat bowls engineered to the gram. Join the founding batch
              and help shape the menu.
            </p>
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-full px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
              />
              <button className="shrink-0 rounded-full bg-emerald px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark">
                Notify me
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:pl-16">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                Product
              </p>
              <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <li><a href="#bowls"   className="transition-colors hover:text-white">The bowls</a></li>
                <li><a href="#science" className="transition-colors hover:text-white">The science</a></li>
                <li><a href="#plans"   className="transition-colors hover:text-white">Plans &amp; pricing</a></li>
                <li><a href="#"        className="transition-colors hover:text-white">Nutrition data</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                Company
              </p>
              <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <li><a href="#" className="transition-colors hover:text-white">Our story</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Sourcing</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Careers</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-xs sm:flex-row sm:justify-between sm:px-6"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <p>© 2026 Evolve TECH PVT LIMITED · FOUNDING BATCH PREORDER</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">Nutrition Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
