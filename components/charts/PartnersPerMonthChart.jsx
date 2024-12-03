"use client"


import React from 'react';
import {
    AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const PartnersPerMonthChart = ({ data }) => {
    const months = [
        '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const chartData = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        const monthData = data.find((item) => item._id === monthNumber);
        return {
            month: months[monthNumber],
            partners: monthData ? monthData.count : 0,
        };
    });

    return (
        <div style={{ width: '100%', height: 300 }}>
            <h2>Partners Registered Over the Past Year</h2>
            <ResponsiveContainer>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorPartners" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="partners" stroke="#8884d8" fillOpacity={1} fill="url(#colorPartners)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PartnersPerMonthChart;
