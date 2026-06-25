import apiClient from "../utils/apiClient";

export const updateAddress = async (data) => {
  try {
    const res = await apiClient.put("/api/address/update", data);
    return res.data.data;
  } catch (error) {
    console.error("updateAddress error:", error);
    throw error;
  }
};
