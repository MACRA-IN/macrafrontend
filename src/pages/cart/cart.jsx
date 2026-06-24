import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2, Check } from "lucide-react";
import { useCart } from "../../context/cartContext";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, totals, addToCart, updateCartItem, fetchCart, clearCart } = useCart();
  const [pageLoading, setPageLoading]   = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [orderPlaced, setOrderPlaced]   = useState(false);
  const [placing, setPlacing]           = useState(false);

  useEffect(() => {
    fetchCart().finally(() => setPageLoading(false));
  }, [fetchCart]);

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

  async function handlePlaceOrder() {
    setPlacing(true);
    // Simulate brief processing then show success
    await new Promise((r) => setTimeout(r, 800));
    clearCart();
    setOrderPlaced(true);
    setPlacing(false);
  }

  if (pageLoading) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 size={28} className="animate-spin text-emerald" />
        </div>
        <Footer />
      </>
    );
  }

  // Order success screen
  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald">
            <Check size={36} strokeWidth={3} className="text-white" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-forest">Order placed!</h2>
            <p className="mt-2 text-text-muted">We'll start preparing your bowls. See you soon!</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-emerald px-8 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            Back to home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-sage bg-white shadow-card">
            <ShoppingBag size={32} strokeWidth={1.5} className="text-text-muted" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-forest">Your box is empty</h2>
            <p className="mt-2 text-text-muted">Add some bowls from the menu to get started.</p>
          </div>
          <Link
            to="/menu"
            className="rounded-full bg-emerald px-8 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            Browse bowls
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-forest"
        >
          <ArrowLeft size={14} /> Continue shopping
        </Link>

        <h1 className="mb-8 font-heading text-3xl font-bold text-forest">Your box</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* Items */}
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className={`flex gap-4 rounded-2xl border border-sage bg-white p-4 transition-opacity shadow-card ${
                  actionLoading[item.product_id] === "remove" ? "opacity-40" : ""
                }`}
              >
                {/* Thumbnail */}
                <div
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                  style={{
                    backgroundColor: "#C6E8D4",
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 18px)",
                  }}
                >
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold leading-snug text-forest">{item.product_name}</h3>
                      <p className="mt-0.5 text-xs text-text-muted">
                        ₹{parseFloat(item.unit_price).toFixed(0)} each
                      </p>
                    </div>
                    <p className="shrink-0 font-heading font-bold text-forest">
                      ₹{parseFloat(item.total_price).toFixed(0)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-sage pt-3">
                    <div className="flex items-center gap-2 rounded-full border border-sage px-2 py-1">
                      <button
                        onClick={() => handleDecrement(item.product_id, item.quantity)}
                        disabled={!!actionLoading[item.product_id]}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-emerald-dark transition-all hover:bg-sage disabled:opacity-50"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-5 text-center font-heading text-sm font-bold text-forest">
                        {actionLoading[item.product_id] === "qty" ? (
                          <Loader2 size={12} className="mx-auto animate-spin" />
                        ) : (
                          item.quantity
                        )}
                      </span>
                      <button
                        onClick={() => handleIncrement(item.product_id)}
                        disabled={!!actionLoading[item.product_id]}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-emerald-dark transition-all hover:bg-sage disabled:opacity-50"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.product_id)}
                      disabled={!!actionLoading[item.product_id]}
                      aria-label="Remove item"
                      className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="h-fit rounded-2xl border border-sage bg-white p-6 shadow-card lg:sticky lg:top-24">
            <h2 className="mb-5 font-heading text-lg font-bold text-forest">Order summary</h2>

            <div className="flex flex-col gap-3">
              {totals?.duration_days > 1 ? (
                <SummaryRow
                  label={`₹${parseFloat(totals.daily_total ?? 0).toFixed(0)}/day × ${totals.duration_days} days`}
                  value={totals.cart_total}
                />
              ) : (
                <SummaryRow label="Subtotal" value={totals?.cart_total} />
              )}
              {totals?.discount_amount > 0 && (
                <SummaryRow
                  label={`Discount (${totals.discount_percent}%)`}
                  value={totals.discount_amount}
                  isDiscount
                />
              )}
              {totals?.delivery_fee > 0 && (
                <SummaryRow
                  label={totals.duration_days > 1 ? `Delivery × ${totals.duration_days} days` : "Delivery"}
                  value={totals.delivery_fee}
                />
              )}
            </div>

            <div className="my-5 border-t border-sage" />

            <div className="flex items-center justify-between font-heading font-bold text-forest">
              <span>Total</span>
              <span>₹{parseFloat(totals?.total_amount ?? 0).toFixed(0)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark disabled:opacity-60"
            >
              {placing ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Placing order…
                </>
              ) : (
                "Place order →"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-text-muted">
              Free delivery on orders above ₹499
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

function SummaryRow({ label, value, isDiscount = false }) {
  if (value == null) return null;
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-muted">{label}</span>
      <span className={isDiscount ? "font-semibold text-emerald-dark" : "font-medium text-forest"}>
        {isDiscount ? `-₹${parseFloat(value).toFixed(0)}` : `₹${parseFloat(value).toFixed(0)}`}
      </span>
    </div>
  );
}
