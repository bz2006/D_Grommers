"use client"
import React, { useEffect, useState, useRef } from 'react'
import { DatePicker, message, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { format } from 'date-fns';
import "./Hidescroll.css"
import axios from 'axios';
import PaymentMStep from './PaymentMethod';

type Props = {}

type dateprop = {
    dayNumber: number,
    dayName: string,
    month: string,
    year: number
}

type monthprop = {
    month: string,
    year: number
}

type GroomingSlot = {
    _id: string;
    district: string;
    monthlyslots: MonthlySlot[];
};
type MonthlySlot = {
    time?: any;
    _id: string;
    dayname?: string;
    day?: number;
    month?: string;
    available?: boolean;
    year?: number;
    slots?: Slot[];
};
type Slot = {
    _id: string;
    day: number;
    dayname: string;
    available: boolean;
    time: Time[];
};

type Time = {
    _id: string;
    time: string;
    available: boolean;
};

const TimeSlotSteps = (props: Props) => {

    const [AllMonths, setAllMonths] = useState<GroomingSlot | null>(null);
    const [SelectedMonth, setSelectedMonth] = useState<Slot[] | null>(null);
    const [SelectedMonthDet, setSelectedMonthDet] = useState<monthprop>({
        month: "",
        year: 0
    })
    const [date, setdate] = useState<dateprop>({
        dayNumber: 0,
        dayName: "",
        month: "0",
        year: 0
    })
    const [slots, setslots] = useState<Time[] | null>(null);
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


    const GetAddress = () => {
        const adrs = localStorage.getItem("_dgBkADRS");
        const address = adrs ? JSON.parse(adrs) : null;
        return address.city

    }

    const GetSingleLoc = async (loc?: string) => {
        try {
            let location = loc

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/manage/get-singlelocation/${location}`);
            setAllMonths(res.data.data);
            console.log(res.data.data)


        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        const loc = GetAddress()
        GetSingleLoc(loc)
        const data = localStorage.getItem("_dgBkDT");
        const slot = data ? JSON.parse(data) : null;
        if (slot) {
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
            const date = new Date(dateString.$d);
            const monthName = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const result = AllMonths?.monthlyslots.find(
                slot => slot.month === monthName && slot.year === year
            );
            setSelectedMonthDet({
                month: monthName,
                year: year
            })
            setSelectedMonth(result?.slots || null)


            // setDays()
        }
    }

    const Selectdate = (dayName: string, dayNumber: number, month: string, year: number, time: any) => {

        setslots(time);

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
        <>
            <div className='p-4 sm:block md:hidden '>
                <div className='p-1 flex justify-between'>
                <h1 className='font-semibold text-xl'>Date & Time</h1>
                    <DatePicker picker="month" size='large' disabledDate={disabledDate} onChange={onChangeDate} format={"MMMM YYYY"} />
                </div>

                {SelectedMonth ? (
                    <>

                        <div className='flex space-x-4 p-2 overflow-x-scroll CBhide-scrollbar' ref={scrollRef}>
                            {SelectedMonth?.map((day, index) => {
                                const availableTimeCount = day.time?.filter(time => time.available).length;
                                return (
                                    <div
                                        onClick={() => { Selectdate(day.dayname, day.day, SelectedMonthDet?.month, SelectedMonthDet?.year, day.time) }}
                                        key={index}
                                        className='flex hover:cursor-pointer bg-slate-50 min-w-24 max-w-24 h-32 rounded-md items-center justify-center flex-col shrink-0'
                                    >
                                        <h1 className='text-black text-xl'>{day.dayname.slice(0, 3)}</h1>
                                        <h1 className='text-black text-2xl m-3 font-bold'>{day.day}</h1>
                                        <div className='flex flex-row justify-center items-center'>
                                            <h1 className={`${availableTimeCount <= 2 ? "text-red-700" : "text-green-700"}  text-md font-extrabold flex mr-2`}>O</h1>
                                            <h1 className='text-black'>{availableTimeCount} Slots</h1>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                        {/* Time */}
                        <div className={SelectedMonth && date.dayNumber ? 'block' : 'hidden'}>

                            <div className='p-2 mt-3'>
                                <h2>Available Time Slots</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4 p-2">

                                {slots?.map((t) => (
                                    <div
                                        key={t._id}
                                        onClick={() => t.available && SelectTime(t.time)}
                                        className={`flex items-center text-black justify-center w-36 h-12 rounded-md flex-col ${t.available ? `hover:cursor-pointer ${time === t.time ? "bg-violet-600 text-white" : "bg-white"}` : "hover:cursor-not-allowed bg-gray-200"}`}
                                    >
                                        <h1 className={` text-xl ${!t.available ? "text-gray-500" : ""}`}>
                                            {t.time}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={time ? 'block' : 'hidden'}>
                            <PaymentMStep />
                        </div>
                    </>
                ) : (
                    <div className='flex justify-center items-center'>
                        <p>Please select a month to continue or sometimes the slots for the selected month haven't been finalized yet.</p>
                    </div>
                )}
            </div>
            {/* ======================== */}

            <div className='hidden md:block'>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className='font-medium text-xl'>Date & Time</h1>
                    <DatePicker
                        className='border border-gray-400 h-fit rounded-[0.300rem]'
                        picker="month" size='large' disabledDate={disabledDate} onChange={onChangeDate} format={"MMMM YYYY"} />
                </div>

                {SelectedMonth ? (
                    <>
                        <div className={`${SelectedMonth ? "flex justify-end mb-4" : "hidden"}`}>
                            <button
                                className='hidden hover:bg-slate-100 md:block bg-white px-3 py-1 mr-2 font-bold text-black rounded-md border border-gray-300 shadow-lg'
                                onClick={scrollLeft}
                            >&lt;</button>
                            <button
                                className='hidden md:block hover:bg-slate-100 bg-white px-3 py-1 mr-2 font-bold text-black rounded-md border border-gray-300 shadow-lg'
                                onClick={scrollRight}
                            >&gt;</button>
                        </div>



                        <div className='flex space-x-3  overflow-x-scroll  CBhide-scrollbar' ref={scrollRef}>
                            {SelectedMonth?.map((day, index) => {
                                const availableTimeCount = day.time?.filter(time => time.available).length;
                                return (
                                    <div
                                        onClick={() => { Selectdate(day.dayname, day.day, SelectedMonthDet?.month, SelectedMonthDet?.year, day.time) }}
                                        key={index}
                                        className='flex hover:cursor-pointer bg-white min-w-24 max-w-24 h-32 rounded-md border border-gray-300 shadow-lg items-center justify-center flex-col shrink-0'
                                    >
                                        <h1 className='text-black text-xl'>{day.dayname.slice(0, 3)}</h1>
                                        <h1 className='text-black text-2xl m-3 font-bold'>{day.day}</h1>
                                        <div className='flex flex-row justify-center items-center'>
                                            <h1 className={`${availableTimeCount <= 2 ? "text-red-700" : "text-green-700"}  text-md font-extrabold flex mr-2`}>O</h1>
                                            <h1 className='text-black'>{availableTimeCount} Slots</h1>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                        {/* Time */}
                        <div className={SelectedMonth && date.dayNumber ? 'block' : 'hidden'}>

                            <div className='p-2 mt-3'>
                                <h2>Available Time Slots</h2>
                            </div>
                            <div className="flex space-x-5">

                                {slots?.map((t) => (
                                    <div
                                        key={t._id}
                                        onClick={() => t.available && SelectTime(t.time)}
                                        className={`flex items-center text-black justify-center w-36 h-12 rounded-md border border-gray-300 shadow-lg flex-col ${t.available ? `hover:cursor-pointer ${time === t.time ? "bg-violet-600 text-white" : "bg-white"}` : "hover:cursor-not-allowed bg-gray-200"}`}
                                    >
                                        <h1 className={` text-xl ${!t.available ? "text-gray-500" : ""}`}>
                                            {t.time}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <h1>Please select a month to continue or sometimes the slots for the selected month haven't been finalized yet.</h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default TimeSlotSteps

