import { createContext, useContext, useState, useCallback } from "react";
import {
  fetchCartAPI,
  addToCartAPI,
  selectPlanAPI,
  updateCartItemAPI,
} from "../services/cartService";

const CartContext = createContext(null);

const CUSTOMER_ID = 1; // TODO: replace with authenticated user id once auth is wired

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [appliedPlan, setAppliedPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null); // plan id (number) from API
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [toast, setToast] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setTotals(null);
    setSubscriptionPlans([]);
    setAppliedPlan(null);
    setSelectedPlan(null);
    setSelectedSlot(null);
    setIsCartOpen(false);
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const data = await fetchCartAPI(CUSTOMER_ID);
      if (data.success) {
        setCartItems(data.data.cart?.items ?? []);
        if (data.data.cart?.totals) setTotals(data.data.cart.totals);
        if (data.data.cart?.applied_plan) {
          setAppliedPlan(data.data.cart.applied_plan);
          setSelectedPlan(data.data.cart.applied_plan.id);
        }
        setSubscriptionPlans(data.data.subscription_plans ?? []);
      }
    } catch {
      console.error("Failed to fetch cart");
    }
  }, []);

  const addToCart = useCallback(
    async (product_id, quantity = 1, addons = []) => {
      try {
        const data = await addToCartAPI({
          customer_id: CUSTOMER_ID,
          product_id,
          quantity,
          addons,
        });

        if (!data.success) {
          showToast(data.message || "Failed to add item.");
          return false;
        }

        const item = data.data.item;
        setCartItems((prev) => {
          const idx = prev.findIndex((i) => i.product_id === product_id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = item;
            return copy;
          }
          return [...prev, item];
        });
        if (data.data.totals) setTotals(data.data.totals);
        return true;
      } catch (err) {
        showToast(err.response?.data?.message || "Something went wrong. Please try again.");
        return false;
      }
    },
    [showToast]
  );

  const updateCartItem = useCallback(
    async (product_id, quantity) => {
      try {
        const data = await updateCartItemAPI({
          customer_id: CUSTOMER_ID,
          product_id,
          quantity,
        });

        if (!data.success) {
          showToast(data.message || "Failed to update cart.");
          return false;
        }

        setCartItems((prev) =>
          quantity === 0
            ? prev.filter((i) => i.product_id !== product_id)
            : prev.map((i) => (i.product_id === product_id ? { ...i, quantity } : i))
        );
        if (data.data?.totals) setTotals(data.data.totals);
        return true;
      } catch (err) {
        showToast(err.response?.data?.message || "Something went wrong. Please try again.");
        return false;
      }
    },
    [showToast]
  );

  const selectPlanOnCart = useCallback(
    async (plan_id) => {
      if (cartItems.length === 0) {
        showToast("Add items to your cart before selecting a plan.");
        return false;
      }
      try {
        const data = await selectPlanAPI({ customer_id: CUSTOMER_ID, plan_id });
        if (!data.success) {
          showToast(data.message || "Failed to select plan.");
          return false;
        }
        setSelectedPlan(plan_id);
        setAppliedPlan(data.data.plan);
        if (data.data.totals) setTotals(data.data.totals);
        return true;
      } catch (err) {
        showToast(err.response?.data?.message || "Something went wrong. Please try again.");
        return false;
      }
    },
    [cartItems.length, showToast]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totals,
        cartCount,
        subscriptionPlans,
        appliedPlan,
        selectedPlan,
        setSelectedPlan,
        selectedSlot,
        setSelectedSlot,
        addToCart,
        updateCartItem,
        selectPlanOnCart,
        fetchCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-60 -translate-x-1/2 whitespace-nowrap rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
