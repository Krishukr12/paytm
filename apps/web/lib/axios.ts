import { BACKEND_URL } from "@/const/Url";
import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosAuth = axios.create({
  baseURL: BACKEND_URL,
});

axiosAuth.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user && "accessToken" in session.user) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});
