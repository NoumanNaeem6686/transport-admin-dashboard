"use client";
import React from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IUser } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import UserModal from "./user-modal";
import { createUser, inviteUser } from "@/actions/user.action";
import { toast } from "sonner";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";

export const Accounts = ({ data, meta }: { data: IUser[]; meta: IMeta; }) => {
  const { updateSearchParams } = useUpdateSearchParams();
  const { isAdmin } = useCheckAdmin()
  const columns = [
    { name: "Email", uid: "email" },
    { name: "Full Name", uid: "full_name" },
    { name: "Joining Date", uid: "createdAt" },
    { name: "Type", uid: "type" },
    // { name: "Signature", uid: "signature" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleAddUser = async (_: string, data: IUser) => {
    toast.promise(
      createUser(data).then((result) => {
        if (result.error) {
          toast.success(result.error)
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Creating user...",
        success: "User created successfully!",
        error: "Error creating user.",
      }
    );
  };
  const handleInviteUser = async (_: string, data: any) => {
    console.log("🚀 ~ handleInviteUser ~ data:", data)
    toast.promise(
      inviteUser(data).then((result) => {
        if (result.error) {
          toast.success(result.error)
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Inviting Member...",
        success: "Invite Send successfully!",
        error: "Error sending invite.",
      }
    );
  };
  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-xl regular-fontss font-semibold">Team Members</h3>
        </div>
        {
          isAdmin &&
          <div className="flex flex-row gap-3.5 flex-wrap">
            <UserModal mode="Invite" onConfirm={handleInviteUser} />
            <UserModal mode="Add" onConfirm={handleAddUser} />
          </div>
        }
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          meta={meta}
          isAdmin={isAdmin}
          RenderCell={RenderCell}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};
