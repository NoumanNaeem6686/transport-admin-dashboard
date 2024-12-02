import { Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { deleteUser } from "@/actions/user.action";
import { toast } from "sonner";

interface Props {
  item: any;
  isAdmin?: boolean

  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
  const cellValue = item[columnKey as keyof any];
  console.log("🚀 ~ RenderCell ~ cellValue:", cellValue)

  const handleDeleteUser = async () => {
    toast.promise(
      deleteUser(item._id).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Deleting admin...",
        success: "Admin deleted successfully!",
        error: "Error deleting admin.",
      }
    );
  };
  switch (columnKey) {
    case "email":
      return <div className="">{cellValue}</div>;

    case "name":
      return <div className="capitalize">{cellValue}</div>;
    case "workBasis":
      return <div className="capitalize">{cellValue.split("_").join(" ")}</div>;



    case "isDivingLicense":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === true
              ? "success"

              : "warning"
          }
        >
          <span className="text-xs">{cellValue == true ? "YES" : "NO"}</span>
        </Chip>
      );
    case "services":
      return (

        <>
          <Chip
            size="sm"
            variant="flat"
            color={
              cellValue === true
                ? "success"

                : "warning"
            }
          >
            <span className="text-xs">{cellValue}</span>
          </Chip>

        </>
      );

    case "actions":
      return (
        <>
        </>
        // <div className="flex items-center gap-4">

        //   <div>
        //     <Tooltip content="Details">
        //       <UserModal
        //         button={<EyeIcon size={20} fill="#979797" />}
        //         mode="View"
        //         data={item}
        //       />
        //     </Tooltip>
        //   </div>

        //   <>

        //     <div>
        //       <Tooltip content="Delete user" color="danger">
        //         <UserModal
        //           button={<DeleteIcon size={20} fill="#FF0080" />}
        //           mode="Delete"
        //           data={item}
        //           onConfirm={handleDeleteUser}
        //         />
        //       </Tooltip>
        //     </div>

        //   </>
        // </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
