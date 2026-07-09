import { useState } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { useCart } from "../../context/cartContext";
import VegBadge from "../common/VegBadge";

export default function BowlCard({ bowl }) {
  const { cartItems, addToCart, updateCartItem } = useCart();
  const [addLoading, setAddLoading] = useState(false);
  const [qtyLoading, setQtyLoading] = useState(false);

  const cartItem = cartItems.find((i) => i.product_id === bowl.id);
  const quantity = cartItem?.quantity ?? 0;

  async function handleAdd() {
    setAddLoading(true);
    await addToCart(bowl.id, 1);
    setAddLoading(false);
  }

  async function handleIncrement() {
    setQtyLoading(true);
    await addToCart(bowl.id, 1);
    setQtyLoading(false);
  }

  async function handleDecrement() {
    setQtyLoading(true);
    await updateCartItem(bowl.id, quantity - 1);
    setQtyLoading(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sage bg-white shadow-card">
      {/* Image */}
      <div
        className="flex h-56 w-full items-center justify-center"
        style={{
          backgroundColor: "#C6E8D4",
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 16px, rgba(255,255,255,0.45) 16px, rgba(255,255,255,0.45) 28px)",
        }}
      >
        {bowl.image_url ? (
          <img src={bowl.image_url} alt={bowl.name} className="h-full w-full object-cover" />
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-green-500/40">
            Bowl Photo
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <VegBadge isVeg={bowl.is_veg} size={15} />
          <h3 className="font-heading text-xl font-bold text-forest">{bowl.name}</h3>
        </div>

        <div className="mt-3 space-y-1">
          {bowl.description && (
            <p className="text-sm text-text-muted">{bowl.description}</p>
          )}
          <p className="text-sm text-text-muted">
            {bowl.calories} kcal · {parseFloat(bowl.protein_g).toFixed(0)}g protein · {parseFloat(bowl.fiber_g).toFixed(0)}g fiber
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-sage pt-4">
          <span className="font-heading text-2xl font-bold text-forest">
            ₹{parseFloat(bowl.price).toFixed(0)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              disabled={addLoading}
              className="flex min-w-28 items-center justify-center rounded-full border border-sage px-5 py-2 font-heading text-sm font-semibold text-emerald-dark transition-all hover:bg-sage disabled:opacity-60"
            >
              {addLoading ? <Loader2 size={15} className="animate-spin" /> : "Add to box"}
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-sage px-2 py-1">
              <button
                onClick={handleDecrement}
                disabled={qtyLoading}
                className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-dark transition-all hover:bg-sage disabled:opacity-50"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-5 text-center font-heading text-sm font-bold text-forest">
                {qtyLoading ? (
                  <Loader2 size={13} className="mx-auto animate-spin" />
                ) : (
                  quantity
                )}
              </span>
              <button
                onClick={handleIncrement}
                disabled={qtyLoading}
                className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-dark transition-all hover:bg-sage disabled:opacity-50"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
