"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Plugin,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Register Chart.js components
ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

let _stroke: null | (() => void) = null;
const simplePlugin: Plugin<"line"> = {
    id: "piaf",
    beforeDatasetsDraw: function (chart) {
        if (!_stroke) _stroke = chart.ctx.stroke;
        chart.ctx.stroke = function () {
            if (!chart.ctx) return;
            chart.ctx.save();
            chart.ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
            chart.ctx.shadowBlur = 10;
            chart.ctx.shadowOffsetX = 0;
            chart.ctx.shadowOffsetY = 10;
            _stroke!.apply(this, arguments as any);
            chart.ctx.restore();
        };
    },
};

const MixedChart: React.FC = () => {
    const { theme } = useTheme(); // Access the current theme

    const isDarkMode = theme === "dark";
    const textColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)";
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                type: "bar",
                label: "Earnings",
                data: [3000, 4000, 2000, 8000, 7000, 9000, 5000, 6000, 3000, 7000, 8000, 6000],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                borderRadius: 5,
            },
            {
                type: "line",
                label: "Performance",
                data: [5000, 6000, 3000, 9000, 10000, 9000, 4000, 8000, 6000, 9000, 10000, 7000],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                beginAtZero: true,
                ticks: {
                    stepSize: 2000,
                    color: textColor,
                },
                grid: {
                    color: gridColor,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                mode: "nearest",
                intersect: false,
            },
        },
    };

    return (
        <div className="p-6 bg-white dark:bg-[#18181b] rounded-xl w-full lg:w-[70%] shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">Monthly Earning Performance</h2>
            <div className="h-64">
                {/* @ts-ignore */}
                <Line data={data} options={options} plugins={[simplePlugin]} />
            </div>
        </div>
    );
};

export default MixedChart;
