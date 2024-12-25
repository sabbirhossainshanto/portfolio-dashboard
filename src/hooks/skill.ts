import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addSkill,
  deleteSkill,
  getAllSkill,
  updateSkill,
} from "../services/Skill";
import { IResponse, ISkill } from "../types";

export const useAddSkill = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["add-skill"],
    mutationFn: async (payload) => await addSkill(payload),
  });
};

export const useGetAllSkill = () => {
  return useQuery<any, Error, IResponse<ISkill[]>>({
    queryKey: ["skills"],
    queryFn: async () => await getAllSkill(),
  });
};

export const useUpdateSkill = () => {
  return useMutation<any, Error, { data: FormData; id: string }>({
    mutationKey: ["add-skill"],
    mutationFn: async (payload) => await updateSkill(payload),
  });
};
export const useDeleteSkill = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-skill"],
    mutationFn: async (id) => await deleteSkill(id),
  });
};
