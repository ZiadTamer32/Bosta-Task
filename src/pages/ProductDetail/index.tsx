import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Package, SearchX } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const { product, loading, error, fetchSpecificProduct } = useProductStore();
  const [adding, setAdding] = useState(false);

  const products = useProductStore((s) => s.products);
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id,
  );

  useEffect(() => {
    const productId = parseInt(id ?? "", 10);
    fetchSpecificProduct(productId);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdding(true);
    setTimeout(() => setAdding(false), 700);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 min-h-[calc(100vh-4rem)]">
        <Skeleton className="h-8 w-28 rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3 rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Package size={28} className="text-primary/50" />
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">
            {error || "Product Not Found"}
          </h2>
          <p className="text-gray-500 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="btn-gradient"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-4 group"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
        {/* Image for large screens*/}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hidden sm:flex items-center justify-center p-10 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5 pt-2">
          <div>
            <Badge className="bg-gradient-primary text-white pt-1 border-0 text-xs uppercase mb-3">
              {product.category}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Image for small screens*/}
          <div className="bg-white w-full h-72 rounded-3xl border border-gray-100 shadow-sm sm:hidden flex items-center justify-center p-10 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl font-black text-gradient">
            ${product.price.toFixed(2)}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
              Description
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Add to Cart */}
          <Button
            size="lg"
            onClick={handleAddToCart}
            className={`btn-gradient text-base font-bold py-6 rounded-xl border-0 ${adding ? "opacity-80 scale-95" : ""} transition-all duration-200`}
          >
            <ShoppingCart size={18} className="mr-2" />
            {adding ? "✓ Added to Cart!" : "Add to Cart"}
          </Button>
        </div>
      </div>
      {/* Related Products */}
      <div className="sm:pt-16 pt-8">
        <h3 className="text-2xl font-bold text-gray-700 uppercase tracking-wide mb-2">
          Related Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))
          ) : (
            <EmptyState
              className="col-span-full py-2"
              icon={<SearchX size={32} />}
              title="No related products found"
              description="Check back later for more products in this category."
            />
          )}
        </div>
      </div>
    </div>
  );
}
