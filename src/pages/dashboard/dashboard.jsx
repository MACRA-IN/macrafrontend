import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LogOut } from "lucide-react";
import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";
import MealPlanner from "../../components/dashboard/mealPlanner";
import SubscriptionCard from "../../components/dashboard/subscriptionCard";
import DeliveredSlots from "../../components/dashboard/deliveredSlots";
import DashboardEmptyState from "../../components/dashboard/dashboardEmptyState";
import DashboardSkeleton from "../../components/dashboard/dashboardSkeleton";
import { useAuth } from "../../context/authContext";
import { getMySubscription } from "../../services/subscriptionService";

const DASHBOARD_SEO = <SEO title="My Dashboard | Macra" noIndex />;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const loadSubscription = async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const data = await getMySubscription();
      setSubscription(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSubscription(true);
  }, []);

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleRenewed = () => {
    showFeedback(
      "Subscription renewed! Your deliveries continue without interruption.",
    );
    loadSubscription();
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (loading) {
    return (
      <div>
        {DASHBOARD_SEO}
        <Header />
        <DashboardSkeleton />
        <Footer />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div>
        {DASHBOARD_SEO}
        <Header />
        <DashboardEmptyState onLogout={handleLogout} />
        <Footer />
      </div>
    );
  }

  return (
    <div
      style={{ background: "linear-gradient(180deg, #F2FAF5 0%, #FFFFFF 60%)" }}
    >
      {DASHBOARD_SEO}
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
              {user?.name
                ? `Hey, ${user.name.split(" ")[0]} 👋`
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

        {/* Subscription summary card */}
        <div className="mt-5">
          <SubscriptionCard
            subscription={subscription}
            feedback={feedback}
            onPauseHint={() =>
              showFeedback("👇 Use Pause / Resume on a meal row below.")
            }
            onRenewed={handleRenewed}
          />
        </div>

        {/* Meal section */}
        <div
          className="mt-5 rounded-3xl border border-sage bg-white p-5 sm:p-6"
          style={{ boxShadow: "0 2px 20px rgba(15,43,29,0.06)" }}
        >
          {Array.isArray(subscription.slots) &&
          subscription.slots.length > 0 ? (
            <DeliveredSlots
              subscription={subscription}
              onSaved={loadSubscription}
            />
          ) : (
            <MealPlanner
              subscription={subscription}
              onSaved={loadSubscription}
            />
          )}
        </div>

        {/* Mobile logout */}
        <div className="mt-8 flex items-center justify-center border-t border-sage pt-5 md:hidden">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-text-muted transition-colors hover:bg-sage/40 hover:text-forest"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>
      {refreshing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
            <p className="mt-3 text-center text-sm font-medium text-forest">
              Updating your meals...
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
