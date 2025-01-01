"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const createBlog = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post("/blog/create-blog", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllBlog = async () => {
  try {
    const { data } = await AxiosSecure.get("/blog");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleBlog = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/blog/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateBlog = async (payload: { data: FormData; id: string }) => {
  try {
    const { data } = await AxiosSecure.put(`/blog/${payload.id}`, payload.data);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteBlog = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/blog/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
