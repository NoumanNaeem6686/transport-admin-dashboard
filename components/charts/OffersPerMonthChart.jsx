"use client"

import React from 'react';
import {
    BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const OffersPerMonthChart = ({ data }) => {
    const months = [
        '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const chartData = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        const monthData = data.find((item) => item._id === monthNumber);
        return {
            month: months[monthNumber],
            offers: monthData ? monthData.count : 0,
        };
    });

    return (
        <div style={{ height: 300 }} className='p-4 bg-slate-100 w-11/12 mx-auto my-8 rounded-2xl'>
            <h2 className='text-center text-4xl font-bold mb-9'>Offers Created Over the Past Year</h2>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="offers" fill="#82ca9d" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OffersPerMonthChart;
