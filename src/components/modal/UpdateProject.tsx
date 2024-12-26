import { IProject } from "@/src/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TbFidgetSpinner } from "react-icons/tb";
import { EditIcon } from "../icons";
import { useEffect } from "react";
import {
  useGetAllProject,
  useGetSingleProject,
  useUpdateProject,
} from "@/src/hooks/project";

export default function UpdateProject({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<IProject>();
  const { mutate: updateProject, isPending, isSuccess } = useUpdateProject();
  const { data } = useGetSingleProject(id);
  const { refetch } = useGetAllProject();

  const onSubmit = (values: IProject) => {
    const { image, ...restData } = values;
    const formData = new FormData();
    if (image) {
      formData.append("file", image[0]);
    }
    formData.append("data", JSON.stringify(restData));
    const payload = {
      data: formData,
      id,
    };
    updateProject(payload, {
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
      title: data?.data?.title,
      image: data?.data?.image,
      backendGithubLink: data?.data?.backendGithubLink,
      backendLiveLink: data?.data?.backendLiveLink,
      details: data?.data?.details,
      frontendGithubLink: data?.data?.frontendGithubLink,
      frontendLiveLink: data?.data?.frontendLiveLink,
      overview: data?.data?.overview,
      technologies: data?.data?.technologies,
      type: data?.data?.type,
    });
  }, [data]);

  return (
    <>
      <Button
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
        onPress={onOpen}
      >
        <EditIcon />
      </Button>
      <Modal
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
                Update Project
              </ModalHeader>
              <ModalBody>
                <div className="sm:flex items-center w-full gap-5">
                  <Input
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
                    {...register("image")}
                    errorMessage="Please enter image"
                    label="Backend Image"
                    labelPlacement="outside"
                    name="image"
                    placeholder="Enter Image"
                    type="file"
                  />
                </div>
                <Textarea
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
                  {...register("details", { required: true })}
                  isRequired
                  errorMessage="Please enter details"
                  label="Details"
                  labelPlacement="outside"
                  name="details"
                  placeholder="Enter Details"
                  type="textarea"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button type="submit" color="primary">
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
