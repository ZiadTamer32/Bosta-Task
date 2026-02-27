import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Heart,
  ShoppingBag,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  const valueCards = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "From browse to checkout in seconds. Our streamlined experience removes all friction from your path to purchase.",
      color: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      desc: "Every transaction is protected with bank-grade encryption. Shop with total confidence, every time.",
      color: "bg-red-50",
      iconColor: "text-primary",
    },
    {
      icon: Heart,
      title: "Customer First",
      desc: "Our team is available around the clock to make sure your experience always exceeds expectations.",
      color: "bg-pink-50",
      iconColor: "text-pink-500",
    },
  ];
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-hero z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80')`,
          }}
        />
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl z-10" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl z-10" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-10 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
              style={{ animation: "fadeSlideIn 0.5s ease-out 0.2s both" }}
            >
              Shop the Future, <span className="text-white/80">Today.</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-white/75 leading-relaxed mb-10 max-w-xl"
              style={{ animation: "fadeSlideIn 0.5s ease-out 0.3s both" }}
            >
              Discover premium products at unbeatable prices. A curated shopping
              experience crafted for the modern buyer.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "fadeSlideIn 0.5s ease-out 0.4s both" }}
            >
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/95 font-bold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  Shop Now
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white bg-white/10 hover:bg-white backdrop-blur-sm font-semibold px-8 py-6 text-base rounded-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="bg-gray-50/50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Featured <span className="text-gradient">Collections</span>
              </h2>
              <p className="text-gray-500 max-w-xl text-lg">
                Explore our most popular items, hand-picked for their
                exceptional quality and design.
              </p>
            </div>
            <Link to="/products" className="shrink-0">
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 hover:border-primary hover:text-primary transition-all group px-6 py-5 h-auto text-base font-bold"
              >
                View All Products
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <Skeleton className="h-[220px] w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 rounded-lg" />
                    <Skeleton className="h-8 w-full rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-12">
              <EmptyState
                icon={<Package size={48} />}
                title="No featured products"
                description="We're currently updating our catalog with new collections. Please check back shortly!"
                action={
                  <Link to="/products">
                    <Button className="btn-gradient">
                      <ShoppingBag size={18} className="mr-2" />
                      Our Full Catalog
                    </Button>
                  </Link>
                }
              />
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Built for the{" "}
              <span className="text-gradient">Modern Shopper</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              We believe shopping should be effortless, enjoyable, and
              inspiring. That's why we hand-pick every product with you in mind.
            </p>
          </div>
          {/* Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueCards.map(({ icon: Icon, title, desc, color, iconColor }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover text-center"
              >
                <div
                  className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={26} className={iconColor} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
