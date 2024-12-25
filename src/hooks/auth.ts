import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { loginUser, registerUser } from "../services/Auth";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_registration"],
    mutationFn: async (userData) => await registerUser(userData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_login"],
    mutationFn: async (userData) => await loginUser(userData),
  });
};
