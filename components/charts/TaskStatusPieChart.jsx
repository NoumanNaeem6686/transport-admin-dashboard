"use client"

import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const TaskStatusPieChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const chartData = data.map((item) => ({
        name: item._id.replace('_', ' ').toUpperCase(),
        value: item.count,
    }));

    return (
        <div style={{ height: 300 }} className='p-4 bg-slate-100 w-11/12 mx-auto my-8 rounded-2xl'>
            <h2 className='text-center text-4xl font-bold mb-9'>Task Status Distribution</h2>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TaskStatusPieChart;
