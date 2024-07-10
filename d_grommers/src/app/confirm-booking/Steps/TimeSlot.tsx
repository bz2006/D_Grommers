"use client"
import React, { useEffect, useState, useRef } from 'react'
import { DatePicker, message, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { format } from 'date-fns';
import "./Hidescroll.css"

type Props = {}

type dateprop = {
    dayNumber: number,
    dayName: string,
    month: number,
    year: number
}

const TimeSlotSteps = (props: Props) => {

    const [Days, setDays] = useState<{ dayNumber: number, dayName: string, month: number, year: number }[]>([])
    const [date, setdate] = useState<dateprop>({
        dayNumber: 0,
        dayName: "",
        month: 0,
        year: 0
    })
    const [slots, setslots] = useState([
        '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM'
    ])
    const [time, setTime] = useState("")

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

    useEffect(() => {
        const data = localStorage.getItem("_dgBkDT");
        const slot = data ? JSON.parse(data) : null;
        if(slot){
            setTime(slot.time)
            setdate({
                dayName: date["dayName"],
                dayNumber: date["dayNumber"],
                month: date["month"],
                year: date["year"]
            })
        }
    }, [])
    

    const onChangeDate = (dateString: any) => {

        if (dateString) {
            const month = dateString.$d.getMonth();
            const year = dateString.$d.getFullYear();
            setDays(getAllDaysInMonth(month, year))
        }
    }
    const getAllDaysInMonth = (month: number, year: number): { dayNumber: number, dayName: string, month: number, year: number }[] => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            const formattedDayName = format(new Date(date), 'EEEE').slice(0, 3); // Extract first three characters
            days.push({
                dayNumber: date.getDate(),
                dayName: formattedDayName,
                month: month + 1, // Add 1 to make the month 1-indexed (e.g., 7 for July)
                year: date.getFullYear()
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const Selectdate = (dayName: string, dayNumber: number, month: number, year: number) => {


        setdate({
            dayName: dayName,
            dayNumber: dayNumber,
            month: month,
            year: year
        })


    }

    const SelectTime = (time: string) => {
        message.success(time)
        setTime(time)
        const slot = {
            date: date,
            time: time
        }
        localStorage.setItem("_dgBkDT", JSON.stringify(slot));
    }


    const disabledDate = (current: Dayjs | undefined): boolean => {
        return !!current && current.isBefore(dayjs(), 'day');
      };

    return (
        <div>
            <div className='p-2 flex justify-between'>
                <DatePicker picker="month" size='large'disabledDate={disabledDate} onChange={onChangeDate} format={"MMMM YYYY"} />
                <div className='flex pr-2'>
                    <button
                        className='hidden md:block bg-white px-3 mr-2 font-bold text-black rounded-md'
                        onClick={scrollLeft}
                    >&lt;</button>
                    <button
                        className='hidden md:block bg-white px-3  font-bold text-black rounded-md'
                        onClick={scrollRight}
                    >&gt;</button>
                </div>
            </div>


            <div className='flex space-x-4 p-2 overflow-x-scroll w-[300px] md:w-[600px] CBhide-scrollbar' ref={scrollRef}>
                {Days.map((day, index) => (
                    <div
                        onClick={() => { Selectdate(day.dayName, day.dayNumber, day.month, day.year) }}
                        key={index}
                        className='flex hover:cursor-pointer bg-slate-50 min-w-24 max-w-24 h-32 rounded-md items-center justify-center flex-col shrink-0'
                    >
                        <h1 className='text-black text-xl'>{day.dayName}</h1>
                        <h1 className='text-black text-2xl m-3 font-bold'>{day.dayNumber}</h1>
                        <h1 className='text-black text-sm'>Slot</h1>
                    </div>
                ))}
            </div>


            {/* Time */}
            <div className={date.dayNumber ? 'block' : 'hidden'}>

                <div className='p-2 mt-3'>
                    <h2>Available Time Slots</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4 p-2">
                    {slots.length > 0 && slots.map((t) => (
                        <div onClick={() => SelectTime(t)} className='flex hover:cursor-pointer bg-slate-50 w-36 h-12 rounded-md items-center justify-center flex-col'>
                            <h1 className='text-black text-xl'>{t}</h1>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default TimeSlotSteps

