import { useEffect } from "react";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/ui/EmptyState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { SortOrder } from "@/types";

export default function ProductsPage() {
  const {
    loading,
    error,
    categories,
    selectedCategory,
    sortOrder,
    page,
    fetchProducts,
    fetchCategories,
    setCategory,
    setSortOrder,
    setPage,
    getFiltered,
    getTotalPages,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const products = getFiltered();
  const totalPages = getTotalPages();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-50px)]">
        <div className="flex flex-col items-center justify-center bg-red-50 border w-full max-w-7xl min-h-[50vh] border-red-100 rounded-2xl p-6 text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <p className="text-red-600 font-semibold">
            {error || "Something went wrong"}
          </p>

          <Button
            className="mt-3 btn-gradient text-sm"
            onClick={() => {
              fetchProducts();
              fetchCategories();
              window.location.reload();
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          Our <span className="text-gradient">Products</span>
        </h1>
        <p className="text-gray-500">
          Browse our curated collection of premium items
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Category */}
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-gray-400" />
          <Select
            value={selectedCategory || "all"}
            onValueChange={(v) => setCategory(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-48 h-9 rounded-xl border-gray-200 text-sm focus:ring-primary">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-gray-400" />
          <Select
            value={sortOrder || "default"}
            onValueChange={(v) =>
              setSortOrder((v === "default" ? "" : v) as SortOrder)
            }
          >
            <SelectTrigger className="w-44 h-9 rounded-xl border-gray-200 text-sm focus:ring-primary">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Order</SelectItem>
              <SelectItem value="asc">Price: Low → High</SelectItem>
              <SelectItem value="desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filters */}
        {(selectedCategory || sortOrder) && (
          <button
            onClick={() => {
              setCategory("");
              setSortOrder("");
            }}
            className="ml-auto text-xs text-gray-400 hover:text-primary flex items-center gap-1 transition-colors"
          >
            <SlidersHorizontal size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
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
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your filters or clearing the search to see more results."
          action={
            <Button
              onClick={() => {
                setCategory("");
                setSortOrder("");
              }}
              className="btn-gradient"
            >
              Clear Filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="rounded-xl border-gray-200 hover:border-primary hover:text-primary"
              >
                <ChevronLeft size={16} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={p === page ? "default" : "outline"}
                  onClick={() => setPage(p)}
                  className={
                    p === page
                      ? "btn-gradient rounded-xl border-0 min-w-[36px]"
                      : "rounded-xl border-gray-200 hover:border-primary hover:text-primary min-w-[36px]"
                  }
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="rounded-xl border-gray-200 hover:border-primary hover:text-primary"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
