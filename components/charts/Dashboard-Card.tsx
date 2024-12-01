import { MoveUpRight } from "lucide-react";
import React from "react";

const TaskSummaryCard = ({ taskSummaryData }: any) => {
    console.log("🚀 ~ TaskSummaryCard ~ taskSummaryData:", taskSummaryData);

    const data = [
        {
            title: "Tasks In Progress",
            current: taskSummaryData && taskSummaryData.tasksInProgress || 0,
            label: "Current Month",
            img: "/card_1.png",
            border: true
        },
        {
            title: "Tasks Completed",
            current: taskSummaryData && taskSummaryData.tasksCompleted || 0,
            label: "Current Month",
            img: "/card_2.png",
            border: true
        },
        {
            title: "Monthly Tasks Summary",
            current: taskSummaryData && taskSummaryData.monthlyTasksSummary || 0,
            label: "Current Month",
            img: "/card_3.png"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:py-6 mb-6 border-t-2 border-b-2 border-gray-100 gap-4 bg-white dark:bg-black dark:border-black ">
            {data.map((item, index) => (
                <div key={index} className={`w-full text-center flex gap-x-8 shadow p-2.5 hover:scale-105 transition-all cursor-pointer rounded-lg dark:bg-[#18181b]`}>
                    <div className="flex flex-col">
                        <div className="text-sm text-gray-500 font-semibold regular-font mb-2">
                            {item.title}
                        </div>
                        <div className="flex justify-center items-center space-x-2 mb-2 light-font">
                            <span className={`text-xl font-semibold ${index == 0 ? "text-orange-600" : index == 1 ? "text-purple-600" : "text-green-600"}`}>
                                {item.current}
                            </span>

                        </div>
                        <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                    <div className="mt-4 h-16 flex justify-center">
                        <img src={item.img} alt="Bar chart" className="w-32 h-full object-fill" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskSummaryCard;
