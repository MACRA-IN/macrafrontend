import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

export default function PhoneModal({ onSubmit, onClose }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Enter a valid phone number");
      return;
    }
    setLoading(true);
    try {
      await onSubmit(phone);
      setSuccess(true);
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError(err.message || "Failed to update phone");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-xl flex flex-col max-h-[90vh] sm:max-h-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile bottom sheet) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-gray-400" />
        </button> */}

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Complete your profile
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                We need your phone number for deliveries.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setPhone(value);
                      setError("");
                    }}
                    placeholder="9876543210"
                    maxLength="10"
                    inputMode="numeric"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors mt-6"
                >
                  {loading ? "Saving..." : "Continue"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">All set!</h3>
              <p className="text-sm text-gray-600 mt-2">
                Your phone number has been saved.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}