import { useState } from "react";
import { Shuffle, Check, Loader2, Pencil } from "lucide-react";
import VegBadge from "../common/VegBadge";
import BowlPickerSheet from "./bowlPickerSheet";
import { useMealPlan } from "./useMealPlan";

const SLOT_EMOJI = { lunch: "☀️", dinner: "🌙" };

function MealRow({ slot, onShuffle, onChange }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-sage bg-white px-3 py-2.5 transition-colors hover:border-emerald/30 sm:px-4 sm:py-3">
      <span className="text-sm sm:text-base">{SLOT_EMOJI[slot.slot] ?? "🍽️"}</span>
      <VegBadge isVeg={slot.is_veg} size={11} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-forest sm:text-sm">{slot.product_name}</p>
        <p className="text-[10px] text-text-muted sm:text-xs">
          {parseFloat(slot.protein_g ?? 0).toFixed(0)}g protein · {slot.calories} kcal
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onShuffle(slot.delivery_date, slot.slot)}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-sage text-text-muted transition-colors hover:border-emerald/40 hover:bg-sage/20 hover:text-forest active:scale-95 sm:h-8 sm:w-8"
          title="Shuffle"
        >
          <Shuffle size={11} className="sm:hidden" />
          <Shuffle size={13} className="hidden sm:block" />
        </button>
        <button
          onClick={() => onChange(slot)}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-sage text-text-muted transition-colors hover:border-emerald/40 hover:bg-sage/20 hover:text-forest active:scale-95 sm:h-8 sm:w-8"
          title="Change"
        >
          <Pencil size={11} className="sm:hidden" />
          <Pencil size={13} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
}

function DaySection({ day, slots, onShuffle, onChange }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-xs font-bold text-forest sm:text-sm">
          {day.label}
        </span>
        <span className="text-[10px] text-text-muted sm:text-xs">
          {day.date.slice(5).replace("-", "/")}
        </span>
        <div className="h-px flex-1 bg-sage/40" />
      </div>
      <div className="flex flex-col gap-1.5">
        {slots.map((slot) => (
          <MealRow
            key={`${slot.delivery_date}_${slot.slot}`}
            slot={slot}
            onShuffle={onShuffle}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-32 rounded-full bg-sage/50" />
      <div className="h-3 w-48 rounded-full bg-sage/30" />
      {[1, 2, 3].map((n) => (
        <div key={n} className="space-y-1.5">
          <div className="h-3 w-16 rounded-full bg-sage/40" />
          <div className="h-10 rounded-xl bg-sage/30" />
          <div className="h-10 rounded-xl bg-sage/30" />
        </div>
      ))}
    </div>
  );
}

export default function MealPlanner({ subscription, onSaved }) {
  const {
    bowls, slots, days, totalSlots,
    loading, saving, saved, error,
    shuffleAll, shuffleOne, changeOne, handleSave,
  } = useMealPlan(subscription, onSaved);

  const [pickerTarget, setPickerTarget] = useState(null);

  const openChange = (slot) =>
    setPickerTarget({
      delivery_date: slot.delivery_date,
      slot: slot.slot,
      day_label: slot.day_label,
      currentId: slot.product_id,
    });

  const handleSelect = (bowl) => {
    changeOne(pickerTarget.delivery_date, pickerTarget.slot, bowl);
    setPickerTarget(null);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-base font-bold text-forest sm:text-lg">🍱 Plan your meals</h2>
          <p className="mt-0.5 text-[11px] text-text-muted sm:text-xs">
            Pre-filled · customize before saving
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-sage/40">
            <div className="h-full w-full rounded-full bg-emerald" />
          </div>
          <span className="text-[11px] font-bold text-emerald sm:text-xs">{totalSlots}/{totalSlots}</span>
        </div>
      </div>

      {/* Shuffle all */}
      <button
        onClick={shuffleAll}
        className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-sage bg-white py-2.5 text-xs font-semibold text-forest transition-all hover:border-emerald/40 hover:bg-sage/10 active:scale-[0.98] sm:text-sm"
      >
        <Shuffle size={12} className="text-emerald" /> Shuffle all meals
      </button>

      {/* Day rows */}
      <div className="space-y-4">
        {days.map((day) => {
          const daySlots = slots.filter((s) => s.delivery_date === day.date);
          if (!daySlots.length) return null;
          return (
            <DaySection
              key={day.date}
              day={day}
              slots={daySlots}
              onShuffle={shuffleOne}
              onChange={openChange}
            />
          );
        })}
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
      )}

      {/* Sticky save */}
      <div className="sticky bottom-0 -mx-5 mt-5 border-t border-sage bg-white/95 px-5 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5 sm:text-sm"
          style={{ background: saved ? "#16A85E" : "linear-gradient(135deg,#2CD377 0%,#16A85E 100%)" }}
        >
          {saving ? (
            <><Loader2 size={13} className="animate-spin" /> Saving…</>
          ) : saved ? (
            <><Check size={13} strokeWidth={3} /> Meal plan saved!</>
          ) : (
            <>Save meal plan · {totalSlots} bowls</>
          )}
        </button>
      </div>

      <BowlPickerSheet
        open={!!pickerTarget}
        target={pickerTarget}
        bowls={bowls}
        onSelect={handleSelect}
        onClose={() => setPickerTarget(null)}
      />
    </>
  );
}
