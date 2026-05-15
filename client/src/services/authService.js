import { apiClient, clearAccessToken, setAccessToken } from "./apiClient";
import { mapUser, unwrapApiData } from "./mappers";

const normalizeAuthPayload = (response) => {
  const data = unwrapApiData(response);
  const user = data?.user || data;

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return mapUser(user);
};

export const authService = {
  async login(payload) {
    const response = await apiClient.post("/user/login", payload);
    return normalizeAuthPayload(response);
  },
  async signup(payload) {
    const response = await apiClient.post("/user/register", payload);
    return normalizeAuthPayload(response);
  },
  async me() {
    const response = await apiClient.get("/user/me", { skipAuthRefresh: true });
    return mapUser(unwrapApiData(response));
  },
  async logout() {
    try {
      await apiClient.get("/user/logout");
    } finally {
      clearAccessToken();
    }
  },
  async updateProfile(payload) {
    const response = await apiClient.patch("/user/me", payload, {
      headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return mapUser(unwrapApiData(response));
  },
};



