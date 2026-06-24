import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import subscriptionService from "../../services/subscriptionService";

const PLAN_COPY = {
  Trial: "Taste before committing. Up to 8 slots with a first-timer discount applied.",
  Weekly: "Our most popular plan. Up to 12 slots and pause up to 3 days whenever life happens.",
  Monthly: "Best value per bowl. Up to 50 slots and pause up to 12 days across the month.",
};

const POPULAR_PLAN = "Monthly";

const PlansSection = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subscriptionService.getPlans().then((data) => {
      if (data) setPlans(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="plans" className="bg-sage/30 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-dark">
          Plans
        </p>
        <h2 className="mb-12 font-heading text-3xl font-bold text-forest sm:text-4xl lg:mb-16 lg:text-5xl">
          Start small. Stay longer.
        </h2>

        {loading ? (
          <p className="font-body text-text-muted">Loading plans...</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const isPopular = plan.name === POPULAR_PLAN;
              return (
                <div
                  key={plan.id}
                  className={`flex flex-col rounded-3xl bg-white p-6 shadow-card sm:p-8 ${
                    isPopular ? "border-2 border-emerald" : "border border-sage"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-xl font-bold text-forest sm:text-2xl">
                      {plan.name}
                    </h3>
                    {isPopular && (
                      <span className="rounded-full bg-emerald px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-white">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-text-muted">
                    {plan.duration_days} days
                  </p>

                  <p className="mt-4 flex-1 leading-relaxed text-text-muted">
                    {PLAN_COPY[plan.name] ?? ""}
                  </p>

                  <button
                    onClick={() => navigate("/subscribe")}
                    className={`mt-6 w-full rounded-full py-4 font-heading font-semibold transition-colors ${
                      isPopular
                        ? "bg-emerald text-white hover:bg-emerald-dark"
                        : "bg-forest text-white hover:opacity-90"
                    }`}
                  >
                    Choose this plan →
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-sm text-text-muted">
          Price = slots × bowl price + delivery, minus any discount.
        </p>

      </div>
    </section>
  );
}

export default PlansSection;