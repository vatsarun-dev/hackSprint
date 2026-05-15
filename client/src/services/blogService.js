import { apiClient } from "./apiClient";
import { mapBlog, unwrapApiData } from "./mappers";

export const blogService = {
  async getAll() {
    const response = await apiClient.get("/blog");
    return unwrapApiData(response).map(mapBlog);
  },
  async create(payload) {
    const response = await apiClient.post("/blog", payload, {
      headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return mapBlog(unwrapApiData(response));
  },
  async update(id, payload) {
    const response = await apiClient.patch(`/blog/${id}`, payload, {
      headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return mapBlog(unwrapApiData(response));
  },
  async delete(id) {
    const response = await apiClient.delete(`/blog/${id}`);
    return mapBlog(unwrapApiData(response));
  },
};
