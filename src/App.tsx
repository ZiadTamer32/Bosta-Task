import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "@/pages/Home";
import ProductsPage from "@/pages/Products";
import ProductDetailPage from "@/pages/ProductDetail";
import CreateProductPage from "@/pages/CreateProduct";
import CartPage from "@/pages/Cart";
import ThankYouPage from "@/pages/ThankYou";
import LoginPage from "@/pages/Login";

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateCart = useCartStore((s) => s.hydrate);

  useEffect(() => {
    hydrateAuth();
    hydrateCart();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}
