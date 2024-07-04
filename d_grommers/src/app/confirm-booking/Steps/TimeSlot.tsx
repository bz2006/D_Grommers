"use client"
import React, { useEffect, useState, useRef } from 'react'
import { DatePicker, Space } from 'antd';
import { format } from 'date-fns';
import "./Hidescroll.css"

type Props = {}

const TimeSlotSteps = (props: Props) => {

    const [Days, setDays] = useState<{ dayNumber: number, dayName: string }[]>([])

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300, // Adjust the value as needed
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300, // Adjust the value as needed
                behavior: 'smooth',
            });
        }
    };

    const onChangeDate = (dateString: any) => {
        console.log(dateString);

        if (dateString) {
            const month = dateString.$d.getMonth();
            const year = dateString.$d.getFullYear();
            console.log(month, "==", year);
            console.log(getAllDaysInMonth(month, year))
            setDays(getAllDaysInMonth(month, year))
        }
    }
    const getAllDaysInMonth = (month: number, year: number): { dayNumber: number, dayName: string }[] => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            const formattedDayName = format(new Date(date), 'EEEE').slice(0, 3); // Extract first three characters
            days.push({
                dayNumber: date.getDate(),
                dayName: formattedDayName
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    }; const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];




    return (
        <div>
            <div className='p-2 flex justify-between'>
                <DatePicker picker="month" size='large' onChange={onChangeDate} format={"MMMM YYYY"} />
                <div className='flex pr-2'>
                    <button
                        className='hidden md:block bg-white px-3 mr-5 font-bold text-black rounded-md'
                        onClick={scrollLeft}
                    >&lt;</button>
                    <button
                        className='hidden md:block bg-white px-3  font-bold text-black rounded-md'
                        onClick={scrollRight}
                    >&gt;</button>
                </div>
            </div>


            <div className='flex space-x-4 p-2 overflow-x-scroll w-[300px] md:w-[600px] CBhide-scrollbar' ref={scrollRef}>
                {days.map((day, index) => (
                    <div
                        key={index}
                        className='flex hover:cursor-pointer bg-slate-50 min-w-24 max-w-24 h-32 rounded-md items-center justify-center flex-col shrink-0'
                    >
                        <h1 className='text-black text-xl'>{day}</h1>
                        <h1 className='text-black text-2xl m-3 font-bold'>{index + 1}</h1>
                        <h1 className='text-black text-sm'>Slot</h1>
                    </div>
                ))}
            </div>


            {/* Time */}
            <div className='p-2 mt-3'>
                <h2>Available Time Slots</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4 p-2">
                <div className='flex hover:cursor-pointer bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                    <h1 className='text-black text-xl'>10:30 AM</h1>
                </div><div className='flex bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                    <h1 className='text-black text-xl'>10:30 AM</h1>
                </div><div className='flex bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                    <h1 className='text-black text-xl'>10:30 AM</h1>
                </div><div className='flex bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                    <h1 className='text-black text-xl'>10:30 AM</h1>
                </div><div className='flex bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                    <h1 className='text-black text-xl'>10:30 AM</h1>
                </div><div className='flex bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                    <h1 className='text-black text-xl'>10:30 AM</h1>
                </div>
            </div>

        </div>
    )
}

export default TimeSlotSteps

