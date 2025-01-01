"use client";

import { IExperience } from "@/src/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DateValue,
  DateInput,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TbFidgetSpinner } from "react-icons/tb";
import { EditIcon } from "../icons";
import { useEffect, useState } from "react";
import {
  useGetAllExperience,
  useGetSingleExperience,
  useUpdateExperience,
} from "@/src/hooks/experience";

export default function UpdateExperience({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [joinDate, setJoinDate] = useState<DateValue | null>(null);
  const [resignDate, setResignDate] = useState<DateValue | null>(null);

  const { handleSubmit, register, reset } = useForm<IExperience>();
  const {
    mutate: updateExperience,
    isPending,
    isSuccess,
  } = useUpdateExperience();
  const { data } = useGetSingleExperience(id);
  const { refetch } = useGetAllExperience();

  const onSubmit = (values: IExperience) => {
    const { companyPhoto, ...restData } = values;
    const postData = {
      ...restData,
      joinDate: joinDate
        ? new Date(
            joinDate.year,
            joinDate.month - 1,
            joinDate.day
          ).toISOString()
        : undefined,
      resignDate: resignDate
        ? new Date(
            resignDate.year,
            resignDate.month - 1,
            resignDate.day
          ).toISOString()
        : undefined,
    };

    const formData = new FormData();
    if (companyPhoto) {
      formData.append("file", companyPhoto[0]);
    }
    formData.append("data", JSON.stringify(postData));
    const payload = {
      data: formData,
      id,
    };
    updateExperience(payload, {
      onSuccess(data) {
        toast.success(data?.message);
        if (data?.success) {
          refetch();
          reset();
          onClose();
        }
      },
    });
  };

  useEffect(() => {
    reset({
      companyName: data?.data?.companyName,
      companyPhoto: data?.data?.companyPhoto,
      joinDate: data?.data?.joinDate,
      resignDate: data?.data?.resignDate,
      location: data?.data?.location,
      role: data?.data?.role,
      responsibilities: data?.data?.responsibilities,
      technologiesUsed: data?.data?.technologiesUsed,
    });
  }, [data]);

  return (
    <>
      <Button
        radius="sm"
        className="text-sm md:text-base cursor-pointer bg-primary"
        onPress={onOpen}
      >
        <EditIcon />
      </Button>
      <Modal
        radius="sm"
        className="z-[1202]"
        size="3xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Update Experience
              </ModalHeader>
              <ModalBody>
                <div className="sm:flex items-center w-full gap-5">
                  <Input
                    variant="bordered"
                    radius="sm"
                    {...register("companyName", { required: true })}
                    isRequired
                    errorMessage="Please enter Company Name"
                    label="Company Name"
                    labelPlacement="outside"
                    name="companyName"
                    placeholder="Enter Company Name"
                    type="text"
                  />
                  <Input
                    variant="bordered"
                    radius="sm"
                    {...register("role", { required: true })}
                    isRequired
                    errorMessage="Please Enter Role"
                    label="Role"
                    labelPlacement="outside"
                    name="role"
                    placeholder="Enter Rolee"
                    type="text"
                  />
                </div>
                <div className="sm:flex items-center w-full gap-5">
                  <Input
                    variant="bordered"
                    radius="sm"
                    {...register("location", { required: true })}
                    isRequired
                    errorMessage="Please enter Location"
                    label="Location"
                    labelPlacement="outside"
                    name="location"
                    placeholder="Please Enter Location"
                    type="text"
                  />
                  <Input
                    variant="bordered"
                    radius="sm"
                    {...register("responsibilities", { required: true })}
                    isRequired
                    errorMessage="Please Enter Responsibilities"
                    label="Responsibilities"
                    labelPlacement="outside"
                    name="responsibilities"
                    placeholder="Enter Responsibilities"
                    type="text"
                  />
                </div>
                <div className="sm:flex items-center w-full gap-5">
                  <DateInput
                    variant="bordered"
                    radius="sm"
                    label="Join Date"
                    labelPlacement="outside"
                    onChange={(date) => setJoinDate(date)}
                    value={joinDate}
                  />
                  <DateInput
                    variant="bordered"
                    radius="sm"
                    label="Resign Date"
                    labelPlacement="outside"
                    onChange={(date) => setResignDate(date)}
                    value={resignDate}
                  />
                </div>
                <div className="sm:flex items-center w-full gap-5">
                  <Input
                    variant="bordered"
                    radius="sm"
                    {...register("technologiesUsed", { required: true })}
                    isRequired
                    errorMessage="Please Enter Technologies Used"
                    label="Technologies"
                    labelPlacement="outside"
                    name="technologiesUsed"
                    placeholder="Please Enter Technologies Used"
                    type="text"
                  />
                  <Input
                    variant="bordered"
                    radius="sm"
                    {...register("companyPhoto")}
                    errorMessage="Please Enter Company Photo"
                    label="Company Photo"
                    labelPlacement="outside"
                    name="companyPhoto"
                    placeholder="Enter Company Photo"
                    type="file"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="sm"
                  className="text-sm md:text-base"
                  type="button"
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  radius="sm"
                  className="text-sm md:text-base"
                  type="submit"
                  color="primary"
                >
                  {isPending && !isSuccess ? (
                    <span className="flex items-center gap-2 justify-center text-base">
                      <span>Please Wait</span>{" "}
                      <TbFidgetSpinner className="animate-spin" />
                    </span>
                  ) : (
                    <span>Continue</span>
                  )}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
