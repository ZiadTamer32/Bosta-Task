import { create } from "zustand";
import { productService } from "@/services/productService";
import type { Product, SortOrder } from "@/types";

interface ProductStore {
  products: Product[];
  product: Product | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  sortOrder: SortOrder;
  page: number;
  perPage: number;
  fetchProducts: () => Promise<void>;
  fetchSpecificProduct: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setCategory: (category: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setPage: (page: number) => void;
  getFiltered: () => Product[];
  getTotalPages: () => number;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  product: null,
  categories: [],
  loading: false,
  error: null,
  selectedCategory: "",
  sortOrder: "",
  page: 1,
  perPage: 10,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await productService.getAll();
      set({ products, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load products";
      set({ error: message, loading: false });
    }
  },

  fetchSpecificProduct: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const product = await productService.getById(id);
      set({ product, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load categories";
      set({ error: message, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await productService.getCategories();
      set({ categories });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load categories";
      set({ error: message, loading: false });
    }
  },

  setCategory: (category) => set({ selectedCategory: category, page: 1 }),
  setSortOrder: (order) => set({ sortOrder: order, page: 1 }),
  setPage: (page) => set({ page }),

  getFiltered: () => {
    const { products, selectedCategory, sortOrder, page, perPage } = get();
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    const start = (page - 1) * perPage;
    return result.slice(start, start + perPage);
  },

  getTotalPages: () => {
    const { products, selectedCategory, perPage } = get();
    let count = products.length;
    if (selectedCategory) {
      count = products.filter((p) => p.category === selectedCategory).length;
    }
    return Math.ceil(count / perPage);
  },
}));
