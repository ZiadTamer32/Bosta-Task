import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/ui/EmptyState";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } =
    useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate("/thank-you");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-black text-gray-900 mb-8">
          My <span className="text-gradient">Cart</span>
        </h1>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <EmptyState
            icon={<ShoppingCart size={32} />}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Browse our products to find something you love."
            action={
              <Link to="/products">
                <Button className="btn-gradient">
                  <ShoppingBag size={15} className="mr-2" /> Browse Products
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-900">
          My <span className="text-gradient">Cart</span>{" "}
          <span className="text-xl text-gray-400 font-normal">
            ({items.length} items)
          </span>
        </h1>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 group card-hover"
            >
              {/* Image */}
              <Link to={`/products/${item.id}`} className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <Link to={`/products/${item.id}`}>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 capitalize">
                  {item.category}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  {/* Stepper */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-gradient">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-500"
                >
                  <span className="truncate max-w-[150px]">
                    {item.title.split(" ").slice(0, 3).join(" ")}… ×
                    {item.quantity}
                  </span>
                  <span className="font-medium text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-gradient">
                ${total().toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full btn-gradient font-bold py-6 rounded-xl border-0 text-base"
              onClick={handleCheckout}
            >
              <ShoppingBag size={16} className="mr-2" /> Checkout
            </Button>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-xs text-gray-400 hover:text-red-500 transition-colors py-2"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
