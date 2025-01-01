import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addExperience,
  deleteExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
} from "../services/Experience";
import { IResponse, IExperience } from "../types";

export const useAddExperience = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["add-experience"],
    mutationFn: async (payload) => await addExperience(payload),
  });
};

export const useGetAllExperience = () => {
  return useQuery<any, Error, IResponse<IExperience[]>>({
    queryKey: ["experiences"],
    queryFn: async () => await getAllExperience(),
  });
};
export const useGetSingleExperience = (id: string) => {
  return useQuery<any, Error, IResponse<IExperience>>({
    queryKey: ["experience", id],
    queryFn: async () => await getSingleExperience(id),
    gcTime: 0,
  });
};

export const useUpdateExperience = () => {
  return useMutation<any, Error, { data: FormData; id: string }>({
    mutationKey: ["add-experience"],
    mutationFn: async (payload) => await updateExperience(payload),
  });
};
export const useDeleteExperience = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-experience"],
    mutationFn: async (id) => await deleteExperience(id),
  });
};
