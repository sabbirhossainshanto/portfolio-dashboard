"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { DeleteIcon } from "@/src/components/icons";
import { IProject } from "@/src/types";
import { toast } from "sonner";
import { useDeleteProject, useGetAllProject } from "@/src/hooks/project";
import Link from "next/link";
import UpdateProject from "@/src/components/modal/UpdateProject";

export const columns = [
  { name: "Image", uid: "image" },
  { name: "Title", uid: "title" },
  { name: "Type", uid: "type" },
  { name: "Github Link", uid: "frontendGithubLink" },
  { name: "Live Link", uid: "frontendLiveLink" },
  { name: "ACTIONS", uid: "actions" },
];

export default function Projects() {
  const { data, refetch } = useGetAllProject();
  const { mutate: deleteProject } = useDeleteProject();
  const projectData =
    data?.data?.map((project) => ({
      image: project.image,
      title: project.title,
      _id: project?._id,
      frontendGithubLink: project?.frontendGithubLink,
      frontendLiveLink: project?.frontendLiveLink,
      type: project?.type,
    })) || [];

  const handleDelete = (_id: string) => {
    deleteProject(_id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };
  const renderCell = React.useCallback(
    (project: Partial<IProject>, columnKey: string) => {
      const cellValue = project[columnKey as keyof IProject];

      switch (columnKey) {
        case "image":
          return (
            <User avatarProps={{ radius: "lg", src: project.image }} name="" />
          );
        case "frontendGithubLink":
          return (
            <Link
              target="_blank"
              className="underline"
              href={project?.frontendGithubLink!}
            >
              Github Link
            </Link>
          );
        case "frontendLiveLink":
          return (
            <Link
              target="_blank"
              className="underline"
              href={project?.frontendLiveLink!}
            >
              Live Link
            </Link>
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Tooltip content="Edit skill">
                <UpdateProject id={project?._id as string} />
              </Tooltip>
              <Tooltip color="danger" content="Delete skill">
                <Button
                  onPress={() => handleDelete(project._id as string)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="p-3">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={projectData}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IProject)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
