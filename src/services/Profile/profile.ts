"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const updateProfile = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post("/profile/update-profile", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getMyProfile = async () => {
  try {
    const { data } = await AxiosSecure.get("/profile/my-profile");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
