"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiArrowRight, FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "@repo/zod-schemas/user";
import { ErrorMessage } from "@/components/ErrorMessage";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserLoginSchema {
  email: string;
  password: string;
}

const TEST_ACCOUNTS = [
  {
    role: "Sender Account",
    email: "sender@demo.com",
    password: "Sender@demo123",
    description: "Account for sending money to other users",
  },
  {
    role: "Receiver Account",
    email: "receiver@demo.com",
    password: "Receiver@demo123",
    description: "Account for receiving money from other users",
  },
];

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
    mode: "onBlur",
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.info(`${label} copied to clipboard!`, {
      position: "top-center",
      duration: 2000,
    });
  };

  const onSubmit = async (data: UserLoginSchema) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      toast.error(response?.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 transition-all duration-300 hover:shadow-2xl mx-4">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <span className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <FiLogIn className="w-8 h-8" />
              Paytm
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Use your credentials or try our demo accounts
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            {errors.email && (
              <ErrorMessage message={errors.email.message ?? ""} />
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <ErrorMessage message={errors.password.message ?? " "} />
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="disabled:opacity-50 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-lg font-medium transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-sm"
          >
            {isSubmitting ? "Loading..." : "Sign In"}
            <FiArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-medium text-gray-500 text-center">
            Try these demo accounts
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {TEST_ACCOUNTS.map((account, index) => (
              <div
                key={index}
                className="group relative border rounded-lg p-4 transition-all hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex justify-between items-start">
                  <div className="w-[calc(100%-24px)]">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {account.role}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {account.description}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center text-sm justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 mr-2">
                        Email:
                      </span>
                      <span className="text-gray-500 truncate">
                        {account.email}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(account.email, "Email")}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center text-sm justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 mr-2">
                        Password:
                      </span>
                      <span className="text-gray-500 truncate">
                        {account.password}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(account.password, "Password")}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
