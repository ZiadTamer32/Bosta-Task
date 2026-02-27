import api from "./api";
import type { LoginCredentials, LoginResponse } from "@/types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", credentials);
    return res.data;
  },
};
