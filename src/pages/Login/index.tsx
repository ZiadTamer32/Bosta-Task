import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError("");
    try {
      await login(values);
      navigate("/products", { replace: true });
    } catch {
      setServerError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Top bar */}
          <div className="h-1.5 bg-gradient-primary" />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                <LogIn size={22} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-gray-900">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to access your account
              </p>
            </div>

            {/* Hint */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-6 text-xs text-gray-600">
              <span className="font-semibold text-primary">
                Demo credentials:
              </span>{" "}
              <code className="bg-white px-1 rounded">mor_2314</code> /{" "}
              <code className="bg-white px-1 rounded">83r5^_</code>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Username */}
              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-gray-700"
                >
                  Username
                </label>
                <Input
                  id="username"
                  placeholder="e.g. mor_2314"
                  {...register("username")}
                  className={`rounded-xl border-gray-200 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 ${
                    errors.username ? "border-red-400" : ""
                  }`}
                />
                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`rounded-xl border-gray-200 pr-10 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 ${
                      errors.password ? "border-red-400" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-600">
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-gradient font-bold py-6 rounded-xl text-base border-0"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner size="sm" /> Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/products"
                className="text-primary font-semibold hover:underline"
              >
                Browse as Guest
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
