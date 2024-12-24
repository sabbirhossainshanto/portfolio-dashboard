"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IChangePassword } from "@/src/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (payload: FieldValues) => {
  try {
    const { data } = await AxiosSecure.post("/auth/register", payload);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data?.data?.accessToken);
    cookieStore.set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (payload: FieldValues) => {
  try {
    const { data } = await AxiosSecure.post("/auth/login", payload);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data?.data?.accessToken);
    cookieStore.set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export const changePassword = async (payload: IChangePassword) => {
  try {
    const { data } = await AxiosSecure.post("/auth/change-password", payload);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const forgotPassword = async (payload: { email: string }) => {
  try {
    const { data } = await AxiosSecure.post("/auth/forgot-password", payload);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let decode = null;
  if (accessToken) {
    decode = await jwtDecode(accessToken);
    return {
      id: decode?.id,
      name: decode?.name,
      email: decode?.email,
      role: decode?.role,
      iat: decode?.iat,
      exp: decode?.exp,
      profilePhoto: decode?.profilePhoto,
    };
  }
  return decode;
};

export const getNewAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const res = await AxiosSecure({
      url: "/auth/refreshToken",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
