import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Star } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdding(true);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover flex flex-col">
      {/* Image container */}
      <div
        className="relative bg-gray-50 overflow-hidden"
        style={{ height: 220 }}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-gradient-primary text-white text-[10px] font-semibold uppercase tracking-wide border-0 shadow-sm">
            {product.category}
          </Badge>
        </div>
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-semibold text-gray-700">
            {product.rating.rate}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-gradient">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400">
            {product.rating.count} reviews
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-red-50 transition-all duration-200"
            >
              <Eye size={13} /> View Details
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={`flex-1 btn-gradient text-xs font-semibold border-0 ${adding && "scale-95 opacity-80"}`}
          >
            <ShoppingCart size={13} />
            {adding ? "Added!" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
