"use client";

import React, { useState, useEffect } from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta } from "@/helpers/types";
import { RenderCell } from "./render-cell";

export const History = ({
    data,
    meta,
}: {
    data: any;
    meta: IMeta;
}) => {
    console.log("🚀 ~ data:", data)
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState<any>();

    const columns = [
        { name: "Day", uid: "day" },
        { name: "Date", uid: "date" },
        // { name: "Time", uid: "time" },
        { name: "Signature", uid: "signature" },
    ];

    useEffect(() => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        setSelectedMonth(currentMonth);
    }, []);

    const handleMonthChange = (e: any) => {
        setSelectedMonth(e.target.value);
    };

    const handleWeekChange = (e: any) => {
        setSelectedWeek(parseInt(e.target.value));
    };

    const getWeekOfMonth = (date: any) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const offset = date.getDay() - firstDay.getDay();
        return Math.ceil((date.getDate() + offset) / 7);
    };
    const filterData = (type: any) => {
        return data.timestamps
            .filter((timestamp: any) => {
                const eventDate = timestamp[type] ? new Date(timestamp[type]) : null;
                if (!eventDate) return false; // Skip if there's no date for the specified type

                const eventMonth = eventDate.toISOString().slice(0, 7);
                const eventWeek = getWeekOfMonth(eventDate);

                // Apply filters only if selectedMonth or selectedWeek is chosen
                const monthMatches = selectedMonth ? eventMonth === selectedMonth : true;
                const weekMatches = selectedWeek ? eventWeek === selectedWeek : true;

                return monthMatches && weekMatches;
            })
            .map((timestamp: any) => {
                const eventDate = timestamp[type] ? new Date(timestamp[type]) : null;

                return {
                    _id: timestamp._id,
                    day: eventDate ? eventDate.toLocaleDateString("en-US", { weekday: "long" }) : "N/A",
                    date: eventDate ? eventDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }) : "N/A",
                    signature: data.name || "Anonymous"
                };
            });
    };

    // For check-in data
    const checkInData = selectedMonth || selectedWeek ? filterData("sign_in") : data.timestamps
        .filter((timestamp: any) => timestamp.sign_in)
        .map((timestamp: any) => ({
            _id: timestamp._id,
            day: new Date(timestamp.sign_in).toLocaleDateString("en-US", { weekday: "long" }),
            date: new Date(timestamp.sign_in).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }),
            signature: data.name || "Anonymous"
        }));

    // For check-out data
    const checkOutData = selectedMonth || selectedWeek ? filterData("sign_out") : data.timestamps
        .filter((timestamp: any) => timestamp.sign_out)
        .map((timestamp: any) => ({
            _id: timestamp._id,
            day: new Date(timestamp.sign_out).toLocaleDateString("en-US", { weekday: "long" }),
            date: new Date(timestamp.sign_out).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }),
            signature: data.name || "Anonymous"
        }));


    // const checkInData = filterData("sign_in");
    console.log("🚀 ~ checkInData:", checkInData)
    // const checkOutData = filterData("sign_out");
    console.log("🚀 ~ checkOutData:", checkOutData)

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">

                <h1>

                </h1>
                <div className="flex items-center gap-x-4">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="p-2 border rounded-lg"
                    />
                    <select
                        value={selectedWeek}
                        onChange={handleWeekChange}
                        className="p-2 border rounded-lg"
                    >
                        <option value="">All</option>
                        {[1, 2, 3, 4, 5].map((week) => (
                            <option key={week} value={week}>
                                Week {week}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <h4 className="text-lg font-semibold mb-4">Check-In History</h4>
                <TableWrapper
                    meta={meta}
                    RenderCell={RenderCell}
                    data={checkInData}
                    columns={columns}
                />
            </div>
            <div className="max-w-[95rem] mx-auto w-full mt-8">
                <h4 className="text-lg font-semibold mb-4">Check-Out History</h4>
                <TableWrapper
                    meta={meta}
                    RenderCell={RenderCell}
                    data={checkOutData}
                    columns={columns}
                />
            </div>
        </div>
    );
};
