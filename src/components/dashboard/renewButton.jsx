import { useState } from "react";
import { createRenewalOrder, verifyRenewal } from "../../services/subscriptionService";

// Simple renew/upgrade button. Pass the plan_id they're renewing/upgrading to.
export default function RenewButton({ planId, planLabel, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRenew = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: create Razorpay order
      const order = await createRenewalOrder(planId);

      // Step 2: open Razorpay checkout popup
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Macra",
        description: `Renew - ${planLabel}`,
        handler: async (response) => {
          try {
            // Step 3: verify payment + extend subscription
            await verifyRenewal({
              subscription_id: order.subscription_id,
              new_plan_id: order.new_plan_id,
              gateway_order_id: response.razorpay_order_id,
              gateway_payment_id: response.razorpay_payment_id,
              gateway_signature: response.razorpay_signature,
            });
            onSuccess();
          } catch (err) {
            setError("Payment succeeded but renewal failed. Contact support.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          // User closed the popup without paying — re-enable the button.
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#2CD377" },
      };

      if (typeof window.Razorpay === "undefined") {
        throw new Error("Payment SDK not loaded. Please refresh and try again.");
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to start renewal.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRenew}
        disabled={loading}
        className="flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Loading..." : `Renew - ${planLabel}`}
      </button>
      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}