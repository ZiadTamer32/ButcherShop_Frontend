import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useLogin from "../featuers/admin/useLogin";
import useUser from "../featuers/admin/useUser";
import Spinner from "../components/Spinner";

// Type definition for login form data
type FormData = {
  email: string;
  password: string;
};

// Admin login page component
const LoginPage = () => {
  const navigate = useNavigate();

  // Custom hook for login mutation - handles API call and loading state
  const { login, isPending } = useLogin();

  const { user, isPending: isPendingUser } = useUser();

  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission - validates data then calls login API
  const handleLogin = (data: FormData) => {
    login(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  if (isPendingUser) {
    return <Spinner />;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-background">
      <div className="mx-auto px-4 w-full">
        {/* Login card container with gradient background */}
        <div className="max-w-md mx-auto gradient-card p-8 rounded-2xl shadow-strong">
          {/* Header section with icon, title, and subtitle */}
          <div className="text-center mb-8">
            {/* Circular gradient icon container */}
            <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
              لوحة التحكم
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg">
              تسجيل الدخول للوصول إلى الطلبات
            </p>
          </div>

          {/* Login form with email and password fields */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email input field */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                {/* Mail icon inside input field */}
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="example@gmail.com"
                  className="pr-10"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {/* Display email validation error if exists */}
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            {/* Password input field */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                {/* Lock icon inside input field */}
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="••••••"
                  className="pr-10 pl-10"
                />
                {/* Toggle button to show/hide password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Display password validation error if exists */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            {/* Submit button with loading spinner */}
            <Button type="submit" size="lg" className="w-full">
              {isPending ? <Loader className="animate-spin" /> : "تسجيل الدخول"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
