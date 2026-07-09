// Standard Indian veg / non-veg mark: a square outline with a filled dot inside.
export default function VegBadge({ isVeg, size = 14, className = "" }) {
  const color = isVeg ? "#0F8A3C" : "#B3261E";
  const dot = size * 0.45;

  return (
    <span
      title={isVeg ? "Veg" : "Non-veg"}
      aria-label={isVeg ? "Veg" : "Non-veg"}
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        border: `1.4px solid ${color}`,
        borderRadius: size * 0.15,
      }}
    >
      <span
        style={{
          width: dot,
          height: dot,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
    </span>
  );
}
