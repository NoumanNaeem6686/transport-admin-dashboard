"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Plugin,
    ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TaskStatistic {
    label?: string;
    tasksCreated?: number;
    tasksCompleted?: number;
}

const shadowPlugin: Plugin<"line"> = {
    id: "coloredShadows",
    beforeDatasetDraw: function (chart, args) {
        const { ctx } = chart;
        const datasetIndex = args.index;
        const dataset = chart.data.datasets[datasetIndex];

        const lineColor = dataset.borderColor as string;
        if (lineColor === "rgba(255, 99, 132, 1)") {
            ctx.shadowColor = "rgba(255, 99, 132, 0.5)";
        } else if (lineColor === "rgba(54, 162, 235, 1)") {
            ctx.shadowColor = "rgba(54, 162, 235, 0.5)";
        }

        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;
        ctx.save();
    },
    afterDatasetDraw: function (chart) {
        const { ctx } = chart;
        ctx.restore();
    },
};

const TaskChart: React.FC = () => {
    const { theme } = useTheme(); // Get theme information
    const [view, setView] = useState<"day" | "week" | "month">("month");
    const [taskStatistics, setTaskStatistics] = useState<TaskStatistic[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTaskStatistics = async () => {
            setLoading(true);
            // setError(null);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stats/task-statistics`, {
                    params: { view }
                });
                setTaskStatistics(response.data.taskStatistics);
            } catch (err) {
                console.error('Error fetching task statistics:', err);
                // setError('Failed to load data.');
                setTaskStatistics(
                    [
                        {
                            label: "day",
                            tasksCreated: 0,
                            tasksCompleted: 0,
                        }
                    ])
            } finally {
                setLoading(false);
            }
        };

        fetchTaskStatistics();
    }, [view]);

    // Dynamically adjust colors based on the theme
    const textColor = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)";
    const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    const chartData = {
        labels: taskStatistics.map(item => item.label),
        datasets: [
            {
                label: "Tasks Created",
                data: taskStatistics.map(item => item.tasksCreated),
                borderColor: "rgba(255, 99, 132, 1)", // Red line
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
            {
                label: "Tasks Completed",
                data: taskStatistics.map(item => item.tasksCompleted),
                borderColor: "rgba(54, 162, 235, 1)", // Blue line
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: textColor,
                },
            },
            y: {
                grid: {
                    color: gridColor,
                },
                ticks: {
                    color: textColor,
                },
                beginAtZero: true,
            },
        },
    };

    const handleToggle = (selectedView: "day" | "week" | "month") => {
        setView(selectedView);
    };

    return (
        <div className="p-6 bg-white rounded-xl w-full lg:w-[70%] shadow dark:bg-[#18181b]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                    Task Created Vs Task Completed
                </h2>
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-base">Sort By</span>
                    <div className="relative">
                        <select
                            className="border p-2 rounded-lg"
                            value={view}
                            onChange={(e) => handleToggle(e.target.value as "day" | "week" | "month")}
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : (
                <div className="h-64">
                    <Line data={chartData} options={options} plugins={[shadowPlugin]} />
                </div>
            )}
        </div>
    );
};

export default TaskChart;
