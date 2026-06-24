import apiClient from "../utils/apiClient";

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};