import { Avatar, Tooltip } from "@nextui-org/react";
import React from "react";

// Example JSON data for the cards with one avatar image
const cardData = [
    {
        title: "Master Dashboard",
        progress: "46%",
        due: "in 3 days",
        avatar: "/avatar_stack.png", // Single image for avatars
    },
    {
        title: "Skill Checklist",
        progress: "46%",
        due: "in 5 days",
        avatar: "/avatar_stack.png", // Single image for avatars
    },
    {
        title: "Personal UI Project",
        progress: "46%",
        due: "in 6 days",
        avatar: "/avatar_stack.png",
    },
    {
        title: "Master UI Project",
        progress: "26%",
        due: "in 5 days",
        avatar: "/avatar_stack.png",
    },
];
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
const ProjectCard = ({ upcomingTasksData }: any) => {
    console.log("🚀 ~ ProjectCard ~ upcomingTasksData:", upcomingTasksData)
    return (
        <div className="space-y-4 w-full lg:w-[30%]">
            {upcomingTasksData.map((card: any, index: any) => (
                <div
                    key={index}
                    className="bg-white p-2 rounded-xl shadow hover:scale-105 transition-all cursor-pointer  flex items-center justify-between w-full dark:bg-[#18181b]"
                >
                    <div className="flex gap-x-1 -mt-2 relative ml-5">
                        {card.userIds.map((user: any, index: number) => (
                            <Tooltip key={user._id} content={user.full_name} className="cursor-pointer">
                                <Avatar
                                    name={user.full_name.toUpperCase()}
                                    size="sm"
                                    className={`text-white ${colors[index % colors.length]} avatar-stacked`}
                                    style={{ zIndex: card.userIds.length + index }}
                                />
                            </Tooltip>
                        ))}
                    </div>


                    {/* <div className="h-[45px] w-[2px] bg-green-500 mx-3"></div> */}
                    <div className="flex flex-col pr-1">
                        <div className="text-sm capitalize font-medium text-gray-600 dark:text-gray-300 mb-2">
                            {card.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-600 flex items-center gap-x-6">
                            {/* <span>{card.progress}</span> */}
                            Due Date {new Date(card.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}

                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ProjectCard;
