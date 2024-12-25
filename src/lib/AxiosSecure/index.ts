import config from "@/src/config";
import { getNewAccessToken } from "@/src/services/Auth";
import axios from "axios";
import { cookies } from "next/headers";

export const AxiosSecure = axios.create({
  baseURL: config.base_url,
});

// Add a request interceptor
AxiosSecure.interceptors.request.use(
  async (config) => {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async function (error) {
    // Do something with request error
    const config = error.config;
    if (error.response?.status === 401 && !config.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res?.data?.accessToken;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      const cookiesStore = await cookies();
      cookiesStore.set("accessToken", accessToken);
      return AxiosSecure(config);
    } else {
      return Promise.reject(error);
    }
  }
);

// Add a response interceptor
AxiosSecure.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
