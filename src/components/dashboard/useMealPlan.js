import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../services/productService";
import { fillMealPlanner } from "../../services/subscriptionService";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildDeliveryDays(subscription) {
  const days = [];
  const current = new Date(subscription.start_date);
  const limit = subscription.remaining_delivery_days;
  let count = 0;
  while (count < limit) {
    if (current.getDay() !== 0) {
      days.push({
        label: DAY_NAMES[current.getDay()],
        date: current.toISOString().split("T")[0],
      });
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
}

function pickBowl(bowls, excludeId = null) {
  const pool = bowls.length > 1 ? bowls.filter((b) => b.id !== excludeId) : bowls;
  return pool[Math.floor(Math.random() * pool.length)];
}

function autoFill(days, slotColumns, bowls) {
  const slots = [];
  let lastId = null;
  for (const day of days) {
    for (const slot of slotColumns) {
      const bowl = pickBowl(bowls, lastId);
      lastId = bowl.id;
      slots.push({
        delivery_date: day.date,
        day_label: day.label,
        slot,
        product_id: bowl.id,
        product_name: bowl.name,
        protein_g: bowl.protein_g,
        calories: bowl.calories,
        is_veg: bowl.is_veg,
      });
    }
  }
  return slots;
}

export function useMealPlan(subscription, onSaved) {
  const [bowls, setBowls] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const deliverySlot = subscription?.delivery_slot ?? [];
  const slotColumns = Array.isArray(deliverySlot)
    ? deliverySlot.map((s) => Object.keys(s)[0])
    : ["lunch", "dinner"];

  const days = subscription ? buildDeliveryDays(subscription) : [];
  const totalSlots = days.length * slotColumns.length;

  useEffect(() => {
    getProducts().then((data) => {
      if (data) {
        const filtered = data.filter(
          (p) => p.category_id === subscription?.category_id && p.is_active,
        );
        setBowls(filtered);
        setSlots(autoFill(days, slotColumns, filtered));
      }
      setLoading(false);
    });
  }, [subscription]);

  const shuffleAll = useCallback(() => {
    setSaved(false);
    setSlots(autoFill(days, slotColumns, bowls));
  }, [bowls, days, slotColumns]);

  const shuffleOne = useCallback(
    (date, slot) => {
      setSaved(false);
      setSlots((prev) => {
        const idx = prev.findIndex((s) => s.delivery_date === date && s.slot === slot);
        if (idx === -1) return prev;
        const currentId = prev[idx].product_id;
        const bowl = pickBowl(bowls, currentId);
        const next = [...prev];
        next[idx] = { ...next[idx], product_id: bowl.id, product_name: bowl.name, protein_g: bowl.protein_g, calories: bowl.calories, is_veg: bowl.is_veg };
        return next;
      });
    },
    [bowls],
  );

  const changeOne = useCallback((date, slot, bowl) => {
    setSaved(false);
    setSlots((prev) => {
      const idx = prev.findIndex((s) => s.delivery_date === date && s.slot === slot);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = { ...next[idx], product_id: bowl.id, product_name: bowl.name, protein_g: bowl.protein_g, calories: bowl.calories, is_veg: bowl.is_veg };
      return next;
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await fillMealPlanner(
        slots.map((s) => ({ delivery_date: s.delivery_date, slot: s.slot, product_id: s.product_id })),
      );
      await onSaved?.();
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return { bowls, slots, slotColumns, days, totalSlots, loading, saving, saved, error, shuffleAll, shuffleOne, changeOne, handleSave };
}
