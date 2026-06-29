import apiClient from "../utils/apiClient";

export const login = async (email, password) => {
  const res = await apiClient.post("/api/customers/login", { email, password });
  return res.data;
};

export const register = async ({ name, email, password, phone }) => {
  const res = await apiClient.post("/api/customers/register", {
    name,
    email,
    password,
    phone,
  });
  return res.data;
};

export const googleAuth = async (credential) => {
  const res = await apiClient.post("/api/customers/google-auth", {
    credential,
  });
  return res.data;
};
