import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IUser } from "@/helpers/types";
import Link from "next/link";
import UserModal from "./user-modal";
import { deleteUser, editUser } from "@/actions/user.action";
import { toast } from "sonner";
import { History } from "lucide-react";

interface Props {
  item: any;
  isAdmin?: boolean

  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
  const cellValue = item[columnKey as keyof any];
  const handleEditUser = async (_: string, data: any) => {
    toast.promise(
      editUser(item._id, data).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Editing user...",
        success: "User edited successfully!",
        error: "Error editing user.",
      }
    );
  };

  const handleDeleteUser = async () => {
    toast.promise(
      deleteUser(item._id).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Deleting user...",
        success: "User deleted successfully!",
        error: "Error deleting user.",
      }
    );
  };
  switch (columnKey) {
    case "email":
      return <div className="">{cellValue}</div>;

    case "full_name":
      return <div className="">{cellValue}</div>;
    case "createdAt":
      return <div className="">  {new Date(cellValue).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}</div>;

    case "type":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "admin"
              ? "success"
              : cellValue === "user"
                ? "primary"
                : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          {
            isAdmin &&
            <div>
              <Tooltip content="Schedule">
                <Link href={`/dashboard/accounts/${item._id}`}>
                  <History size={20} className="text-[#979797]" />
                </Link>
              </Tooltip>
            </div>
          }
          <div>
            <Tooltip content="Details">
              <UserModal
                button={<EyeIcon size={20} fill="#979797" />}
                mode="View"
                data={item}
              />
            </Tooltip>
          </div>
          {
            isAdmin &&
            <>
              <div>
                <Tooltip content="Edit user" color="secondary">
                  <UserModal
                    button={<EditIcon size={20} fill="#1a740e" />}
                    mode="Edit"
                    data={item}
                    onConfirm={handleEditUser}
                  />
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Delete user" color="danger">
                  <UserModal
                    button={<DeleteIcon size={20} fill="#FF0080" />}
                    mode="Delete"
                    data={item}
                    onConfirm={handleDeleteUser}
                  />
                </Tooltip>
              </div>

            </>
          }
        </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
