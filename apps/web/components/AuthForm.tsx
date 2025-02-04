"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { userSchema } from "@repo/zod-schemas/user";

const AuthForm = (): React.ReactNode => {
  const [isSignIn, setIsSignIn] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof userSchema>();

  const onSubmit = (data: UserSchema) => {
    if (isSignIn) {
      console.log("Signing in with:", {
        email: data.email,
        password: data.password,
      });
    } else {
      console.log("Signing up with:", data);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-center mb-8">
          <span className="text-3xl font-bold text-blue-600">Paytm</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isSignIn ? "Sign In to Paytm" : "Create New Account"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isSignIn && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                {...register("name", { required: "Full name is required" })}
                type="text"
                id="name"
                placeholder="Full Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 p-3 border"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 p-3 border"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 p-3 border"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
              hover:bg-blue-700 transition-colors font-medium"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {isSignIn && (
          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to Paytm&apos;s <br />
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
