import { create } from "zustand";
import { authService } from "@/services/authService";
import type { LoginCredentials } from "@/types";

const TOKEN_KEY = "bosta_token";
const USER_KEY = "bosta_user";

interface AuthStore {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  username: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  hydrate: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const username = localStorage.getItem(USER_KEY);
    if (token) {
      set({ token, username, isAuthenticated: true });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { token } = await authService.login(credentials);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, credentials.username);
      set({
        token,
        username: credentials.username,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ token: null, username: null, isAuthenticated: false, error: null });
  },
}));
