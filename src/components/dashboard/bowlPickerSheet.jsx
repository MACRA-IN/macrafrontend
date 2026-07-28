import { useEffect } from "react";
import { X } from "lucide-react";
import VegBadge from "../common/VegBadge";

const SLOT_LABEL = { lunch: "Lunch · 12–2 PM", dinner: "Dinner · 6–8 PM" };

export default function BowlPickerSheet({ open, target, bowls, onSelect, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full rounded-t-2xl bg-white px-4 pb-6 pt-4 shadow-2xl sm:px-6">
        <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-sage" />

        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-forest sm:text-base">
              {target?.day_label} · {SLOT_LABEL[target?.slot] ?? target?.slot}
            </p>
            <p className="text-[11px] text-text-muted sm:text-xs">Tap to select</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-sage/40 text-text-muted sm:h-8 sm:w-8"
          >
            <X size={13} />
          </button>
        </div>

        <div className="flex max-h-[55vh] flex-col gap-1.5 overflow-y-auto">
          {bowls.map((bowl) => {
            const isSelected = bowl.id === target?.currentId;
            return (
              <button
                key={bowl.id}
                onClick={() => onSelect(bowl)}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all active:scale-[0.98] sm:px-4 sm:py-3 ${
                  isSelected
                    ? "border-emerald bg-emerald/5"
                    : "border-sage bg-white hover:bg-sage/10"
                }`}
              >
                <VegBadge isVeg={bowl.is_veg} size={12} />
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-forest sm:text-sm">
                  {bowl.name}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] font-bold text-emerald sm:text-xs">
                    {parseFloat(bowl.protein_g).toFixed(0)}g
                  </p>
                  <p className="text-[10px] text-text-muted">{bowl.calories} kcal</p>
                </div>
                {isSelected && (
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald">
                    <span className="text-[9px] font-bold text-white">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
