"use client"
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TaskModal from './task-modal';
import { Avatar, Tooltip, Chip } from '@nextui-org/react';
import { createTask, deleteTask, updateTaskStatus } from '@/actions/task.action';
import { EditIcon } from '../icons/table/edit-icon';
import { DeleteIcon } from '../icons/table/delete-icon';
import { useRouter } from "next/navigation";
import { EyeIcon } from '../icons/table/eye-icon';
import { useCheckAdmin } from '../hooks/useCheckingAdmin';
import { Download } from 'lucide-react';
import saveAs from 'file-saver';
type TaskPriority = "medium" | "high" | "low" | "critical";
type TaskStatus = "assigned" | "in_progress" | "completed" | "on_hold" | "cancelled" | "review" | "approved";
interface Task {
    _id: string;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
    task: string;
    fileUrl?: any;
    userIds: { _id: string; full_name: string }[];
}
interface Props {
    UsersData?: any;
    data: any;
}

function Task({ UsersData, data }: Props) {
    const [allTasks, setAllTasks] = useState<Task[]>(data);
    const { isAdmin } = useCheckAdmin()
    const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500"
    ];

    const priorityColors = {
        medium: "warning",
        high: "danger",
        low: "success",
        critical: "danger",
    };

    const statusColors = {
        assigned: "primary",
        in_progress: "secondary",
        completed: "success",
        on_hold: "warning",
        cancelled: "danger",
        review: "secondary",
        approved: "success",
    };


    const router = useRouter()
    useEffect(() => {
        if (data) {
            setAllTasks(data);
        }
    }, [data]);
    const handleDeleteTask = async (item: any) => {
        toast.promise(
            deleteTask(item).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Deleting Task...",
                success: "Task deleted successfully!",
                error: "Error deleting Task.",
            }
        );
        router.refresh()
    };
    const handleEditUser = async (_: string, data: any) => {
        console.log("🚀 ~ handleEditUser ~ data:", data)
        toast.promise(
            updateTaskStatus(data._id, data.status).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Editing Task...",
                success: "Task edited successfully!",
                error: "Error editing Task.",
            }
        );
    };
    const borderColorClasses = {
        medium: "border-yellow-500",
        high: "border-red-500",
        low: "border-green-500",
        critical: "border-purple-500",
    };
    const handleAddTask = async (_: string, data: any) => {
        toast.promise(
            createTask(data).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Creating Task...",
                success: "Task created successfully!",
                error: "Error creating Task.",
            }
        );
    };
    const downloadFile = async (url: any) => {
        console.log("🚀 ~ downloadFile ~ url:", url)
        try {
            const response = await fetch(url[0].url);
            const blob = await response.blob();
            saveAs(blob, url[0].name);
        } catch (error) {
            console.error('Failed to download the file:', error);
        }
    };
    const formatStatus = (status: string) => {
        return status.includes('_') ? status.replace('_', ' ') : status;
    };

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <h3 className="text-xl regular-fontss font-semibold">
                        {
                            isAdmin ? "Task Management" : "My Task"
                        }
                    </h3>
                </div>
                {
                    isAdmin &&
                    <div className="flex flex-row gap-3.5 flex-wrap">
                        <TaskModal mode="Add" onConfirm={handleAddTask} usersData={UsersData} />
                    </div>
                }
            </div>
            <div className=" gap-4 my-8 flex items-start flex-wrap">
                {allTasks && allTasks.slice().reverse().map((task: Task) => (
                    <div key={task._id} className={`p-4 bg-white cursor-pointer min-w-[18rem] max-w-[18rem] dark:bg-[#18181b] rounded-xl border-1 ${borderColorClasses[task.priority]} flex flex-col gap-4`}>
                        <div className="flex justify-between items-center border-b pb-2">
                            {/* <Chip variant="flat" color={priorityColors[task.priority]} className="capitalize">
                                {task.priority}
                            </Chip> */}
                            <div className="flex justify-between items-center">
                                {/* @ts-ignore */}
                                <Chip variant="flat" color={statusColors[task.status]} className="capitalize">
                                    {formatStatus(task.status)}
                                </Chip>
                            </div>
                            <div className='flex items-center gap-2'>

                                <TaskModal
                                    button={<EyeIcon size={20} fill="#979797" />}
                                    mode="View" data={task}
                                />
                                <TaskModal
                                    button={<EditIcon size={20} fill="#1a740e" />}
                                    mode="Edit" onConfirm={handleEditUser} usersData={UsersData} data={task}
                                />
                                {
                                    isAdmin &&
                                    <button onClick={() => handleDeleteTask(task._id)}>
                                        <DeleteIcon size={20} fill="#FF0080" />
                                    </button>
                                }
                            </div>
                        </div>

                        <h5 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">
                            {task.title}
                        </h5>
                        <div className="flex gap-x-1 -mt-2 relative ml-5">
                            {task.userIds.map((user: any, index: number) => (
                                <Tooltip key={user._id} content={user.full_name} className="cursor-pointer">
                                    <Avatar
                                        name={user.full_name.toUpperCase()}
                                        size="sm"
                                        className={`text-white ${colors[index % colors.length]} avatar-stacked`}
                                        style={{ zIndex: task.userIds.length + index }}
                                    />
                                </Tooltip>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {task.task}
                        </p>
                        {
                            task.fileUrl.length > 0 &&
                            <div className="flex items-center justify-end w-full">
                                <div onClick={() => downloadFile(task.fileUrl)} className="capitalize  flex items-center hover:text-blue-500 hover:underline gap-x-1" style={{ cursor: 'pointer' }}>
                                    <Download /> {task.fileUrl[0].name}
                                </div>
                            </div>

                        }



                        {/* <div className="flex justify-between items-center mt-4">
                        <Chip variant="flat" color={statusColors[task.status]} className="capitalize">
                            {formatStatus(task.status)}
                        </Chip>
                    </div> */}
                    </div>
                ))}
            </div>


        </div >
    );
}

export default Task;
