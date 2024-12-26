import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProject,
  deleteProject,
  getAllProject,
  getSingleProject,
  updateProject,
} from "../services/Project";
import { IResponse, IProject } from "../types";

export const useAddProject = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["add-Project"],
    mutationFn: async (payload) => await addProject(payload),
  });
};

export const useGetAllProject = () => {
  return useQuery<any, Error, IResponse<IProject[]>>({
    queryKey: ["Projects"],
    queryFn: async () => await getAllProject(),
  });
};
export const useGetSingleProject = (id: string) => {
  return useQuery<any, Error, IResponse<IProject>>({
    queryKey: ["Project", id],
    queryFn: async () => await getSingleProject(id),
    gcTime: 0,
  });
};

export const useUpdateProject = () => {
  return useMutation<any, Error, { data: FormData; id: string }>({
    mutationKey: ["add-Project"],
    mutationFn: async (payload) => await updateProject(payload),
  });
};
export const useDeleteProject = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-Project"],
    mutationFn: async (id) => await deleteProject(id),
  });
};
