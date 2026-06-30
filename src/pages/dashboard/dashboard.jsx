import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Pause,
  ArrowRight,
  ChefHat,
  LogOut,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";
import MealPlanner from "../../components/dashboard/mealPlanner";
import { useAuth } from "../../context/authContext";
import {
  getMySubscription,
  pauseSubscription,
  resumeSubscription,
} from "../../services/subscriptionService";

const DASHBOARD_SEO = <SEO title="My Dashboard | Macra" noIndex />;

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-forest/10 p-5 sm:p-6">
      <div className="flex flex-col gap-2.5">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-forest/20" />
        <div className="h-6 w-52 animate-pulse rounded-full bg-forest/20" />
        <div className="h-2.5 w-36 animate-pulse rounded-full bg-forest/15" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-20 animate-pulse rounded-2xl bg-forest/20"
          />
        ))}
      </div>
      <div className="mt-5 flex gap-2.5">
        <div className="h-11 flex-1 animate-pulse rounded-full bg-forest/20" />
        <div className="h-11 flex-1 animate-pulse rounded-full bg-forest/15" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
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
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="h-7 w-44 animate-pulse rounded-full bg-forest/10" />
          <div className="mt-1.5 h-3.5 w-56 animate-pulse rounded-full bg-forest/5" />
          <div className="mt-6">
            <SkeletonCard />
          </div>
          <div className="mt-5 h-56 animate-pulse rounded-3xl bg-sage/30" />
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
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage/40">
            <ChefHat size={28} className="text-emerald" />
          </div>
          <h1 className="mt-5 font-heading text-2xl font-bold text-forest sm:text-3xl">
            No active subscription
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
            Start your trial and get fresh macro-balanced bowls delivered daily.
          </p>
          <button
            onClick={() => navigate("/subscribe")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald px-8 py-3.5 font-heading font-semibold text-white transition-all hover:bg-emerald-dark active:scale-95"
          >
            Start your trial <ArrowRight size={15} />
          </button>
          <div className="mt-10 border-t border-sage pt-6">
            <button
              onClick={logoutUser}
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-forest"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const startDate = new Date(subscription.start_date).toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
    },
  );

  const now = new Date();
  const startD = new Date(subscription.start_date);
  const nextDeliveryLabel = now < startD ? startDate : "Tomorrow";

  const deliverySlots = subscription.delivery_slot || [];
  const firstSlot =
    Array.isArray(deliverySlots) && deliverySlots.length > 0
      ? Object.values(deliverySlots[0])[0]
      : "12–2 PM";

  const progressPct =
    subscription.total_delivery_days > 0
      ? ((subscription.total_delivery_days -
          subscription.remaining_delivery_days) /
          subscription.total_delivery_days) *
        100
      : 0;

  return (
    <div>
      {DASHBOARD_SEO}
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
              {user?.name
                ? `Hey, ${user.name.split(" ")[0]}`
                : "Your dashboard"}
            </h1>
            <p className="mt-0.5 text-sm text-text-muted">
              Here's your week with Macra.
            </p>
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="hidden items-center gap-1 rounded-full border border-sage px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-sage/30 sm:flex"
          >
            Browse menu <ArrowRight size={14} />
          </button>
        </div>

        {/* Subscription card */}
        <div className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-[#0a1f12] text-white">
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald">
                  Active subscription
                </p>
                <h2 className="mt-1.5 font-heading text-xl font-bold sm:text-2xl">
                  {subscription.plan_name} · {subscription.tier_name}
                </h2>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  ₹{parseFloat(subscription.plan_price).toFixed(0)} · started{" "}
                  {startDate}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-emerald/30 bg-emerald/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald">
                {subscription.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div
                className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <span>Progress</span>
                <span>{Math.round(progressPct)}% complete</span>
              </div>
              <div
                className="mt-1.5 h-1.5 overflow-hidden rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full bg-emerald transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <StatCard
                icon={Calendar}
                label="Days left"
                value={subscription.remaining_delivery_days}
                sub={`of ${subscription.total_delivery_days}`}
                highlight
              />
              <StatCard
                icon={Clock}
                label="Next delivery"
                value={nextDeliveryLabel}
                sub={firstSlot}
              />
              <StatCard
                icon={Pause}
                label="Pause days"
                value={subscription.pause_days_left}
                sub="available"
                highlight
              />
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2.5">
              <button
                onClick={() =>
                  showFeedback("Use Pause / Resume on a meal row below.")
                }
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-[0.98]"
              >
                <Pause size={13} /> Pause
              </button>
              {/* <button
                onClick={() => navigate("/subscribe")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                Change plan <ArrowRight size={13} />
              </button> */}
            </div>
          </div>

          {actionFeedback && (
            <div className="border-t border-white/10 bg-emerald/10 px-5 py-2.5 text-center text-sm font-medium text-emerald">
              {actionFeedback}
            </div>
          )}
        </div>

        {/* Meal section */}
        <div className="mt-5 rounded-3xl border border-sage bg-white p-5 shadow-card sm:p-6">
          {subscription.slots && subscription.slots.length > 0 ? (
            <DeliveredSlots subscription={subscription} />
          ) : (
            <MealPlanner subscription={subscription} />
          )}
        </div>

        {/* Mobile logout */}
        <div className="mt-8 flex items-center justify-center border-t border-sage pt-5 md:hidden">
          <button
            onClick={logoutUser}
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-text-muted transition-colors hover:bg-sage/40 hover:text-forest"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, highlight }) {
  return (
    <div
      className="rounded-2xl p-3.5"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-1">
        <Icon size={11} style={{ color: "rgba(255,255,255,0.4)" }} />
        <p
          className="text-[10px] font-semibold uppercase tracking-wide"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {label}
        </p>
      </div>
      <p
        className={`mt-1.5 font-heading text-xl font-bold leading-none ${highlight ? "text-emerald" : "text-white"}`}
      >
        {value}
      </p>
      <p
        className="mt-0.5 text-[11px]"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {sub}
      </p>
    </div>
  );
}

function DeliveredSlots({ subscription }) {
  const [slots, setSlots] = useState(subscription.slots);
  const [pausingDate, setPausingDate] = useState(null);
  const [error, setError] = useState(null);

  const delivered = slots.filter((s) => s.status === "delivered").length;

  const today = new Date().toISOString().split("T")[0];

  const handlePause = async (date) => {
    setPausingDate(date);
    setError(null);
    try {
      await pauseSubscription(subscription.subscription_id, [date]);
      setSlots(
        slots.map((s) =>
          s.delivery_date === date ? { ...s, status: "paused" } : s,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to pause this day.");
    } finally {
      setPausingDate(null);
    }
  };

  const handleResume = async (date) => {
    setPausingDate(date);
    setError(null);
    try {
      await resumeSubscription(subscription.subscription_id, [date]);
      setSlots(
        slots.map((s) =>
          s.delivery_date === date ? { ...s, status: "pending" } : s,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resume this day.");
    } finally {
      setPausingDate(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-forest">
          This week's bowls
        </h2>
        <span className="rounded-full bg-sage/50 px-2.5 py-1 text-xs font-semibold text-forest">
          {delivered}/{slots.length} delivered
        </span>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-1.5">
        {slots.map((slot, i) => {
          const isFuture = slot.delivery_date > today;
          const isPaused = slot.status === "paused";
          const isDelivered = slot.status === "delivered";
          const canTogglePause = isFuture && !isDelivered;

          return (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                isDelivered
                  ? "border-emerald/20 bg-emerald/5"
                  : isPaused
                    ? "border-sage/60 bg-sage/20"
                    : "border-sage"
              }`}
            >
              <div>
                <p className="font-heading text-sm font-semibold text-forest">
                  {slot.product_name}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {new Date(slot.delivery_date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  · {slot.slot}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    isDelivered
                      ? "bg-emerald/10 text-emerald"
                      : isPaused
                        ? "bg-sage/50 text-text-muted"
                        : "bg-sage/40 text-text-muted"
                  }`}
                >
                  {slot.status}
                </span>

                {canTogglePause &&
                  (isPaused ? (
                    <button
                      onClick={() => handleResume(slot.delivery_date)}
                      disabled={pausingDate === slot.delivery_date}
                      className="text-[10px] font-semibold text-emerald-dark underline disabled:opacity-50"
                    >
                      {pausingDate === slot.delivery_date ? "..." : "Resume"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePause(slot.delivery_date)}
                      disabled={pausingDate === slot.delivery_date}
                      className="text-[10px] font-semibold text-red-500 underline disabled:opacity-50"
                    >
                      {pausingDate === slot.delivery_date ? "..." : "Pause"}
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
