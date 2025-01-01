"use client";

import React from "react";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useUserLogin } from "@/src/hooks/auth";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const { mutate } = useUserLogin();
  const { handleSubmit, register } = useForm();

  const handleLogin: SubmitErrorHandler<FieldValues> = (values) => {
    mutate(values, {
      onSuccess(data) {
        toast.success(data?.message);
        if (data?.success) {
          setIsLoading(true);
          router.push("/dashboard");
        }
      },
    });
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="my-4 text-lg">Login</h1>
      <Form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md border border-gray-800 p-10 rounded-md flex flex-col gap-4"
        validationBehavior="native"
      >
        <Input
          {...register("email", { required: true })}
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          {...register("password", { required: true })}
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="text"
        />

        <div className="flex gap-2">
          <Button type="reset" variant="flat">
            Reset
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
