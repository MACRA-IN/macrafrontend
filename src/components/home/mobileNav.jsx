import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, UtensilsCrossed, Sparkles, User, LogIn } from "lucide-react";
import { useAuth } from "../../context/authContext";
import AuthModal from "../auth/authModal";

const WA_NUMBER = "918309180145";
const WA_MESSAGE = encodeURIComponent("Hi! I need help with my Macra subscription.");

const HIDDEN_ON = ["/subscribe"];

/* WhatsApp SVG — keeps the recognisable logo without an external dependency */
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.704a.5.5 0 0 0 .614.644l5.998-1.47A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.368l-.36-.213-3.716.91.944-3.613-.234-.373A9.817 9.817 0 0 1 2.182 12C2.182 6.57 6.569 2.182 12 2.182S21.818 6.57 21.818 12 17.431 21.818 12 21.818z" />
    </svg>
  );
}

export default function MobileNav() {
  const { user } = useAuth();
  const navigate     = useNavigate();
  const { pathname } = useLocation();
  const [showAuth, setShowAuth]         = useState(false);
  const [redirectAfterAuth, setRedirect] = useState(null);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const handleAuthSuccess = () => {
    if (redirectAfterAuth) { navigate(redirectAfterAuth); setRedirect(null); }
  };

  const isActive = (path, exact = false) =>
    exact ? pathname === path : pathname.startsWith(path);

  const accountActive = pathname.startsWith("/dashboard");

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Spacer — keeps page content above the fixed bar */}
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
          <NavTab
            icon={Home}
            label="Home"
            active={isActive("/", true)}
            onTap={() => navigate("/")}
          />

          {/* Menu */}
          <NavTab
            icon={UtensilsCrossed}
            label="Menu"
            active={isActive("/menu")}
            onTap={() => navigate("/menu")}
          />

          {/* Order — centre CTA */}
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

          {/* WhatsApp support */}
          <button
            onClick={openWhatsApp}
            className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#25D366]/10 transition-colors">
              <span className="text-[#25D366]">
                <WhatsAppIcon size={19} />
              </span>
            </div>
            <span className="text-[10px] font-semibold leading-none text-[#25D366]">
              Support
            </span>
          </button>

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

function NavTab({ icon: Icon, label, active, onTap }) {
  return (
    <button
      onClick={onTap}
      className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
          active ? "bg-emerald/10" : ""
        }`}
      >
        <Icon
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
        {label}
      </span>
    </button>
  );
}
