import { BACKEND_URL } from "@/const/Url";
import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosAuth = axios.create({
  baseURL: BACKEND_URL,
});

axiosAuth.interceptors.request.use(async (config) => {
  let retries = 3;
  let session = null;

  while (retries > 0 && !session) {
    session = await getSession();
    if (!session) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      retries--;
    }
  }

  if (session?.user && "accessToken" in session.user) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});
