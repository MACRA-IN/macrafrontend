const steps = [
  {
    number: 1,
    title: "Pick your plan",
    description:
      "Choose a bowl tier and a subscription — Trial, Weekly, or Monthly. Pay once, upfront.",
  },
  {
    number: 2,
    title: "Plan your week",
    description:
      "Every Sunday, pick your bowls for the week — lunch, dinner, or both. Monday to Saturday, your call.",
  },
  {
    number: 3,
    title: "We deliver, daily",
    description:
      "Lunch lands 12–2 PM, dinner 6–8 PM. Fresh, macro-tracked, zero effort from your side.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage/20 py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-dark sm:text-sm">
          How it works
        </p>
        <h2 className="mb-8 font-heading text-2xl font-bold text-forest sm:text-3xl sm:mb-10 lg:text-4xl">
          Three steps to clean eating.
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-sage bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/60 font-heading text-sm font-bold text-emerald-dark">
                {step.number}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-forest sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}