import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { PlusCircle, CheckCircle2 } from "lucide-react";
import { productService } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Please select a category"),
  image: z.string().url("Must be a valid image URL"),
});

type FormValues = z.infer<typeof schema>;

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const imageUrl = watch("image");

  useEffect(() => {
    productService
      .getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const onSubmit = async (values: FormValues) => {
    setServerError("");
    try {
      await productService.create(values);
      setSuccess(true);
      setTimeout(() => navigate("/products"), 2500);
    } catch {
      setServerError("Failed to create product. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={36} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          Product Created!
        </h2>
        <p className="text-gray-500 mb-4">
          Redirecting you to the products page...
        </p>
        <Spinner size="md" className="mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top bar */}
        <div className="h-1.5 bg-gradient-primary" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-md">
              <PlusCircle size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Create Product
              </h1>
              <p className="text-gray-500 text-sm">
                Add a new item to the store
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Title */}
            <div className="space-y-1.5">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700"
              >
                Product Title <span className="text-primary">*</span>
              </label>
              <Input
                id="title"
                placeholder="e.g. Premium Wireless Headphones"
                {...register("title")}
                className={`rounded-xl border-gray-200 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 ${errors.title ? "border-red-400" : ""}`}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700"
              >
                Description <span className="text-primary">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe the product in detail..."
                {...register("description")}
                className={`w-full px-3 py-2 text-sm border rounded-xl outline-none transition-all resize-none bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-offset-0 border-gray-200 ${errors.description ? "border-red-400" : ""}`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price + Category row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Price */}
              <div className="space-y-1.5">
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-700"
                >
                  Price (USD) <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    {...register("price", { valueAsNumber: true })}
                    className={`rounded-xl border-gray-200 pl-7 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 ${errors.price ? "border-red-400" : ""}`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Category <span className="text-primary">*</span>
                </label>
                <Select
                  onValueChange={(v) =>
                    setValue("category", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={`rounded-xl border-gray-200 focus:ring-primary ${errors.category ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label
                htmlFor="image"
                className="text-sm font-semibold text-gray-700"
              >
                Image URL <span className="text-primary">*</span>
              </label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register("image")}
                className={`rounded-xl border-gray-200 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 ${errors.image ? "border-red-400" : ""}`}
              />
              {errors.image && (
                <p className="text-xs text-red-500">{errors.image.message}</p>
              )}
              {/* Preview */}
              {imageUrl && !errors.image && (
                <div className="mt-2 h-28 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-600">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gradient font-bold py-6 rounded-xl text-base border-0"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" /> Creating Product...
                </span>
              ) : (
                <>
                  <PlusCircle size={16} className="mr-2" /> Create Product
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
