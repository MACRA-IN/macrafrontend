import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { forgotPassword } from "../../services/authService";
import { EMAIL_RE, FieldWrapper, Spinner } from "./authUtils";

export default function ForgotPasswordView({ onBack }) {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  const handle = async () => {
    setError(""); setSuccess("");
    if (!email)                     return setError("Email is required");
    if (!EMAIL_RE.test(email))      return setError("Enter a valid email address");
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setSuccess(data.message);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-heading text-2xl font-bold text-forest">Forgot password?</h2>
      <p className="mt-1 text-sm text-text-muted">Enter your email and we'll send you a reset link.</p>

      <div className="mt-5 flex flex-col gap-4">
        <FieldWrapper label="Email address" error={error} touched={!!error}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-sage bg-white px-4 py-3 text-sm text-forest outline-none transition-all focus:border-emerald focus:ring-2 focus:ring-emerald/10"
          />
        </FieldWrapper>

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald/20 bg-emerald/10 px-4 py-3">
            <CheckCircle2 size={15} className="shrink-0 text-emerald" />
            <p className="text-sm font-medium text-emerald-dark">{success}</p>
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={handle}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Spinner />}
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <button type="button" onClick={onBack} className="text-center text-xs text-text-muted hover:text-forest">
          ← Back to login
        </button>
      </div>
    </>
  );
}
