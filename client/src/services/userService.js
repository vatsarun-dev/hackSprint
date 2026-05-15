import { apiClient } from "./apiClient";
import { mapUser, unwrapApiData } from "./mappers";

export const userService = {
  async search(search = "") {
    const response = await apiClient.get("/search/users", {
      params: search ? { search } : undefined,
    });
    return unwrapApiData(response).map(mapUser);
  },
  async getProfile(username) {
    const response = await apiClient.get(`/user/profile/${username}`);
    return mapUser(unwrapApiData(response));
  },
};
