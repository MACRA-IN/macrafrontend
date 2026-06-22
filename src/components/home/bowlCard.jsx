import { Plus } from "lucide-react";

export default function BowlCard({ bowl }) {

  return (
    <div className="overflow-hidden rounded-3xl border border-sage bg-white shadow-card">
      {/* Image */}
      <div
        className="relative flex h-52 w-full items-center justify-center sm:h-56"
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

      <div className="p-5 sm:p-6">
        <h3 className="font-heading text-xl font-bold text-forest">{bowl.name}</h3>

        {/* Macros */}
        <div className="mt-3 grid grid-cols-4 gap-2 rounded-2xl bg-sage/30 p-3 text-center">
          <div>
            <p className="font-heading text-sm font-bold text-forest">{bowl.calories}</p>
            <p className="text-xs text-text-muted">kcal</p>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-forest">{parseFloat(bowl.protein_g).toFixed(0)}g</p>
            <p className="text-xs text-text-muted">protein</p>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-forest">{parseFloat(bowl.carbs_g).toFixed(0)}g</p>
            <p className="text-xs text-text-muted">carbs</p>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-forest">{parseFloat(bowl.fat_g).toFixed(0)}g</p>
            <p className="text-xs text-text-muted">fat</p>
          </div>
        </div>

        <p className="mt-2 text-xs text-text-muted">
          🌾 {parseFloat(bowl.fiber_g).toFixed(0)}g fiber
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-2xl font-bold text-forest">₹{parseFloat(bowl.price).toFixed(0)}</span>

          <button className="flex items-center gap-1.5 rounded-full border border-sage px-5 py-2 font-heading text-sm font-semibold text-emerald-dark transition-all hover:bg-sage">
            <Plus size={14} /> Add to box
          </button>
        </div>
      </div>
    </div>
  );
}
