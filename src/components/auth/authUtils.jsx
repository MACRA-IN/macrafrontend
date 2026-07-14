import { AlertCircle } from "lucide-react";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[6-9]\d{9}$/;

export function validateLogin({ email, password }) {
  const e = {};
  if (!email)                     e.email    = "Email is required";
  else if (!EMAIL_RE.test(email)) e.email    = "Enter a valid email address";
  if (!password)                  e.password = "Password is required";
  else if (password.length < 6)   e.password = "Minimum 6 characters";
  return e;
}

export function validateRegister({ name, email, phone, password, confirmPassword }) {
  const e = {};
  if (!name.trim())                       e.name            = "Full name is required";
  else if (name.trim().length < 2)        e.name            = "Name must be at least 2 characters";
  else if (!/^[a-zA-Z\s]+$/.test(name))  e.name            = "Name can only contain letters";
  if (!email)                             e.email           = "Email is required";
  else if (!EMAIL_RE.test(email))         e.email           = "Enter a valid email address";
  if (!phone)                              e.phone           = "Mobile number is required";
  else if (!PHONE_RE.test(phone))          e.phone           = "Enter a valid 10-digit mobile number";
  if (!password)                          e.password        = "Password is required";
  else if (password.length < 8)          e.password        = "Minimum 8 characters required";
  else if (!/(?=.*[a-z])/.test(password)) e.password        = "Include at least one lowercase letter";
  else if (!/(?=.*[A-Z])/.test(password)) e.password        = "Include at least one uppercase letter";
  else if (!/(?=.*\d)/.test(password))    e.password        = "Include at least one number";
  if (!confirmPassword)                   e.confirmPassword = "Please confirm your password";
  else if (password !== confirmPassword)  e.confirmPassword = "Passwords don't match";
  return e;
}

export function FieldWrapper({ label, error, touched, children }) {
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

export const pwStrength = (pw) => [
  { ok: pw.length >= 8,   text: "At least 8 characters" },
  { ok: /[A-Z]/.test(pw), text: "One uppercase letter"  },
  { ok: /[a-z]/.test(pw), text: "One lowercase letter"  },
  { ok: /\d/.test(pw),    text: "One number"            },
];

export function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
