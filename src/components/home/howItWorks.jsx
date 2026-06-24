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
    <section className="bg-sage/20 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-dark">
          How it works
        </p>
        <h2 className="mb-12 font-heading text-3xl font-bold text-forest sm:text-4xl lg:mb-16 lg:text-5xl">
          Three steps to clean eating.
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-sage bg-white p-6 shadow-card sm:p-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/60 font-heading text-lg font-bold text-emerald-dark">
                {step.number}
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-forest sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}