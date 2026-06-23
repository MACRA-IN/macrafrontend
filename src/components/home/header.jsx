import { useState } from "react";
import { ShoppingBag, Menu, X, LogOut, User } from "lucide-react";
import snakLogo from "../../assets/logo/Macra.png";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import AuthModal from "../auth/authModal";

export default function Header() {
  const { user, logoutUser } = useAuth();
  const { cartCount, openCart, clearCart } = useCart();
  const [navOpen, setNavOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navLinks = [
    { href: "#bowls", label: "Bowls" },
    { href: "#science", label: "The science" },
    { href: "#plans", label: "Plans" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <img src={snakLogo} alt="Snak" className="h-10 w-auto sm:h-12" />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald">
                {label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden items-center gap-1.5 text-sm font-medium text-forest md:flex">
                  <User size={15} /> {user.name ?? user.email}
                </span>
                <button
                  onClick={() => { clearCart(); logoutUser(); }}
                  className="hidden items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 md:flex"
                >
                  <LogOut size={14} /> Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-emerald md:block"
              >
                Log in
              </button>
            )}

            {/* Cart button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
            >
              <ShoppingBag size={16} strokeWidth={2} className="text-forest" />
              <span className="font-heading text-sm font-semibold text-forest">
                {cartCount}
              </span>
            </button>

            {/* Preorder */}
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden rounded-full bg-emerald px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark md:block"
            >
              Preorder
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-50 md:hidden"
              aria-label={navOpen ? "Close menu" : "Open menu"}
            >
              {navOpen ? <X size={18} className="text-forest" /> : <Menu size={18} className="text-forest" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {navOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-5 md:hidden">
            <nav className="flex flex-col gap-1 pt-3">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-sage/40 hover:text-forest"
                >
                  {label}
                </a>
              ))}
              {user ? (
                <button
                  onClick={() => { clearCart(); logoutUser(); setNavOpen(false); }}
                  className="mt-1 rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-sage/40"
                >
                  Log out ({user.name ?? user.email})
                </button>
              ) : (
                <button
                  onClick={() => { setAuthOpen(true); setNavOpen(false); }}
                  className="mt-1 rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-sage/40"
                >
                  Log in
                </button>
              )}
            </nav>
            <button
              onClick={() => { setNavOpen(false); setAuthOpen(true); }}
              className="mt-4 w-full rounded-full bg-emerald py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
            >
              Preorder now
            </button>
          </div>
        )}
      </header>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
