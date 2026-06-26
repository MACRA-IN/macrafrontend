const steps = [
  {
    number: "STEP 01",
    title: "Reserve your spot",
    description:
      "₹399 holds a trial box from the founding batch.",
  },
  {
    number: "STEP 02",
    title: "Your box ships August 2026",
    description:
      "Four chef-built bowls land at your door. Heat, eat, and rate each one in the app.",
  },
  {
    number: "STEP 03",
    title: "Continue weekly — or don't",
    description:
      "Hooked? Your plan begins at ₹117/bowl. Skip weeks or cancel anytime, no friction.",
  },
];

export default function TrialSection() {
  return (
    <section id="plans" className="bg-bg py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-dark">
          Start with one box
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
          Try it nearly free. Subscribe only if you love it.
        </h2>
        <p className="mt-5 max-w-2xl text-base text-text-muted">
          Preorder a trial box for ₹399. We ship the founding batch August 2026.
          No weekly plan starts unless you say so.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-sage bg-white p-6 shadow-card sm:p-8"
            >
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-emerald">
                {step.number}
              </p>
              <h3 className="mt-4 font-heading text-xl font-bold text-forest sm:text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
