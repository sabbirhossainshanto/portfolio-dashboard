import { useMutation, useQuery } from "@tanstack/react-query";
import { IResponse, IBlog } from "../types";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
} from "../services/Blog";

export const useCreateBlog = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["add-blog"],
    mutationFn: async (payload) => await createBlog(payload),
  });
};

export const useGetAllBlog = () => {
  return useQuery<any, Error, IResponse<IBlog[]>>({
    queryKey: ["blogs"],
    queryFn: async () => await getAllBlog(),
  });
};
export const useGetSingleBlog = (id: string) => {
  return useQuery<any, Error, IResponse<IBlog>>({
    queryKey: ["blog", id],
    queryFn: async () => await getSingleBlog(id),
    gcTime: 0,
  });
};

export const useUpdateBlog = () => {
  return useMutation<any, Error, { data: FormData; id: string }>({
    mutationKey: ["update-blog"],
    mutationFn: async (payload) => await updateBlog(payload),
  });
};
export const useDeleteBlog = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-blog"],
    mutationFn: async (id) => await deleteBlog(id),
  });
};
