import apiClient from "../utils/apiClient";

export const createPaymentOrder = async ({
  category_id,
  plan_id,
  slots,
  meal_type,
}) => {
  const res = await apiClient.post("/api/payments/create-order", {
    category_id,
    plan_id,
    slots,
    meal_type,
  });

  return res.data.data;
};

export const verifyPayment = async (payload) => {
  const res = await apiClient.post("/api/payments/verify", payload);

  return res.data.data;
};