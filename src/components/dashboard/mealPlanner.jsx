import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { getProducts } from "../../services/productService";
import { fillMealPlanner } from "../../services/subscriptionService";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MealPlanner({ subscription }) {
  const [bowls, setBowls]       = useState([]);
  const [slots, setSlots]       = useState([]);
  const [pickerFor, setPickerFor] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(true);

  const deliverySlot  = subscription?.delivery_slot || [];
  const slotColumns   = Array.isArray(deliverySlot)
    ? deliverySlot.map((s) => Object.keys(s)[0])
    : ["lunch", "dinner"];

  const buildDays = () => {
    const days = [];
    const current = new Date(subscription?.start_date);
    while (current.getDay() !== 0) {
      days.push({ label: DAY_NAMES[current.getDay()], date: current.toISOString().split("T")[0] });
      if (current.getDay() === 6) break;
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const deliveryDays = subscription ? buildDays() : [];

  useEffect(() => {
    getProducts().then((data) => {
      if (data) {
        setBowls(data.filter((p) => p.category_id === subscription?.category_id && p.is_active));
      }
      setLoading(false);
    });
  }, [subscription]);

  const findSlot  = (date, slot) => slots.find((s) => s.delivery_date === date && s.slot === slot);
  const removeSlot = (date, slot) => { setSlots(slots.filter((s) => !(s.delivery_date === date && s.slot === slot))); setSaved(false); };

  const selectBowl = (bowl) => {
    if (!pickerFor) return;
    const { date, dayLabel, slot } = pickerFor;
    const updated = slots.filter((s) => !(s.delivery_date === date && s.slot === slot));
    updated.push({ delivery_date: date, day_label: dayLabel, slot, product_id: bowl.id, product_name: bowl.name });
    setSlots(updated);
    setPickerFor(null);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await fillMealPlanner(slots.map((s) => ({ delivery_date: s.delivery_date, slot: s.slot, product_id: s.product_id })));
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="h-6 w-36 animate-pulse rounded-lg bg-sage/60" />
        <div className="h-3.5 w-48 animate-pulse rounded-lg bg-sage/40" />
        <div className="mt-3 flex flex-col gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-12 animate-pulse rounded-xl bg-sage/30" />
          ))}
        </div>
      </div>
    );
  }

  const filledCount = slots.length;
  const totalSlots  = deliveryDays.length * slotColumns.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-forest">Plan your meals</h2>
          <p className="mt-0.5 text-xs text-text-muted">
            {slotColumns.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" + ")}
            {" · "}{deliveryDays.length} day{deliveryDays.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-sage/50">
            <div
              className="h-full rounded-full bg-emerald transition-all duration-500"
              style={{ width: totalSlots > 0 ? `${(filledCount / totalSlots) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-xs font-semibold text-text-muted">{filledCount}/{totalSlots}</span>
        </div>
      </div>

      {/* Column headers */}
      <div
        className="mt-4 grid gap-1.5"
        style={{ gridTemplateColumns: `56px repeat(${slotColumns.length}, 1fr)` }}
      >
        <div />
        {slotColumns.map((col) => (
          <div key={col} className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </p>
            <p className="text-[10px] text-text-muted">{col === "lunch" ? "12–2 PM" : "6–8 PM"}</p>
          </div>
        ))}
      </div>

      {/* Day rows */}
      <div className="mt-1.5 flex flex-col gap-1.5">
        {deliveryDays.map((day) => (
          <div
            key={day.date}
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `56px repeat(${slotColumns.length}, 1fr)` }}
          >
            {/* Day label */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-forest">{day.label}</span>
              <span className="text-[10px] text-text-muted">{day.date.slice(5).replace("-", "/")}</span>
            </div>

            {/* Slot cells */}
            {slotColumns.map((slot) => {
              const filled = findSlot(day.date, slot);
              const isPickingThis = pickerFor?.date === day.date && pickerFor?.slot === slot;

              return (
                <button
                  key={slot}
                  onClick={() =>
                    filled
                      ? removeSlot(day.date, slot)
                      : setPickerFor(isPickingThis ? null : { date: day.date, dayLabel: day.label, slot })
                  }
                  className={`min-h-12 rounded-xl border px-2 py-2 text-xs transition-all ${
                    filled
                      ? "border-emerald/40 bg-emerald/8 font-semibold text-forest"
                      : isPickingThis
                      ? "border-emerald bg-sage/30 text-emerald"
                      : "border-dashed border-sage text-text-muted hover:border-emerald/50 hover:bg-sage/10"
                  }`}
                >
                  {filled ? (
                    <div className="text-center leading-tight">
                      <p className="text-xs font-semibold">{filled.product_name}</p>
                      <p className="mt-0.5 text-[10px] font-normal text-emerald-dark">✓ tap to clear</p>
                    </div>
                  ) : (
                    <span className="block text-center text-base leading-none">+</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bowl picker */}
      {pickerFor && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-emerald/30 bg-sage/10">
          <div className="flex items-center justify-between border-b border-sage px-4 py-2.5">
            <p className="font-heading text-sm font-semibold text-forest">
              {pickerFor.dayLabel} · {pickerFor.slot === "lunch" ? "Lunch 12–2 PM" : "Dinner 6–8 PM"}
            </p>
            <button
              onClick={() => setPickerFor(null)}
              className="rounded-full p-1 text-text-muted transition-colors hover:bg-sage hover:text-forest"
            >
              <X size={13} />
            </button>
          </div>
          <div className="grid gap-1.5 p-3 sm:grid-cols-2">
            {bowls.map((bowl) => (
              <button
                key={bowl.id}
                onClick={() => selectBowl(bowl)}
                className="flex items-center justify-between rounded-xl border border-sage bg-white px-3.5 py-2.5 text-left transition-all hover:border-emerald hover:bg-sage/10 active:scale-[0.98]"
              >
                <p className="font-heading text-sm font-semibold text-forest">{bowl.name}</p>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald">{parseFloat(bowl.protein_g).toFixed(0)}g</p>
                  <p className="text-[10px] text-text-muted">{bowl.calories} kcal</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <button
        onClick={handleSave}
        disabled={filledCount === 0 || saving || saved}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saving ? (
          <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" /> Saving…</>
        ) : saved ? (
          <><Check size={15} strokeWidth={3} /> Saved!</>
        ) : (
          `Save meal plan · ${filledCount} bowl${filledCount !== 1 ? "s" : ""}`
        )}
      </button>
    </div>
  );
}
