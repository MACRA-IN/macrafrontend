import apiClient from "../utils/apiClient";

export const checkDeliveryArea = async (latitude, longitude) => {
  try {
    const response = await apiClient.post("api/location/check-delivery-area", {
      latitude,
      longitude,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error checking delivery area:", error);
    throw error;
  }
};
