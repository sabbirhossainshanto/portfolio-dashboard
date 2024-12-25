import { useAddSkill, useGetAllSkill } from "@/src/hooks/skill";
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

export default function AddSkill() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<ISkill>();
  const { mutate: addSkill, isPending, isSuccess } = useAddSkill();
  const { refetch } = useGetAllSkill();

  const onSubmit = (values: ISkill) => {
    const formData = new FormData();
    formData.append("file", values?.image[0]);
    formData.append("data", JSON.stringify({ title: values?.title }));
    addSkill(formData, {
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

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Skill
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Add Skill
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register("title", { required: true })}
                  label="Title"
                  placeholder="Enter skill title"
                  variant="bordered"
                />
                <Input
                  {...register("image", { required: true })}
                  label="Image"
                  type="file"
                  variant="bordered"
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
