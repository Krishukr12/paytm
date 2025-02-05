"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { FiLogIn, FiArrowRight } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "@repo/zod-schemas/user";
import { ErrorMessage } from "@/components/ErrorMessage";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/const/Url";
import { useState } from "react";

interface UserLoginSchema {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [responseError, setResponseError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (loginData: UserLoginSchema) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        loginData
      );
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          setResponseError(error.response?.data.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 transition-all duration-300 hover:shadow-2xl">
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
          {responseError ? (
            <ErrorMessage message={responseError} />
          ) : (
            <p className="text-gray-500">Sign in to continue your journey</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              {...register("email", {})}
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
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message ?? " "} />
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className=" disabled:opacity-50 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-lg font-medium transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-sm"
          >
            {isSubmitting ? "Loading..." : "Sign In"}
            <FiArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
