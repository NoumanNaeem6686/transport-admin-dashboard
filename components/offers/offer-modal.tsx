import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IUser } from "@/helpers/types";
import { useRouter } from "next/navigation";
import { Plus, Send } from "lucide-react";

type UserModalProps = {
  mode?: string;
  data?: any;
  button?: React.ReactNode;
  onConfirm?: (mode: string, data: any) => Promise<void>; // Updated to async
};

const UserModal = ({
  mode = "Add",
  data,
  onConfirm,
  button,
}: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [InviteEmail, setInviteEmail] = useState("")
  const router = useRouter()
  // State to manage the user data
  const [editedUser, setEditedUser] = useState<IUser & { encryptedPassword?: string }>({
    email: "",
    _id: "",
    full_name: "",
    type: "admin",
    password: "",
    signature: "",
    ...data,
  });

  // Customize modal title and button text based on the mode
  const title = `${mode} Offer`;
  const isViewMode = mode === "View";
  const isDeleteMode = mode === "Delete";
  const isInviteMode = mode === "Invite";
  const buttonText = isDeleteMode
    ? "Confirm Delete"
    : isViewMode
      ? "Done"
      : mode;

  // Effect to set initial state when data changes
  useEffect(() => {
    if (data) {
      setEditedUser({
        ...data,
      });
    }
  }, [data]);

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle modal confirm action
  const handleConfirm = async () => {
    if (onConfirm) {

      if (isInviteMode) {
        await onConfirm(mode, InviteEmail)
        setInviteEmail("")
      } else {

        await onConfirm(mode, editedUser);
        setEditedUser({
          email: "",
          _id: "",
          full_name: "",
          type: "admin",
          password: "",
          signature: "",
        });
      }
      router.refresh()
    }
    onClose();
  };
  return (
    <div>
      {button ? (
        <button onClick={onOpen}>{button}</button>
      ) : (
        <Button onPress={onOpen} color={`${mode == "Invite" ? "secondary" : "primary"}`} className="flex items-center gap-x-1">
          {
            mode == "Add" ? <Plus className="h-5 w-5" /> : <Send className="h-5 w-5" />
          }
          {mode} Admin
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent className="max-h-[90vh] overflow-y-auto">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>
                Are you sure you want to delete{" "}
                <span className="underline">{editedUser.full_name}</span> with
                email <span className="underline">{editedUser.email}</span>?
              </p>
            )
              : isViewMode ?


                <>

                  <div className="space-y-2">
                    {data.userType && (
                      <p className="text-gray-700">
                        <span className="font-semibold">User Type:</span> {data.userType}
                      </p>
                    )}
                    {data.name && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Name:</span> {data.name}
                      </p>
                    )}
                    {data.email && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {data.email}
                      </p>
                    )}
                    {data.phone && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Phone:</span> {data.phone}
                      </p>
                    )}
                    {data.dateRange && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Date Range:</span> {data.dateRange}
                      </p>
                    )}
                    {data.timeRange && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Time Range:</span> {data.timeRange}
                      </p>
                    )}
                    {data.services && data.services.length > 0 && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Services:</span>{" "}
                        {data.services.join(", ")}
                      </p>
                    )}
                    {data.from && (
                      <p className="text-gray-700">
                        <span className="font-semibold">From:</span> {data.from}
                      </p>
                    )}
                    {data.to && (
                      <p className="text-gray-700">
                        <span className="font-semibold">To:</span> {data.to}
                      </p>
                    )}
                    {data.helpers !== undefined && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Helpers:</span> {data.helpers}
                      </p>
                    )}
                    {data.workers !== undefined && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Workers:</span> {data.workers}
                      </p>
                    )}
                    {data.spaceSize !== undefined && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Space Size:</span>{" "}
                        {data.spaceSize} sqm
                      </p>
                    )}
                    {data.specialRequirements && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Special Requirements:</span>{" "}
                        {data.specialRequirements}
                      </p>
                    )}
                    {data.frequency && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Frequency:</span> {data.frequency}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold">Created At:</span>{" "}
                      {new Date(data.createdAt).toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold">Updated At:</span>{" "}
                      {new Date(data.updatedAt).toLocaleString()}
                    </p>
                  </div>

                </>
                :
                isInviteMode ? (
                  <>
                    <Input
                      name="email"
                      label="Email"
                      value={InviteEmail}
                      onChange={(e: any) => setInviteEmail(e.target.value)}
                      variant="bordered"
                    />
                  </>
                )
                  :
                  (
                    <>
                      <Input
                        name="email"
                        label="Email"
                        value={editedUser.email}
                        onChange={handleChange}
                        variant="bordered"
                        disabled={isViewMode}
                      />
                      <Input
                        name="full_name"
                        label="Full Name"
                        value={editedUser.full_name}
                        onChange={handleChange}
                        variant="bordered"
                        disabled={isViewMode}
                      />


                      {!isViewMode && (
                        <Input
                          name="encryptedPassword"
                          label="Password"
                          type="password"
                          value={editedUser.encryptedPassword}
                          onChange={handleChange}
                          variant="bordered"
                        />
                      )}
                    </>
                  )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            {!isViewMode && (
              <Button color="primary" onPress={handleConfirm}>
                {buttonText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserModal;
