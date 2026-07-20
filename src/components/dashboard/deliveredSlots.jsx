import { useState, useEffect } from "react";
import { pauseSubscription, resumeSubscription } from "../../services/subscriptionService";
import SlotRow from "./slotRow";

const SLOT_ORDER = { morning: 0, lunch: 1, dinner: 2 };

const nd = new Date();
const today = `${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, "0")}-${String(nd.getDate()).padStart(2, "0")}`;

export default function DeliveredSlots({ subscription, onSaved, orders }) {
  const [slots, setSlots] = useState([]);
  const [pausingDate, setPausingDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const plannerSlots = Array.isArray(subscription?.slots) ? subscription.slots : [];
    const orderList = Array.isArray(orders) ? orders : [];

    const orderMap = new Map(
      orderList.map((order) => [`${order.delivery_date}_${order.delivery_slot}`, order]),
    );

    const merged = plannerSlots.map((slot) => {
      const order = orderMap.get(`${slot.delivery_date}_${slot.slot}`);
      return {
        ...slot,
        delivery_slot: order?.delivery_slot ?? slot.slot,
        product_name: order?.product_name ?? slot.product_name,
        slottime: slot.slottime,
        status: order?.status ?? slot.status ?? "pending",
      };
    });

    merged.sort((a, b) => {
      if (a.delivery_date !== b.delivery_date) return a.delivery_date.localeCompare(b.delivery_date);
      return (SLOT_ORDER[a.slot] ?? 99) - (SLOT_ORDER[b.slot] ?? 99);
    });

    setSlots(merged);
  }, [subscription, orders]);

  const delivered = slots.filter((s) => s.status === "delivered").length;
  const pauseDaysLeft = subscription.pause_days_left ?? 0;
  const allDelivered = slots.length > 0 && delivered === slots.length;

  const handlePause = async (date) => {
    if (pauseDaysLeft <= 0) { setError("No pause days left this cycle."); return; }
    setPausingDate(date);
    setError(null);
    try {
      await pauseSubscription(subscription.subscription_id, [date]);
      await onSaved?.();
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
      await onSaved?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resume this day.");
    } finally {
      setPausingDate(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-forest">This week's bowls</h2>
          <p className="mt-0.5 text-xs text-text-muted">Track and manage your deliveries</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-sage/50">
            <div
              className="h-full rounded-full bg-emerald transition-all duration-700"
              style={{ width: slots.length > 0 ? `${(delivered / slots.length) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-xs font-bold text-forest">{delivered}/{slots.length}</span>
        </div>
      </div>

      {allDelivered && (
        <div
          className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald/25 px-4 py-3"
          style={{ background: "rgba(44,211,119,0.06)" }}
        >
          <span className="text-xl">🎉</span>
          <div>
            <p className="font-heading text-sm font-bold text-emerald-dark">All bowls delivered!</p>
            <p className="text-xs text-text-muted">Nice work staying consistent this cycle.</p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-3 flex flex-col gap-2">
        {slots.map((slot, i) => (
          <SlotRow
            key={i}
            slot={slot}
            today={today}
            pausingDate={pausingDate}
            pauseDaysLeft={pauseDaysLeft}
            onPause={handlePause}
            onResume={handleResume}
          />
        ))}
      </div>
    </div>
  );
}
