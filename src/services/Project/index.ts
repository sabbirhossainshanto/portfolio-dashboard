"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const addProject = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post("/project/create-project", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllProject = async () => {
  try {
    const { data } = await AxiosSecure.get("/project");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleProject = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/project/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateProject = async (payload: {
  data: FormData;
  id: string;
}) => {
  try {
    const { data } = await AxiosSecure.put(
      `/project/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteProject = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/project/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
