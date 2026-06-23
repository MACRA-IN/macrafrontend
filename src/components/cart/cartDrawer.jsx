import { useEffect, useState } from "react";
import { X, Minus, Plus, Loader2 } from "lucide-react";
import { useCart } from "../../context/cartContext";

const SLOTS = [
  { id: "morning", label: "Morning", sub: "8–11 AM" },
  { id: "afternoon", label: "Afternoon", sub: "12–3 PM" },
  { id: "evening", label: "Evening", sub: "6–9 PM" },
];

function planSubLabel(plan) {
  if (plan.is_trial) return "Free trial";
  if (plan.discount_percentage > 0) return `Save ${plan.discount_percentage}%`;
  return `${plan.duration_days} days`;
}

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    totals,
    addToCart,
    updateCartItem,
    fetchCart,
    subscriptionPlans,
    selectedPlan,
    selectPlanOnCart,
    selectedSlot,
    setSelectedSlot,
  } = useCart();

  const [actionLoading, setActionLoading] = useState({});
  const [planLoading, setPlanLoading] = useState(false);

  // Fetch cart (and subscription plans) whenever the drawer opens
  useEffect(() => {
    if (isCartOpen) fetchCart();
  }, [isCartOpen, fetchCart]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  async function handleIncrement(product_id) {
    setActionLoading((p) => ({ ...p, [product_id]: "qty" }));
    await addToCart(product_id, 1);
    setActionLoading((p) => ({ ...p, [product_id]: false }));
  }

  async function handleDecrement(product_id, qty) {
    setActionLoading((p) => ({ ...p, [product_id]: "qty" }));
    await updateCartItem(product_id, qty - 1);
    setActionLoading((p) => ({ ...p, [product_id]: false }));
  }

  async function handleRemove(product_id) {
    setActionLoading((p) => ({ ...p, [product_id]: "remove" }));
    await updateCartItem(product_id, 0);
    setActionLoading((p) => ({ ...p, [product_id]: false }));
  }

  async function handleSelectPlan(plan_id) {
    if (selectedPlan === plan_id) return;
    setPlanLoading(true);
    await selectPlanOnCart(plan_id);
    setPlanLoading(false);
  }

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Panel */}
      <div className="relative flex h-full w-full flex-col bg-white shadow-2xl sm:w-[420px]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="font-heading text-2xl font-bold text-forest">Your box</h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-text-muted transition-colors hover:bg-gray-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">

          {cartItems.length === 0 ? (
            <p className="py-10 text-center text-sm text-text-muted">
              No items yet. Add some bowls!
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-sage">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className={`flex gap-3 py-4 transition-opacity ${
                    actionLoading[item.product_id] === "remove" ? "opacity-40" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                    style={{
                      backgroundColor: "#C6E8D4",
                      backgroundImage:
                        "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.45) 8px, rgba(255,255,255,0.45) 14px)",
                    }}
                  >
                    {item.image_url && (
                      <img src={item.image_url} alt={item.product_name} className="h-full w-full object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-heading text-sm font-bold leading-snug text-forest">
                        {item.product_name}
                      </p>
                      <p className="shrink-0 font-heading text-sm font-bold text-forest">
                        ₹{parseFloat(item.total_price).toFixed(0)}
                      </p>
                    </div>

                    <p className="text-xs text-text-muted">₹{parseFloat(item.unit_price).toFixed(0)} each</p>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 rounded-full border border-sage px-2 py-0.5">
                        <button
                          onClick={() => handleDecrement(item.product_id, item.quantity)}
                          disabled={!!actionLoading[item.product_id]}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage disabled:opacity-40"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-4 text-center font-heading text-sm font-bold text-forest">
                          {actionLoading[item.product_id] === "qty" ? (
                            <Loader2 size={11} className="mx-auto animate-spin" />
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.product_id)}
                          disabled={!!actionLoading[item.product_id]}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage disabled:opacity-40"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        disabled={!!actionLoading[item.product_id]}
                        className="text-xs text-text-muted underline transition-colors hover:text-red-500 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Plan selector ── */}
          {subscriptionPlans.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                Plan
              </p>
              <div className="grid grid-cols-3 gap-2">
                {subscriptionPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={planLoading}
                    className={`flex flex-col items-start rounded-2xl border px-3 py-3 text-left transition-all disabled:opacity-60 ${
                      selectedPlan === plan.id
                        ? "border-forest bg-forest text-white"
                        : "border-sage bg-white text-forest hover:border-emerald-dark"
                    }`}
                  >
                    <span className="font-heading text-sm font-bold leading-tight">{plan.name}</span>
                    <span className={`text-xs ${selectedPlan === plan.id ? "text-emerald" : "text-text-muted"}`}>
                      {planSubLabel(plan)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Delivery Slot ── */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Delivery Slot
            </p>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(selectedSlot === slot.id ? null : slot.id)}
                  className={`flex flex-col items-start rounded-2xl border px-3 py-3 text-left transition-all ${
                    selectedSlot === slot.id
                      ? "border-forest bg-forest text-white"
                      : "border-sage bg-white text-forest hover:border-emerald-dark"
                  }`}
                >
                  <span className="font-heading text-sm font-bold leading-tight">{slot.label}</span>
                  <span className={`text-xs ${selectedSlot === slot.id ? "text-emerald" : "text-text-muted"}`}>
                    {slot.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fixed footer ── */}
        <div className="border-t border-sage px-5 pb-6 pt-4">
          <div className="mb-3 flex flex-col gap-1.5 text-sm">
            {totals?.duration_days > 1 ? (
              <div className="flex items-center justify-between">
                <span className="text-text-muted">
                  ₹{parseFloat(totals.daily_total ?? 0).toFixed(0)}/day × {totals.duration_days} days
                </span>
                <span className="font-medium text-forest">
                  ₹{parseFloat(totals.cart_total ?? 0).toFixed(0)}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-medium text-forest">
                  ₹{parseFloat(totals?.cart_total ?? 0).toFixed(0)}
                </span>
              </div>
            )}

            {totals?.discount_amount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-text-muted">
                  Discount ({totals.discount_percent}%)
                </span>
                <span className="font-semibold text-emerald-dark">
                  −₹{parseFloat(totals.discount_amount).toFixed(0)}
                </span>
              </div>
            )}

            {totals?.delivery_fee > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-text-muted">
                  Delivery{totals.duration_days > 1 ? ` × ${totals.duration_days} days` : ""}
                </span>
                <span className="font-medium text-forest">
                  ₹{parseFloat(totals.delivery_fee).toFixed(0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-sage pt-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Total
            </span>
            <span className="font-heading text-2xl font-bold text-forest">
              ₹{parseFloat(totals?.total_amount ?? 0).toFixed(0)}
            </span>
          </div>

          <button className="mt-4 w-full rounded-full bg-emerald py-3.5 font-heading text-base font-bold text-white transition-colors hover:bg-emerald-dark">
            Checkout →
          </button>

          <p className="mt-3 text-center text-xs font-medium uppercase tracking-wider text-text-muted">
            Free delivery · Cancel anytime
          </p>
        </div>

      </div>
    </div>
  );
}
