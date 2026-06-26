import { useState } from "react";
import { X, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { login, register } from "../../services/authService";
import { useAuth } from "../../context/authContext";

/* ─── Validators ─── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

function validateLogin({ email, password }) {
  const e = {};
  if (!email)                          e.email    = "Email is required";
  else if (!EMAIL_RE.test(email))      e.email    = "Enter a valid email address";
  if (!password)                       e.password = "Password is required";
  else if (password.length < 6)        e.password = "Minimum 6 characters";
  return e;
}

function validateRegister({ name, email, phone, password, confirmPassword }) {
  const e = {};
  if (!name.trim())                       e.name            = "Full name is required";
  else if (name.trim().length < 2)        e.name            = "Name must be at least 2 characters";
  else if (!/^[a-zA-Z\s]+$/.test(name))  e.name            = "Name can only contain letters";

  if (!email)                             e.email           = "Email is required";
  else if (!EMAIL_RE.test(email))         e.email           = "Enter a valid email address";

  if (phone && !PHONE_RE.test(phone))     e.phone           = "Enter a valid 10-digit mobile number";

  if (!password)                          e.password        = "Password is required";
  else if (password.length < 8)           e.password        = "Minimum 8 characters required";
  else if (!/(?=.*[a-z])/.test(password)) e.password        = "Include at least one lowercase letter";
  else if (!/(?=.*[A-Z])/.test(password)) e.password        = "Include at least one uppercase letter";
  else if (!/(?=.*\d)/.test(password))    e.password        = "Include at least one number";

  if (!confirmPassword)                   e.confirmPassword = "Please confirm your password";
  else if (password !== confirmPassword)  e.confirmPassword = "Passwords don't match";
  return e;
}

/* ─── Sub-components ─── */
function FieldWrapper({ label, error, touched, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-forest">{label}</label>
      {children}
      {touched && error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const pwStrength = (pw) => [
  { ok: pw.length >= 8,           text: "At least 8 characters" },
  { ok: /[A-Z]/.test(pw),         text: "One uppercase letter"  },
  { ok: /[a-z]/.test(pw),         text: "One lowercase letter"  },
  { ok: /\d/.test(pw),            text: "One number"            },
];

/* ─── Main component ─── */
export default function AuthModal({ onClose, onSuccess }) {
  const { loginUser } = useAuth();

  const [tab,         setTab]         = useState("login");
  const [loading,     setLoading]     = useState(false);
  const [apiError,    setApiError]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [lf, setLf] = useState({ email: "", password: "" });
  const [lt, setLt] = useState({});

  const [rf, setRf] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [rt, setRt] = useState({});

  const isLogin    = tab === "login";
  const form       = isLogin ? lf  : rf;
  const touched    = isLogin ? lt  : rt;
  const setForm    = isLogin ? setLf : setRf;
  const setTouched = isLogin ? setLt : setRt;
  const errors     = isLogin ? validateLogin(lf) : validateRegister(rf);

  const touch  = (field) => setTouched((t) => ({ ...t, [field]: true }));
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const inputCls = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-forest bg-white outline-none transition-all placeholder:text-text-muted/60 focus:ring-2 ${
      touched[field] && errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : touched[field] && !errors[field]
          ? "border-emerald focus:border-emerald focus:ring-emerald/10"
          : "border-sage focus:border-emerald focus:ring-emerald/10"
    }`;

  const switchTab = (t) => {
    setTab(t);
    setApiError("");
    setShowPw(false);
    setShowConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields touched so errors surface
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    if (Object.keys(errors).length > 0) return;

    setApiError("");
    setLoading(true);
    try {
      let data;
      if (isLogin) {
        data = await login(lf.email, lf.password);
      } else {
        data = await register({ name: rf.name, email: rf.email, password: rf.password, phone: rf.phone });
      }
      loginUser(data.token, data.customer ?? data.user ?? { email: form.email });
      onClose();
      onSuccess?.();
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
        (isLogin ? "Invalid email or password." : "Registration failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      style={{ backgroundColor: "rgba(15,43,29,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Card – bottom sheet on mobile, centered on sm+ */}
      <div
        className="relative w-full max-w-md overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl"
        style={{ maxHeight: "95dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-sage" />
        </div>

        <div className="px-6 pb-8 pt-5 sm:px-8 sm:pb-8 sm:pt-7">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-1.5 text-text-muted transition-colors hover:bg-sage/60 hover:text-forest"
          >
            <X size={18} />
          </button>

          {/* Heading */}
          <h2 className="font-heading text-2xl font-bold text-forest">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {isLogin
              ? "Log in to manage your Macra subscription."
              : "Join the founding batch and get early access."}
          </p>

          {/* Tab switcher */}
          <div className="mt-5 flex rounded-xl bg-sage/40 p-1">
            {[["login", "Log in"], ["register", "Sign up"]].map(([t, label]) => (
              <button
                key={t}
                type="button"
                onClick={() => switchTab(t)}
                className={`flex-1 rounded-lg py-2.5 font-heading text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-white text-forest shadow-sm"
                    : "text-text-muted hover:text-forest"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* API error banner */}
          {apiError && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">

            {/* ── Name (register only) ── */}
            {!isLogin && (
              <FieldWrapper label="Full name" error={errors.name} touched={rt.name}>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  autoComplete="name"
                  value={rf.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => touch("name")}
                  className={inputCls("name")}
                />
              </FieldWrapper>
            )}

            {/* ── Email ── */}
            <FieldWrapper label="Email address" error={errors.email} touched={touched.email}>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => touch("email")}
                className={inputCls("email")}
              />
            </FieldWrapper>

            {/* ── Phone (register only) ── */}
            {!isLogin && (
              <FieldWrapper label="Phone number (optional)" error={errors.phone} touched={rt.phone}>
                <div className="flex overflow-hidden rounded-xl border border-sage focus-within:border-emerald focus-within:ring-2 focus-within:ring-emerald/10">
                  <span className="flex items-center border-r border-sage bg-sage/30 px-3 text-sm font-medium text-text-muted">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    autoComplete="tel"
                    maxLength={10}
                    value={rf.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                    onBlur={() => touch("phone")}
                    className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-forest outline-none"
                  />
                </div>
                {rt.phone && errors.phone && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={11} className="shrink-0" /> {errors.phone}
                  </p>
                )}
              </FieldWrapper>
            )}

            {/* ── Password ── */}
            <FieldWrapper label="Password" error={errors.password} touched={touched.password}>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder={isLogin ? "Your password" : "Create a strong password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  onBlur={() => touch("password")}
                  className={`${inputCls("password")} pr-11`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </FieldWrapper>

            {/* ── Password strength (register only) ── */}
            {!isLogin && rf.password.length > 0 && (
              <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-sage/30 px-4 py-3">
                {pwStrength(rf.password).map(({ ok, text }) => (
                  <span
                    key={text}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      ok ? "text-emerald-dark" : "text-text-muted"
                    }`}
                  >
                    <CheckCircle2
                      size={12}
                      className={`shrink-0 ${ok ? "text-emerald" : "text-gray-300"}`}
                    />
                    {text}
                  </span>
                ))}
              </div>
            )}

            {/* ── Confirm password (register only) ── */}
            {!isLogin && (
              <FieldWrapper label="Confirm password" error={errors.confirmPassword} touched={rt.confirmPassword}>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    value={rf.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    onBlur={() => touch("confirmPassword")}
                    className={`${inputCls("confirmPassword")} pr-11`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FieldWrapper>
            )}

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {loading
                ? (isLogin ? "Logging in…" : "Creating account…")
                : (isLogin ? "Log in" : "Create account")}
            </button>

          </form>

          {/* Switch tab */}
          <p className="mt-5 text-center text-xs text-text-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => switchTab(isLogin ? "register" : "login")}
              className="font-semibold text-emerald-dark hover:underline"
            >
              {isLogin ? "Sign up free" : "Log in"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
