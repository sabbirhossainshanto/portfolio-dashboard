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
import { useDeleteSkill, useGetAllSkill } from "@/src/hooks/skill";
import { ISkill } from "@/src/types";
import AddSkill from "@/src/components/modal/AddSkill";
import { toast } from "sonner";
import UpdateSkill from "@/src/components/modal/UpdateSkill";

export const columns = [
  { name: "Image", uid: "image" },
  { name: "Title", uid: "title" },
  { name: "ACTIONS", uid: "actions" },
];

export default function Skills() {
  const { data, refetch } = useGetAllSkill();
  const { mutate: deleteSkill } = useDeleteSkill();
  const skillData =
    data?.data?.map((skill) => ({
      image: skill.image,
      title: skill.title,
      _id: skill?._id,
    })) || [];

  const handleDelete = (_id: string) => {
    deleteSkill(_id, {
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
    (skill: Partial<ISkill>, columnKey: string) => {
      const cellValue = skill[columnKey as keyof ISkill];

      switch (columnKey) {
        case "image":
          return (
            <User avatarProps={{ radius: "lg", src: skill.image }} name="" />
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Tooltip content="Edit skill">
                <UpdateSkill id={skill?._id as string} />
              </Tooltip>
              <Tooltip color="danger" content="Delete skill">
                <Button
                  onPress={() => handleDelete(skill._id as string)}
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
      <div className="flex items-center justify-end pb-4">
        <AddSkill />
      </div>
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
        <TableBody items={skillData}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof ISkill)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
