import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, UtensilsCrossed, Sparkles, LayoutDashboard, User, LogIn } from "lucide-react";
import { useAuth } from "../../context/authContext";
import AuthModal from "../auth/authModal";

const TABS = [
  { id: "home", icon: Home,             label: "Home",    path: "/",          exact: true  },
  { id: "menu", icon: UtensilsCrossed,  label: "Menu",    path: "/menu",      exact: false },
  { id: "plan", icon: LayoutDashboard,  label: "My Plan", path: "/dashboard", exact: false, authRequired: true },
];

const HIDDEN_ON = ["/subscribe"];

export default function MobileNav() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const [showAuth, setShowAuth]         = useState(false);
  const [redirectAfterAuth, setRedirect] = useState(null);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const handleAuthSuccess = () => {
    if (redirectAfterAuth) { navigate(redirectAfterAuth); setRedirect(null); }
  };

  const handleTap = (tab) => {
    if (tab.authRequired && !user) {
      setRedirect(tab.path);
      setShowAuth(true);
    } else {
      navigate(tab.path);
    }
  };

  const isActive = (tab) =>
    tab.exact ? pathname === tab.path : pathname.startsWith(tab.path);

  const accountActive = pathname.startsWith("/dashboard");

  return (
    <>
      {/* Space so page content isn't hidden behind the nav */}
      <div className="h-16 md:hidden" />

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.08)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="grid h-16 items-stretch" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>

          {/* Home */}
          <TabButton tab={TABS[0]} active={isActive(TABS[0])} onTap={handleTap} />

          {/* Menu */}
          <TabButton tab={TABS[1]} active={isActive(TABS[1])} onTap={handleTap} />

          {/* Order CTA — center */}
          <button
            onClick={() => {
              if (!user) { setRedirect("/subscribe"); setShowAuth(true); }
              else navigate("/subscribe");
            }}
            className="flex flex-col items-center justify-center transition-all active:scale-95"
          >
            <div
              className="flex h-10 items-center justify-center gap-1.5 rounded-2xl px-3"
              style={{
                background: "linear-gradient(135deg, #2CD377 0%, #16A85E 100%)",
                boxShadow: "0 4px 16px rgba(44,211,119,0.45)",
              }}
            >
              <Sparkles size={15} strokeWidth={2.5} className="text-white" />
              <span className="font-heading text-xs font-bold leading-none text-white">Order</span>
            </div>
          </button>

          {/* My Plan */}
          <TabButton tab={TABS[2]} active={isActive(TABS[2])} onTap={handleTap} />

          {/* Account / Log in */}
          <button
            onClick={() => {
              if (user) navigate("/dashboard");
              else setShowAuth(true);
            }}
            className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
                accountActive ? "bg-emerald/10" : ""
              }`}
            >
              {user ? (
                <User
                  size={20}
                  strokeWidth={accountActive ? 2.5 : 1.8}
                  className={accountActive ? "text-emerald" : "text-gray-400"}
                />
              ) : (
                <LogIn size={20} strokeWidth={1.8} className="text-gray-400" />
              )}
            </div>
            <span
              className={`text-[10px] font-semibold leading-none transition-colors ${
                accountActive ? "text-emerald" : "text-gray-400"
              }`}
            >
              {user ? (user.name?.split(" ")[0] ?? "You") : "Log in"}
            </span>
          </button>

        </div>
      </nav>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />
      )}
    </>
  );
}

function TabButton({ tab, active, onTap }) {
  return (
    <button
      onClick={() => onTap(tab)}
      className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
          active ? "bg-emerald/10" : ""
        }`}
      >
        <tab.icon
          size={20}
          strokeWidth={active ? 2.5 : 1.8}
          className={`transition-colors ${active ? "text-emerald" : "text-gray-400"}`}
        />
      </div>
      <span
        className={`text-[10px] font-semibold leading-none transition-colors ${
          active ? "text-emerald" : "text-gray-400"
        }`}
      >
        {tab.label}
      </span>
    </button>
  );
}
