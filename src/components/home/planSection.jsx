import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicPlans } from "../../services/subscriptionService";

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
    getPublicPlans().then((res) => {
      if (res.data) setPlans(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="plans" className="bg-sage/30 py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-dark sm:text-sm">
          Plans
        </p>
        <h2 className="mb-8 font-heading text-2xl font-bold text-forest sm:text-3xl sm:mb-10 lg:text-4xl">
          Start small. Stay longer.
        </h2>

        {loading ? (
          <p className="font-body text-sm text-text-muted">Loading plans...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const isPopular = plan.name === POPULAR_PLAN;
              return (
                <div
                  key={plan.id}
                  className={`flex flex-col rounded-2xl bg-white p-5 shadow-card sm:p-6 ${
                    isPopular ? "border-2 border-emerald" : "border border-sage"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-base font-bold text-forest sm:text-lg">
                      {plan.name}
                    </h3>
                    {isPopular && (
                      <span className="rounded-full bg-emerald px-2.5 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wide text-white">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    {plan.duration_days} days
                  </p>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {PLAN_COPY[plan.name] ?? ""}
                  </p>

                  <button
                    onClick={() => navigate("/subscribe")}
                    className={`mt-5 w-full rounded-full py-3 font-heading text-sm font-semibold transition-colors ${
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