import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import macraLogo from "../../assets/logo/Macra.png";
import { useAuth } from "../../context/authContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/#science", label: "The science" },
    { href: "/#plans", label: "Plans" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <img
          src={macraLogo}
          alt="Macra"
          className="h-10 w-auto cursor-pointer sm:h-12"
          onClick={() => navigate("/")}
        />

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden items-center gap-1.5 text-sm font-medium text-forest md:flex"
              >
                <User size={15} /> {user.name ?? user.email}
              </button>
              <button
                onClick={() => logoutUser()}
                className="hidden items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 md:flex"
              >
                <LogOut size={14} /> Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-emerald md:block"
            >
              Log in
            </button>
          )}

          <button
            onClick={() => navigate("/subscribe")}
            className="hidden rounded-full bg-emerald px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark md:block"
          >
            Start trial
          </button>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-50 md:hidden"
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            {navOpen ? <X size={18} className="text-forest" /> : <Menu size={18} className="text-forest" />}
          </button>
        </div>
      </div>

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
              <>
                <button
                  onClick={() => { navigate("/dashboard"); setNavOpen(false); }}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-sage/40"
                >
                  My dashboard
                </button>
                <button
                  onClick={() => { logoutUser(); setNavOpen(false); }}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-sage/40"
                >
                  Log out ({user.name ?? user.email})
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate("/login"); setNavOpen(false); }}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-sage/40"
              >
                Log in
              </button>
            )}
          </nav>
          <button
            onClick={() => { setNavOpen(false); navigate("/subscribe"); }}
            className="mt-4 w-full rounded-full bg-emerald py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            Start trial
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;