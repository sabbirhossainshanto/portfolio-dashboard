"use client";

import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Delete, Edit } from "lucide-react";
import { useDeleteBlog, useGetAllBlog } from "@/src/hooks/blog";
import { toast } from "sonner";

export default function BlogPage() {
  const { data, refetch } = useGetAllBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          toast.success(data?.success);
        } else {
          toast.error(data?.success);
        }
      },
    });
  };

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-10">
      {data?.data &&
        data?.data?.map((blog) => {
          return (
            <Card
              key={blog?._id}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50"
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 ">
                  <div>
                    <Image
                      alt="Album cover"
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={blog?.imageUrl}
                      width="100%"
                    />
                  </div>

                  <div className="flex justify-between items-start h-full">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-foreground/90">
                        {blog?.title}
                      </h3>
                      <p className="text-small text-foreground/80">
                        {blog?.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-between h-full">
                      <Button
                        isIconOnly
                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                        radius="full"
                        variant="light"
                      >
                        <Edit />
                      </Button>
                      <Button
                        onPress={() => handleDeleteBlog(blog?._id)}
                        isIconOnly
                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                        radius="full"
                        variant="light"
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}
