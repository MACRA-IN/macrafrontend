import apiClient from "../utils/apiClient";

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const getMyOrders = async () => {
  const { data } = await apiClient.get("/api/orders/my-orders");
  return Array.isArray(data) ? data : (data.orders ?? data.results ?? []);
};
