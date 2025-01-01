import {
  useGetAllSkill,
  useGetSingleSkill,
  useUpdateSkill,
} from "@/src/hooks/skill";
import { ISkill } from "@/src/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TbFidgetSpinner } from "react-icons/tb";
import { EditIcon } from "../icons";
import { useEffect } from "react";

export default function UpdateSkill({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<ISkill>();
  const { mutate: updateSkill, isPending, isSuccess } = useUpdateSkill();
  const { data } = useGetSingleSkill(id);
  const { refetch } = useGetAllSkill();

  const onSubmit = (values: ISkill) => {
    const formData = new FormData();
    if (values?.image) {
      formData.append("file", values?.image[0]);
    }
    formData.append("data", JSON.stringify({ title: values?.title }));
    const payload = {
      data: formData,
      id,
    };
    updateSkill(payload, {
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
    });
  }, [data]);

  return (
    <>
      <Button
        size="md"
        radius="sm"
        className="text-sm md:text-base cursor-pointer bg-primary text-white"
        onPress={onOpen}
      >
        Edit <EditIcon />
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Update Skill
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register("title", { required: true })}
                  label="Title"
                  placeholder="Enter skill title"
                  variant="bordered"
                />
                <Input
                  {...register("image")}
                  label="Image"
                  type="file"
                  variant="bordered"
                />
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
