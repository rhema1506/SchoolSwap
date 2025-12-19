import api from "./axios";

export const getAdminStats = () => api.get("/admin/stats/");
export const getUsers = () => api.get("/admin/users/");
export const toggleUserBlock = (id: number) =>
  api.post(`/admin/users/${id}/toggle/`);