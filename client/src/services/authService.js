import { apiClient } from "./apiClient";
import { mapUser, unwrapApiData } from "./mappers";

export const authService = {
  async login(payload) {
    const response = await apiClient.post("/user/login", payload);
    return mapUser(unwrapApiData(response));
  },
  async signup(payload) {
    const response = await apiClient.post("/user/register", payload);
    return mapUser(unwrapApiData(response));
  },
  async me() {
    const response = await apiClient.get("/user/me", { skipAuthRefresh: true });
    return mapUser(unwrapApiData(response));
  },
  async logout() {
    await apiClient.get("/user/logout");
  },
  async updateProfile(payload) {
    const response = await apiClient.patch("/user/me", payload, {
      headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return mapUser(unwrapApiData(response));
  },
};



