import apiClient from "../utils/apiClient";

export const checkDeliveryArea = async (latitude, longitude) => {
  try {
    const response = await apiClient.post("api/location/check-delivery-area", {
      latitude,
      longitude,
    });

    return response.data;
  } catch (error) {
    console.error("Error checking delivery area:", error);
    throw error;
  }
};

export const joinWaitlist = async (location_check_id) => {
  try {
    const response = await apiClient.post("api/location/join", {
      location_check_id,
    });

    return response.data;
  } catch (error) {
    console.error("Error joining waitlist:", error);
    throw error;
  }
};
