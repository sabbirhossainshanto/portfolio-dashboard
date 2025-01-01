"use client";

import Editor from "@/src/components/UI/Editor/Editor";
import { useCreateBlog } from "@/src/hooks/blog";
import { uploadToCloudinary } from "@/src/utils/uploadToCloudinary";
import {
  Button,
  Form,
  Image,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddBlog = () => {
  const router = useRouter();
  const { mutate: createBlogInToDB } = useCreateBlog();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setImage(e.target.files[0]);
      setImagePreview(image);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const postData: any = {
      ...data,
      content,
    };
    if (image) {
      const imageUrl = await uploadToCloudinary(image as File, "image");
      postData.imageUrl = imageUrl;
    }

    createBlogInToDB(postData, {
      onSuccess(data) {
        if (data?.success) {
          reset();
          setContent("");
          setLoading(false);
          setImagePreview("");
          toast.success(data?.message);
          router.push("/dashboard/blogs");
        }
      },
      onError() {
        setLoading(false);
      },
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="my-5">
      <div className="flex  items-center gap-10 mb-5 text-xl font-medium">
        <h1>Create a Blog</h1>
        {uploadingImage && (
          <p className="flex items-center gap-2 text-sm">
            <span> Uploading Image</span> <Spinner size="sm" />
          </p>
        )}
      </div>
      <Editor
        setUploadingImage={setUploadingImage}
        content={content}
        setContent={setContent}
      />
      <div className="mt-5 space-y-3 w-full">
        <Input
          variant="bordered"
          radius="sm"
          {...register("title", { required: true })}
          label="Title"
          name="title"
          type="text"
        />

        <Input
          variant="bordered"
          radius="sm"
          onChange={handleImageChange}
          name="imageUrl"
          type="file"
        />
        {imagePreview && (
          <div className="relative rounded-xl h-[200px] border-2 border-dashed border-default-300 p-2">
            <Image
              height={200}
              alt="item"
              className="h-full w-full object-cover object-center rounded-md"
              src={imagePreview}
            />
          </div>
        )}
        <Textarea
          variant="bordered"
          radius="sm"
          {...register("description")}
          label="Description"
          name="description"
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
            isLoading={loading}
            className="text-sm md:text-base"
            radius="sm"
            color="primary"
            type="submit"
          >
            Continue
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AddBlog;
