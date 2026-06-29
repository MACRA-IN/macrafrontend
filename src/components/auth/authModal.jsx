import { useState } from "react";
import { X } from "lucide-react";
import { googleAuth, login, register } from "../../services/authService";
import { useAuth } from "../../context/authContext";
import ForgotPasswordView from "./ForgotPasswordView";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function AuthModal({ onClose, onSuccess }) {
  const { loginUser } = useAuth();
  const [tab,      setTab]      = useState("login");
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const switchTab = (t) => { setTab(t); setApiError(""); };

  const handleGoogleLogin = async (credentialResponse) => {
    setApiError(""); setLoading(true);
    try {
      const data = await googleAuth(credentialResponse.credential);
      loginUser(data.token, data.customer);
      onClose(); onSuccess?.();
    } catch {
      setApiError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (form) => {
    setApiError(""); setLoading(true);
    try {
      const data = await login(form.email, form.password);
      loginUser(data.token, data.customer ?? data.user ?? { email: form.email });
      onClose(); onSuccess?.();
    } catch (err) {
      setApiError(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (form) => {
    setApiError(""); setLoading(true);
    try {
      const data = await register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
      loginUser(data.token, data.customer ?? data.user ?? { email: form.email });
      onClose(); onSuccess?.();
    } catch (err) {
      setApiError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      style={{ backgroundColor: "rgba(15,43,29,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl"
        style={{ maxHeight: "95dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-sage" />
        </div>

        <div className="px-6 pb-8 pt-5 sm:px-8 sm:pb-8 sm:pt-7">
          <button onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-1.5 text-text-muted transition-colors hover:bg-sage/60 hover:text-forest">
            <X size={18} />
          </button>

          {tab === "forgot" ? (
            <ForgotPasswordView onBack={() => switchTab("login")} />
          ) : (
            <>
              <h2 className="font-heading text-2xl font-bold text-forest">
                {tab === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                {tab === "login"
                  ? "Log in to manage your Macra subscription."
                  : "Join the founding batch and get early access."}
              </p>

              <div className="mt-5 flex rounded-xl bg-sage/40 p-1">
                {[["login", "Log in"], ["register", "Sign up"]].map(([t, label]) => (
                  <button key={t} type="button" onClick={() => switchTab(t)}
                    className={`flex-1 rounded-lg py-2.5 font-heading text-sm font-semibold transition-all ${
                      tab === t ? "bg-white text-forest shadow-sm" : "text-text-muted hover:text-forest"
                    }`}>
                    {label}
                  </button>
                ))}
              </div>

              {tab === "login" ? (
                <LoginForm
                  onSubmit={handleLogin}
                  onGoogleLogin={handleGoogleLogin}
                  onForgot={() => switchTab("forgot")}
                  onSwitch={() => switchTab("register")}
                  loading={loading}
                  apiError={apiError}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  onGoogleLogin={handleGoogleLogin}
                  onSwitch={() => switchTab("login")}
                  loading={loading}
                  apiError={apiError}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
