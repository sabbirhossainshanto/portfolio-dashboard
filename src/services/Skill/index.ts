"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const addSkill = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post("/skill/create-skill", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllSkill = async () => {
  try {
    const { data } = await AxiosSecure.get("/skill");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleSkill = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/skill/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateSkill = async (payload: { data: FormData; id: string }) => {
  try {
    const { data } = await AxiosSecure.put(
      `/skill/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteSkill = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/skill/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
