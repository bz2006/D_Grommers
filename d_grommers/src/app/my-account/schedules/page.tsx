"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Footer from '@/app/Components/Footer'
import Header from '@/app/Components/Header'
import OrderSection from '@/app/Components/OrderSection'


type bookingprops = {
    _id: string;
    userid: string;
    bookingid: string;
    bookingdate:string;
    status: string;
    package: GroomingPackage;
    bookingadrs: Address;
    paymentMethod: string;
    slot: Slot
}

type Slot = {
    time: string;
    date: Sdate
}

type Sdate = {
    dayName: string;
    dayNumber: number;
    month: string;
    year: string;
}

type Address = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type GroomingPackage = {
    pid: string;
    breedname:string;
    packageName: string;
    packageDesc: string;
    services: string[];
    charge: number;
};

type Props = {}

const Schedules = (props: Props) => {

    const [Bookings, setBookings] = useState<bookingprops[] | null>(null)



    const GetAllBookings = async () => {

        try {
            const userid = await GetUser()
            const Schedules = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user-bookings/${userid}`)
            console.log(Schedules.data.data)
            setBookings(Schedules.data.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        GetAllBookings()
    }, [])

    const GetUser = async () => {
        try {
            const res = await axios.get('/api/user')
            if (res) {
                return res.data["data"]['_id']
            }


        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <Header />
            <div className='flex pt-7 items-center justify-center flex-col '>
                {Bookings?.map((sch) => (
                    <OrderSection
                        key={sch._id}
                        bookingid={sch.bookingid}
                        bookingdate={sch.bookingdate}
                        Gpackage={sch.package}
                        bookingadrs={sch.bookingadrs}
                        slot={sch.slot}
                        status={sch.status}
                    />
                ))}

            </div>
            <Footer />
        </>
    )
}

export default Schedules