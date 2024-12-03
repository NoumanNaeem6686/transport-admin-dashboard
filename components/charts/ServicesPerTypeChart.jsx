"use client"

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const ServicesPerTypeChart = ({ data }) => {
    const months = [
        '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    // Prepare chart data
    const services = ['Transport', 'Helper', 'Cleaning'];
    const monthServiceData = {};

    data.forEach((item) => {
        const month = months[item._id.month];
        const serviceType = item._id.serviceType;
        if (!monthServiceData[month]) {
            monthServiceData[month] = { month };
            services.forEach((service) => {
                monthServiceData[month][service] = 0;
            });
        }
        monthServiceData[month][serviceType] = item.count;
    });

    const chartData = Object.values(monthServiceData);

    const colors = {
        Transport: '#8884d8',
        Helper: '#82ca9d',
        Cleaning: '#ffc658',
    };

    return (
        <div style={{ height: 300 }} className='p-4 bg-slate-100 w-11/12 mx-auto my-8 rounded-2xl'>
            <h2 className='text-center text-4xl font-bold mb-9'>Services Booked Per Type Over the Past Year</h2>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {services.map((service) => (
                        <Bar key={service} dataKey={service} stackId="a" fill={colors[service]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ServicesPerTypeChart;
