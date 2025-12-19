import api from "./axios";


export const getMyProfile = () => api.get("/profile/me/");
export const updateProfile = (data: FormData) =>
  api.put("/profile/me/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getPublicProfile = (username: string) =>
  api.get(`/profile/${username}/`);

export const fetchProducts = (params: any) =>
  api.get("/products/", { params });

export const fetchCategories = () =>
  api.get("/products/categories/");