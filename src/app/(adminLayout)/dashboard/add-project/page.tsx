"use client";

import React from "react";
import { Form } from "@nextui-org/form";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAddProject, useGetAllProject } from "@/src/hooks/project";
import { IProject } from "@/src/types";

export default function AddProject() {
  const router = useRouter();
  const { mutate } = useAddProject();
  const { refetch } = useGetAllProject();
  const { handleSubmit, register, reset } = useForm<IProject>();

  const handleLogin = (values: IProject) => {
    const { image, ...restData } = values;
    const formData = new FormData();
    if (image) {
      formData.append("file", image[0]);
    }
    formData.append("data", JSON.stringify(restData));
    mutate(formData, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          reset();
          toast.success(data?.message);
          router.push("/projects");
        } else {
          toast.error(data?.message);
        }
      },
    });
  };
  return (
    <div className="h-full w-full">
      <Form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full p-10 rounded-md flex flex-col gap-4"
        validationBehavior="native"
      >
        <div className="sm:flex items-center w-full gap-5">
          <Input
            variant="bordered"
            radius="sm"
            {...register("title", { required: true })}
            isRequired
            errorMessage="Please enter Title"
            label="Title"
            labelPlacement="outside"
            name="title"
            placeholder="Enter Title"
            type="text"
          />
          <Input
            variant="bordered"
            radius="sm"
            {...register("type", { required: true })}
            isRequired
            errorMessage="Please enter type"
            label="Type"
            labelPlacement="outside"
            name="type"
            placeholder="Enter Type"
            type="text"
          />
        </div>
        <div className="sm:flex items-center w-full gap-5">
          <Input
            variant="bordered"
            radius="sm"
            {...register("frontendGithubLink", { required: true })}
            isRequired
            errorMessage="Please enter Frontend Github Link"
            label="Frontend Github Link"
            labelPlacement="outside"
            name="frontendGithubLink"
            placeholder="Please enter Frontend Github Link"
            type="text"
          />
          <Input
            variant="bordered"
            radius="sm"
            {...register("frontendLiveLink", { required: true })}
            isRequired
            errorMessage="Please enter Frontend Live Link"
            label="Frontend Live Link"
            labelPlacement="outside"
            name="frontendLiveLink"
            placeholder="Frontend Live Link"
            type="text"
          />
        </div>
        <div className="sm:flex items-center w-full gap-5">
          <Input
            variant="bordered"
            radius="sm"
            {...register("backendGithubLink", { required: true })}
            isRequired
            errorMessage="Please enter Backend Github Link"
            label="Backend Github Link"
            labelPlacement="outside"
            name="backendGithubLink"
            placeholder="Please enter Backend Github Link"
            type="text"
          />
          <Input
            variant="bordered"
            radius="sm"
            {...register("backendLiveLink", { required: true })}
            isRequired
            errorMessage="Please enter Backend Live Link"
            label="Backend Live Link"
            labelPlacement="outside"
            name="backendLiveLink"
            placeholder="Enter Backend Live Link"
            type="text"
          />
        </div>
        <div className="sm:flex items-center w-full gap-5">
          <Input
            variant="bordered"
            radius="sm"
            {...register("technologies", { required: true })}
            isRequired
            errorMessage="Please enter Technologies"
            label="Technologies"
            labelPlacement="outside"
            name="technologies"
            placeholder="Please enter Technologies"
            type="text"
          />
          <Input
            variant="bordered"
            radius="sm"
            {...register("image", { required: true })}
            isRequired
            errorMessage="Please enter image"
            label="Image"
            labelPlacement="outside"
            name="image"
            placeholder="Enter Image"
            type="file"
          />
        </div>
        <Textarea
          variant="bordered"
          radius="sm"
          {...register("overview", { required: true })}
          isRequired
          errorMessage="Please enter overview"
          label="Overview"
          labelPlacement="outside"
          name="overview"
          placeholder="Enter Overview"
          type="textarea"
        />
        <Textarea
          variant="bordered"
          radius="sm"
          {...register("details", { required: true })}
          isRequired
          errorMessage="Please enter details"
          label="Details"
          labelPlacement="outside"
          name="details"
          placeholder="Enter Details"
          type="textarea"
        />

        <div className="flex gap-2">
          <Button
            className="text-sm md:text-base"
            radius="sm"
            type="reset"
            variant="flat"
            color="secondary"
          >
            Reset
          </Button>
          <Button
            className="text-sm md:text-base"
            radius="sm"
            color="primary"
            type="submit"
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
