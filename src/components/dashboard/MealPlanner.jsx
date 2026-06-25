import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { getProducts } from "../../services/productService";
import { fillMealPlanner } from "../../services/subscriptionService";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MealPlanner({ subscription }) {
  const [bowls, setBowls] = useState([]);
  const [slots, setSlots] = useState([]);
  const [pickerFor, setPickerFor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("subsc",subscription)

  const deliverySlot = subscription?.delivery_slot || [];
  const slotColumns = Array.isArray(deliverySlot)
    ? deliverySlot.map((s) => Object.keys(s)[0])
    : ["lunch", "dinner"];

  const buildDays = () => {
    const days = [];
    const current = new Date(subscription?.start_date);
    while (current.getDay() !== 0) {
      days.push({
        label: DAY_NAMES[current.getDay()],
        date: current.toISOString().split("T")[0],
      });
      if (current.getDay() === 6) break;
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const deliveryDays = subscription ? buildDays() : [];

useEffect(() => {
  getProducts().then((data) => {
    if (data) {
      console.log("subscription category_id:", subscription?.category_id, typeof subscription?.category_id);
      console.log("all products:", data.map(p => ({ id: p.id, name: p.name, category_id: p.category_id, type: typeof p.category_id })));
      
      const filtered = data.filter(
        (p) => p.category_id === subscription?.category_id && p.is_active,
      );
      console.log("filtered bowls:", filtered.length);
      setBowls(filtered);
    }
    setLoading(false);
  });
}, [subscription]);

  const findSlot = (date, slot) =>
    slots.find((s) => s.delivery_date === date && s.slot === slot);

  const selectBowl = (bowl) => {
    if (!pickerFor) return;
    const { date, dayLabel, slot } = pickerFor;
    const updated = slots.filter(
      (s) => !(s.delivery_date === date && s.slot === slot),
    );
    updated.push({
      delivery_date: date,
      day_label: dayLabel,
      slot,
      product_id: bowl.id,
      product_name: bowl.name,
    });
    setSlots(updated);
    setPickerFor(null);
    setSaved(false);
  };

  const removeSlot = (date, slot) => {
    setSlots(
      slots.filter((s) => !(s.delivery_date === date && s.slot === slot)),
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await fillMealPlanner(
        slots.map((s) => ({
          delivery_date: s.delivery_date,
          slot: s.slot,
          product_id: s.product_id,
        })),
      );
      setSaved(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="h-7 w-40 animate-pulse rounded-lg bg-sage/60" />
        <div className="h-4 w-56 animate-pulse rounded-lg bg-sage/40" />
        <div className="mt-4 flex flex-col gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-14 animate-pulse rounded-xl bg-sage/30" />
          ))}
        </div>
      </div>
    );
  }

  const filledCount = slots.length;
  const totalSlots = deliveryDays.length * slotColumns.length;

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-forest">
            Plan your meals
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {slotColumns
              .join(" + ")
              .replace("lunch", "Lunch")
              .replace("dinner", "Dinner")}
            {" · "}
            {deliveryDays.length} day{deliveryDays.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span className="rounded-full bg-sage px-3 py-1 text-xs font-semibold text-forest">
          {filledCount} / {totalSlots} filled
        </span>
      </div>

      {/* Column headers */}
      <div
        className="mt-5 grid gap-2 text-center"
        style={{
          gridTemplateColumns: `64px repeat(${slotColumns.length}, 1fr)`,
        }}
      >
        <div />
        {slotColumns.map((col) => (
          <div
            key={col}
            className="text-xs font-semibold uppercase tracking-wide text-text-muted"
          >
            {col}
            <br />
            <span className="font-normal">
              {col === "lunch" ? "12–2 PM" : "6–8 PM"}
            </span>
          </div>
        ))}
      </div>

      {/* Day rows */}
      <div className="mt-2 flex flex-col gap-1.5">
        {deliveryDays.map((day) => (
          <div
            key={day.date}
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `64px repeat(${slotColumns.length}, 1fr)`,
            }}
          >
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-forest">{day.label}</span>
              <span className="text-[10px] text-text-muted">
                {day.date.slice(5)}
              </span>
            </div>
            {slotColumns.map((slot) => {
              const filled = findSlot(day.date, slot);
              return (
                <button
                  key={slot}
                  onClick={() =>
                    filled
                      ? removeSlot(day.date, slot)
                      : setPickerFor({
                          date: day.date,
                          dayLabel: day.label,
                          slot,
                        })
                  }
                  className={`min-h-[52px] rounded-xl border p-2 text-xs transition-all ${
                    filled
                      ? "border-emerald bg-sage/40 font-semibold text-forest"
                      : "border-dashed border-sage text-text-muted hover:border-emerald/60 hover:bg-sage/10"
                  }`}
                >
                  {filled ? (
                    <div>
                      <p className="leading-tight">{filled.product_name}</p>
                      <p className="mt-0.5 text-[10px] font-normal text-text-muted">
                        tap to remove
                      </p>
                    </div>
                  ) : (
                    <span className="text-base">+</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bowl picker */}
      {pickerFor && (
        <div className="mt-4 rounded-2xl border border-emerald/40 bg-sage/20 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-sm font-semibold text-forest">
              {pickerFor.dayLabel} ·{" "}
              {pickerFor.slot === "lunch" ? "Lunch 12–2 PM" : "Dinner 6–8 PM"}
            </p>
            <button
              onClick={() => setPickerFor(null)}
              className="rounded-full p-1 text-text-muted transition-colors hover:bg-sage hover:text-forest"
            >
              <X size={14} />
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {bowls.map((bowl) => (
              <button
                key={bowl.id}
                onClick={() => selectBowl(bowl)}
                className="rounded-xl border border-sage bg-white p-3 text-left transition-colors hover:border-emerald hover:bg-sage/10"
              >
                <p className="font-heading text-sm font-semibold text-forest">
                  {bowl.name}
                </p>
                <p className="mt-0.5 text-xs text-emerald">
                  {bowl.calories} kcal · {parseFloat(bowl.protein_g).toFixed(0)}
                  g protein
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div
        className="mt-5 overflow-hidden rounded-full bg-sage/40"
        style={{ height: 4 }}
      >
        <div
          className="h-full rounded-full bg-emerald transition-all duration-500"
          style={{
            width:
              totalSlots > 0 ? `${(filledCount / totalSlots) * 100}%` : "0%",
          }}
        />
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={filledCount === 0 || saving || saved}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saving ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Saving…
          </>
        ) : saved ? (
          <>
            <Check size={16} strokeWidth={3} /> Saved!
          </>
        ) : (
          `Save meal plan (${filledCount} bowl${filledCount !== 1 ? "s" : ""})`
        )}
      </button>
    </div>
  );
}
