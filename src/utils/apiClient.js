import axios from "axios";
import getSnakOptions from "./snakUtils";

const snaks = getSnakOptions();
const apiClient = axios.create({
  baseURL: snaks.Base_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
