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
import { toast } from "sonner";

import {
  useDeleteExperience,
  useGetAllExperience,
} from "@/src/hooks/experience";
import UpdateExperience from "@/src/components/modal/UpdateExperience";
import moment from "moment";
import AddExperience from "@/src/components/modal/AddExperience";
import { IExperience } from "@/src/types";

const columns = [
  { name: "Company Photo", uid: "companyPhoto" },
  { name: "Company Name", uid: "companyName" },
  { name: "Join Date", uid: "joinDate" },
  { name: "Resign Date", uid: "resignDate" },
  { name: "Location", uid: "location" },
  { name: "ACTIONS", uid: "actions" },
];

export default function Experience() {
  const { data, refetch } = useGetAllExperience();
  const { mutate: deleteExperience } = useDeleteExperience();
  const skillData =
    data?.data?.map((experience) => ({
      companyPhoto: experience.companyPhoto,
      companyName: experience.companyName,
      joinDate: moment(experience.joinDate).format("MMMM Do YYYY"),
      resignDate: moment(experience.resignDate).format("MMMM Do YYYY"),
      location: experience.location,
      _id: experience?._id,
    })) || [];

  const handleDelete = (_id: string) => {
    deleteExperience(_id, {
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
    (experience: Partial<IExperience>, columnKey: string) => {
      const cellValue = experience[columnKey as keyof IExperience];

      switch (columnKey) {
        case "companyPhoto":
          return (
            <User
              avatarProps={{ radius: "lg", src: experience.companyPhoto }}
              name=""
            />
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Tooltip content="Edit skill">
                <UpdateExperience id={experience?._id as string} />
              </Tooltip>
              <Tooltip color="danger" content="Delete skill">
                <Button
                  radius="sm"
                  onPress={() => handleDelete(experience._id as string)}
                  className="text-sm md:text-base text-danger cursor-pointer bg-primary"
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
        <AddExperience />
      </div>
      <Table radius="none" aria-label="Example table with custom cells">
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
                <TableCell className="text-sm md:text-base">
                  {renderCell(item, columnKey as keyof IExperience)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
