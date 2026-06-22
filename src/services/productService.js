import apiClient from "../utils/apiClient";

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/api/products");
    console.log("Products response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
    console.log("Categories response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
