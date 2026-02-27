import { create } from "zustand";
import type { CartItem, Product } from "@/types";

const CART_KEY = "bosta_cart";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  hydrate: () => void;
  total: () => number;
  itemCount: () => number;
}

const save = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  hydrate: () => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      set({ items: JSON.parse(stored) as CartItem[] });
    }
  },

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        updated = [...state.items, { ...product, quantity: 1 }];
      }
      save(updated);
      return { items: updated };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const updated = state.items.filter((i) => i.id !== id);
      save(updated);
      return { items: updated };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        const updated = state.items.filter((i) => i.id !== id);
        save(updated);
        return { items: updated };
      }
      const updated = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i,
      );
      save(updated);
      return { items: updated };
    });
  },

  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    set({ items: [] });
  },
  total: () => {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  itemCount: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },
}));
