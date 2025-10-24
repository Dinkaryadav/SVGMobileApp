import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://your-backend-api-url.com/api"; // replace with your real .NET API base URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
