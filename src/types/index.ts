export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateProductInput {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type SortOrder = "asc" | "desc" | "";
