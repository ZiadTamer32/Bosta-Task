import api from "./api";
import type { Product, CreateProductInput } from "@/types";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await api.get<Product[]>("/products");
    return res.data;
  },

  getById: async (id: number): Promise<Product> => {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  },

  getCategories: async (): Promise<string[]> => {
    const res = await api.get<string[]>("/products/categories");
    return res.data;
  },

  create: async (data: CreateProductInput): Promise<Product> => {
    const res = await api.post<Product>("/products", data);
    return res.data;
  },
};
