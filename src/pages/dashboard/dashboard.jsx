import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";
import MealPlanner from "../../components/dashboard/mealPlanner";
import { getMySubscription } from "../../services/subscriptionService";

const DASHBOARD_SEO = (
  <SEO title="My Dashboard | Macra" noIndex />
);

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-forest/10 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 animate-pulse rounded-full bg-forest/20" />
          <div className="h-6 w-48 animate-pulse rounded-full bg-forest/20" />
          <div className="h-3 w-32 animate-pulse rounded-full bg-forest/20" />
        </div>
        <div className="h-8 w-20 animate-pulse rounded-full bg-forest/20" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-20 animate-pulse rounded-2xl bg-forest/20" />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [actionFeedback, setActionFeedback] = useState(null);

  useEffect(() => {
    getMySubscription().then((data) => {
      setSubscription(data);
      setLoading(false);
    });
  }, []);

  const showFeedback = (msg) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  if (loading) {
    return (
      <div>
        {DASHBOARD_SEO}
        <Header />
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="h-8 w-48 animate-pulse rounded-full bg-forest/10" />
          <div className="mt-1 h-4 w-36 animate-pulse rounded-full bg-forest/5" />
          <div className="mt-8">
            <SkeletonCard />
          </div>
          <div className="mt-10 h-64 animate-pulse rounded-3xl bg-sage/40" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div>
        {DASHBOARD_SEO}
        <Header />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-sage/40">
            <span className="text-3xl">🥣</span>
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-forest">
            No active subscription
          </h1>
          <p className="mt-3 max-w-md mx-auto text-text-muted">
            Start your trial and get fresh macro-balanced bowls delivered daily.
          </p>
          <button
            onClick={() => navigate("/subscribe")}
            className="mt-8 rounded-full bg-emerald px-8 py-4 font-heading font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            Start your trial →
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const startDate = new Date(subscription.start_date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div>
      {DASHBOARD_SEO}
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

        {/* Greeting */}
        <h1 className="font-heading text-3xl font-bold text-forest">Your dashboard</h1>
        <p className="mt-1 text-text-muted">Here's your week with Macra.</p>

        {/* Subscription card */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-forest text-white">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
                  Active subscription
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold">
                  {subscription.plan_name} · {subscription.tier_name}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  ₹{parseFloat(subscription.plan_price).toFixed(0)} · started {startDate}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald/20 px-4 py-1.5 text-xs font-bold uppercase text-emerald">
                {subscription.status}
              </span>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                {
                  label: "Days remaining",
                  value: subscription.remaining_delivery_days,
                  sub: `of ${subscription.total_delivery_days}`,
                  highlight: true,
                },
                {
                  label: "Next delivery",
                  value: "Tomorrow",
                  sub: "12–2 PM",
                  highlight: false,
                },
                {
                  label: "Pause days left",
                  value: subscription.pause_days_left,
                  sub: "available",
                  highlight: true,
                },
              ].map(({ label, value, sub, highlight }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {label}
                  </p>
                  <p className={`mt-1 font-heading text-xl font-bold ${highlight ? "text-emerald" : "text-white"}`}>
                    {value}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => showFeedback("Pause feature coming soon.")}
                className="flex-1 rounded-full bg-emerald py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
              >
                Pause subscription
              </button>
              <button
                onClick={() => navigate("/subscribe")}
                className="flex-1 rounded-full border border-white/20 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Change plan
              </button>
            </div>
          </div>

          {/* Feedback toast */}
          {actionFeedback && (
            <div className="border-t border-white/10 px-6 py-3 text-sm font-medium text-emerald">
              {actionFeedback}
            </div>
          )}
        </div>

        {/* Meal section */}
        <div className="mt-10 rounded-3xl border border-sage bg-white p-6 shadow-card sm:p-8">
          {subscription.slots && subscription.slots.length > 0 ? (
            <div>
              <h2 className="font-heading text-xl font-bold text-forest">This week's bowls</h2>
              <div className="mt-4 flex flex-col gap-2">
                {subscription.slots.map((slot, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-sage p-3"
                  >
                    <div>
                      <p className="font-heading text-sm font-semibold text-forest">
                        {slot.product_name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {slot.delivery_date} · {slot.slot}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        slot.status === "delivered"
                          ? "bg-emerald/10 text-emerald"
                          : "bg-sage/50 text-text-muted"
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MealPlanner subscription={subscription} />
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
