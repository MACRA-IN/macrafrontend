import apiClient from "../utils/apiClient";

export const getPlans = async () => {
  try {
    const res = await apiClient.get("api/subscription/plans");
    return res.data.data.plans;
  } catch (err) {
    console.error("getPlans error:", err);
    return null;
  }
};
export const getPublicPlans = async () => {
  try {
    const res = await apiClient.get("api/subscription/plans/public");
    return res.data;
  } catch (err) {
    console.error("getPlans error:", err);
    return null;
  }
};

export const calculatePrice = async (categoryId, planId, slotsPerDay) => {
  try {
    const res = await apiClient.get("/api/subscription/calculate-price", {
      params: {
        category_id: categoryId,
        plan_id: planId,
        slotsPerDay: slotsPerDay,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error("calculatePrice error:", err);
    return null;
  }
};

export const fillMealPlanner = async (slots) => {
  const res = await apiClient.post("/api/subscription/meal-planner/fill", {
    slots,
  });
  return res.data;
};

export const createSubscription = async ({
  category_id,
  plan_id,
  plan_price,
  slots,
}) => {
  const res = await apiClient.post("/api/subscription/create", {
    category_id,
    plan_id,
    plan_price,
    slots,
  });
  return res.data;
};

export const getMySubscription = async () => {
  try {
    const sub = await apiClient.get("/api/subscription");
    return sub.data.data;
  } catch (error) {
    console.error("getMySubscription error:", error);
    return null;
  }
};

export const pauseSubscription = async (subscriptionId, dates) => {
  const res = await apiClient.post(
    `/api/subscription/${subscriptionId}/pause`,
    { dates },
  );
  return res.data;
};

export const resumeSubscription = async (subscriptionId, dates) => {
  const res = await apiClient.post(
    `/api/subscription/${subscriptionId}/resume`,
    { dates },
  );
  return res.data;
};

export const createRenewalOrder = async (newPlanId) => {
  try {
    const res = await apiClient.post("/api/payments/renew", {
      new_plan_id: newPlanId,
    });
    return res.data.data;
  } catch (err) {
    console.error("createRenewalOrder error:", err);
    throw err;
  }
};

export const verifyRenewal = async (payload) => {
  try {
    const res = await apiClient.post("/api/payments/renew/verify", payload);
    return res.data.data;
  } catch (err) {
    console.error("verifyRenewal error:", err);
    throw err;
  }
};

export default {
  getPlans,
  calculatePrice,
  fillMealPlanner,
  createSubscription,
  pauseSubscription,
  resumeSubscription,
  createRenewalOrder,
  verifyRenewal,
};
