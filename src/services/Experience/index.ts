"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const addExperience = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post(
      "/experience/create-experience",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllExperience = async () => {
  try {
    const { data } = await AxiosSecure.get("/experience");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleExperience = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/experience/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateExperience = async (payload: {
  data: FormData;
  id: string;
}) => {
  try {
    const { data } = await AxiosSecure.put(
      `/experience/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteExperience = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/experience/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
