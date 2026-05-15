import { apiClient } from "./apiClient";
import { mapProject, unwrapApiData } from "./mappers";

export const projectService = {
  async getAll() {
    const response = await apiClient.get("/project");
    const projects = unwrapApiData(response);
    return Array.isArray(projects) ? projects.map(mapProject) : [];
  },
  async create(payload) {
    const response = await apiClient.post("/project", payload, {
      headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return mapProject(unwrapApiData(response));
  },
  async update(id, payload) {
    const response = await apiClient.patch(`/project/${id}`, payload, {
      headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return mapProject(unwrapApiData(response));
  },
  async delete(id) {
    const response = await apiClient.delete(`/project/${id}`);
    return mapProject(unwrapApiData(response));
  },
};
