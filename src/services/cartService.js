import apiClient from "../utils/apiClient";

export const fetchCartAPI = (customer_id) =>
  apiClient.get(`/api/cart/${customer_id}`).then((r) => r.data);

export const addToCartAPI = (payload) =>
  apiClient.post("/api/cart/add", payload).then((r) => r.data);

export const selectPlanAPI = (payload) =>
  apiClient.post("/api/cart/select-plan", payload).then((r) => r.data);

export const updateCartItemAPI = (payload) =>
  apiClient.post("/api/cart/update", payload).then((r) => r.data);
