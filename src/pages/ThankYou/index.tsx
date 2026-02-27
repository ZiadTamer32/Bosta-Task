import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          navigate("/products");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const progress = ((7 - countdown) / 7) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="text-center max-w-md">
        {/* Animated checkmark */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
          <div className="relative w-28 h-28 rounded-full bg-green-50 flex items-center justify-center shadow-lg">
            <CheckCircle2 size={52} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-3">Thank You!</h1>
        <p className="text-gray-500 text-lg mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          We'll process your order shortly and keep you updated every step of
          the way.
        </p>

        {/* Countdown bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <p className="text-sm text-gray-500 mb-3">
            Redirecting to products in{" "}
            <span className="font-black text-primary text-base">
              {countdown}s
            </span>
          </p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Button
          className="btn-gradient px-8 py-5 text-base font-bold rounded-xl border-0"
          onClick={() => navigate("/products")}
        >
          <ShoppingBag size={16} className="mr-2" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
