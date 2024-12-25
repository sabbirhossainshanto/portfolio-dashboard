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
} from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@/src/components/icons";
import { useGetAllSkill } from "@/src/hooks/skill";
import { ISkill } from "@/src/types";
import AddSkill from "@/src/components/modal/AddSkill";

export const columns = [
  { name: "Image", uid: "image" },
  { name: "Title", uid: "title" },
  { name: "ACTIONS", uid: "actions" },
];

export default function Skills() {
  const { data } = useGetAllSkill();
  const skillData =
    data?.data?.map((skill) => ({
      image: skill.image,
      title: skill.title,
      _id: skill?._id,
    })) || [];
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
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
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
              align={column.uid === "actions" ? "center" : "start"}
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
