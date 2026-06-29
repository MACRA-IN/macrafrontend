import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { validateLogin, FieldWrapper, Spinner } from "./authUtils";

export default function LoginForm({ onSubmit, onGoogleLogin, onForgot, onSwitch, loading, apiError }) {
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [showPw,  setShowPw]  = useState(false);

  const errors  = validateLogin(form);
  const touch   = (f) => setTouched((t) => ({ ...t, [f]: true }));
  const update  = (f, v) => setForm((p) => ({ ...p, [f]: v }));

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
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length > 0) return;
    onSubmit(form);
  };

  return (
    <>
      <div className="mt-4 flex justify-center">
        <GoogleLogin onSuccess={onGoogleLogin} onError={() => {}} width="400" shape="rectangular" theme="outline" text="signin_with_google" />
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
        <FieldWrapper label="Email address" error={errors.email} touched={touched.email}>
          <input type="email" placeholder="you@example.com" autoComplete="email" value={form.email}
            onChange={(e) => update("email", e.target.value)} onBlur={() => touch("email")} className={inputCls("email")} />
        </FieldWrapper>

        <FieldWrapper label="Password" error={errors.password} touched={touched.password}>
          <div className="relative">
            <input type={showPw ? "text" : "password"} placeholder="Your password" autoComplete="current-password"
              value={form.password} onChange={(e) => update("password", e.target.value)} onBlur={() => touch("password")}
              className={`${inputCls("password")} pr-11`} />
            <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </FieldWrapper>

        <div className="flex justify-end -mt-2">
          <button type="button" onClick={onForgot} className="text-xs font-medium text-emerald-dark hover:underline">
            Forgot password?
          </button>
        </div>

        <button type="submit" disabled={loading}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-60">
          {loading && <Spinner />}
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-text-muted">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-semibold text-emerald-dark hover:underline">Sign up free</button>
      </p>
    </>
  );
}
