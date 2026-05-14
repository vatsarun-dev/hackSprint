import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.devconnect.local",
  timeout: 5000,
});
