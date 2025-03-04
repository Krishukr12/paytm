"use client";

import Image from "next/image";
import Link from "next/link";
import axios, { AxiosError } from "axios";

import { useState } from "react";
import { COUNTRY_CODES } from "@/const/CountryCode";
import { FiEye, FiEyeOff, FiChevronDown } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/ErrorMessage";
import { userSchema } from "@repo/zod-schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { BACKEND_URL } from "@/const/Url";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserSchema {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry] = useState(COUNTRY_CODES[0]);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    mode: "onBlur",
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    try {
      toast.info("Creating account...");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        data,
      );
      toast.success(response.data.message);
      router.push("/signin");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Account
          </h1>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            {errors.name && (
              <ErrorMessage message={errors.name?.message ?? ""} />
            )}
          </div>

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
              <ErrorMessage message={errors.email?.message ?? ""} />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={`https://flagcdn.com/24x18/${selectedCountry.country.toLowerCase()}.png`}
                    alt={selectedCountry.name}
                    width={24}
                    height={18}
                    className="w-6 h-4 object-cover rounded-sm"
                  />
                  <span className="text-gray-600">{selectedCountry.code}</span>
                  <FiChevronDown className="ml-auto text-gray-400" />
                </button>
              </div>
              <input
                {...register("phoneNumber")}
                type="tel"
                placeholder="123 456 7890"
                className="flex-[2] px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {errors.phoneNumber && (
              <ErrorMessage message={errors.phoneNumber?.message ?? ""} />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && (
                <ErrorMessage message={errors.password?.message ?? ""} />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-lg font-medium transition-all transform hover:scale-[1.01] shadow-sm"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
