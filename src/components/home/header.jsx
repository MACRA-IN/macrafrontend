import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import macraLogo from "../../assets/logo/Macra.png";
import { useAuth } from "../../context/authContext";
import AuthModal from "../auth/authModal";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [postLoginRoute, setPostLoginRoute] = useState(null);

  const openAuthWithRedirect = (route) => { setPostLoginRoute(route); setShowAuth(true); };
  const handleAuthSuccess = () => { if (postLoginRoute) { navigate(postLoginRoute); setPostLoginRoute(null); } };
  const handleLogout = () => { logoutUser(); navigate("/"); };

  const navLinks = [
    { href: "/menu",     label: "Menu" },
    { href: "/#science", label: "The science" },
    { href: "/#plans",   label: "Plans" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <img
            src={macraLogo}
            alt="Macra"
            className="h-10 w-auto cursor-pointer sm:h-12"
            onClick={() => navigate("/")}
          />

          {/* Desktop nav */}
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

          {/* Desktop right actions */}
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-sage/40"
                >
                  <User size={15} />
                  {user.name ?? user.email}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <LogOut size={14} /> Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald"
              >
                Log in
              </button>
            )}

            <button
              onClick={() => user ? navigate("/subscribe") : openAuthWithRedirect("/subscribe")}
              className="rounded-full bg-emerald px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
            >
              Order Now
            </button>
          </div>

          {/* Mobile: logo is left, nothing on right (nav is in sticky bottom bar) */}
        </div>
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />}
    </>
  );
};

export default Header;
