import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw,          setShowPw]          = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState("");
  const [success,         setSuccess]         = useState(false);

  const handleReset = async () => {
    setError("");
    if (!password || password.length < 8) return setError("Minimum 8 characters required");
    if (password !== confirmPassword) return setError("Passwords don't match");

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid or expired reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-forest">Reset your password</h1>
          <p className="text-sm text-text-muted mt-1">Enter your new password below</p>
        </div>

        <div className="bg-white border border-sage/40 rounded-3xl px-8 py-8 flex flex-col gap-4">

          {success ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <CheckCircle2 size={48} className="text-emerald" />
              <p className="text-forest font-semibold">Password reset successfully!</p>
              <p className="text-text-muted text-sm">Redirecting to home...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <p className="text-red-500 text-xs font-medium">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-forest">New password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-sage px-4 py-3 text-sm text-forest outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/10 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-forest"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-forest">Confirm password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-sage px-4 py-3 text-sm text-forest outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/10"
                />
              </div>

              <button
                onClick={handleReset}
                disabled={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {loading ? "Resetting..." : "Reset password"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}