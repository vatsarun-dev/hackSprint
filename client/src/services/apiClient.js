import axios from "axios";

const ACCESS_TOKEN_KEY = "devconnect_access_token";

export const getAccessToken = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};

export const setAccessToken = (token) => {
  if (typeof window === "undefined") return;

  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const clearAccessToken = () => setAccessToken("");

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://hacksprint-r6t3.onrender.com/api",
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      originalRequest._retry = true;

      try {
        const response = await apiClient.get("/user/refresh");
        const nextToken = response.data?.data?.accessToken;
        setAccessToken(nextToken);
        return apiClient(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);


