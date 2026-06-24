import apiClient from "../utils/apiClient";

export const getPlans = async () => {
  try {
    const res = await apiClient.get("api/subscription/plans");
    return res.data.data;
  } catch (err) {
    console.error("getPlans error:", err);
    return null;
  }
};

export const calculatePrice = async (categoryId, planId, slotsPerDay) => {
  try {
    const res = await apiClient.get("/api/subscription/calculate-price", {
      params: { category_id: categoryId, plan_id: planId, slotsPerDay: slotsPerDay },
    });
    return res.data.data;
  } catch (err) {
    console.error("calculatePrice error:", err);
    return null;
  }
};

export const createSubscription = async ({ category_id, plan_id, plan_price, slots }) => {
  const res = await apiClient.post("/api/subscription/create", {
    category_id,
    plan_id,
    plan_price,
    slots,
  });
  return res.data;
};

export default {
  getPlans,
  calculatePrice,
  createSubscription,
};
