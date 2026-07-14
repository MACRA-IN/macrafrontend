import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { validateRegister, FieldWrapper, pwStrength, Spinner } from "./authUtils";

export default function RegisterForm({ onSubmit, onGoogleLogin, onSwitch, loading, apiError }) {
  const [form,    setForm]       = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [touched, setTouched]    = useState({});
  const [showPw,  setShowPw]     = useState(false);
  const [showCfm, setShowCfm]    = useState(false);

  const errors = validateRegister(form);
  const touch  = (f) => setTouched((t) => ({ ...t, [f]: true }));
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const inputCls = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-forest bg-white outline-none transition-all placeholder:text-text-muted/60 focus:ring-2 ${
      touched[field] && errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : touched[field] && !errors[field]
        ? "border-emerald focus:border-emerald focus:ring-emerald/10"
        : "border-sage focus:border-emerald focus:ring-emerald/10"
    }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    if (Object.keys(errors).length > 0) return;
    onSubmit(form);
  };

  return (
    <>
      <div className="mt-4 flex justify-center">
        <GoogleLogin onSuccess={onGoogleLogin} onError={() => {}} width="400" shape="rectangular" theme="outline" text="signup_with_google" />
      </div>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-sage/50" />
        <span className="text-xs font-medium text-text-muted">or continue with email</span>
        <div className="h-px flex-1 bg-sage/50" />
      </div>

      {apiError && (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
          <p className="text-sm text-red-600">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FieldWrapper label="Full name" error={errors.name} touched={touched.name}>
          <input type="text" placeholder="Enter Your Name" autoComplete="name" value={form.name}
            onChange={(e) => update("name", e.target.value)} onBlur={() => touch("name")} className={inputCls("name")} />
        </FieldWrapper>

        <FieldWrapper label="Email address" error={errors.email} touched={touched.email}>
          <input type="email" placeholder="you@example.com" autoComplete="email" value={form.email}
            onChange={(e) => update("email", e.target.value)} onBlur={() => touch("email")} className={inputCls("email")} />
        </FieldWrapper>

        <FieldWrapper label="Phone number (*)" error={errors.phone} touched={touched.phone}>
          <div className="flex overflow-hidden rounded-xl border border-sage focus-within:border-emerald focus-within:ring-2 focus-within:ring-emerald/10">
            <span className="flex items-center border-r border-sage bg-sage/30 px-3 text-sm font-medium text-text-muted">+91</span>
            <input type="tel" placeholder="9876543210" autoComplete="tel" maxLength={10}
              value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
              onBlur={() => touch("phone")} className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-forest outline-none" />
          </div>
        </FieldWrapper>

        <FieldWrapper label="Password" error={errors.password} touched={touched.password}>
          <div className="relative">
            <input type={showPw ? "text" : "password"} placeholder="Create a strong password" autoComplete="new-password"
              value={form.password} onChange={(e) => update("password", e.target.value)} onBlur={() => touch("password")}
              className={`${inputCls("password")} pr-11`} />
            <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </FieldWrapper>

        {form.password.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-sage/30 px-4 py-3">
            {pwStrength(form.password).map(({ ok, text }) => (
              <span key={text} className={`flex items-center gap-1.5 text-xs transition-colors ${ok ? "text-emerald-dark" : "text-text-muted"}`}>
                <CheckCircle2 size={12} className={`shrink-0 ${ok ? "text-emerald" : "text-gray-300"}`} />
                {text}
              </span>
            ))}
          </div>
        )}

        <FieldWrapper label="Confirm password" error={errors.confirmPassword} touched={touched.confirmPassword}>
          <div className="relative">
            <input type={showCfm ? "text" : "password"} placeholder="Re-enter your password" autoComplete="new-password"
              value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)}
              onBlur={() => touch("confirmPassword")} className={`${inputCls("confirmPassword")} pr-11`} />
            <button type="button" tabIndex={-1} onClick={() => setShowCfm(!showCfm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest">
              {showCfm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </FieldWrapper>

        <button type="submit" disabled={loading}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-60">
          {loading && <Spinner />}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-text-muted">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-semibold text-emerald-dark hover:underline">Log in</button>
      </p>
    </>
  );
}
