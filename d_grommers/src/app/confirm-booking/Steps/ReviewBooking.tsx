<<<<<<< HEAD
import React from 'react'

type Props = {
  setCurrentStep: (step: number) => void;
}

const ReviewBooking = ({ setCurrentStep }: Props) => {
    
=======
import React, { useEffect, useState } from 'react'

type Props = {
    setCurrentStep: (step: number) => void;
}

type Adrs = {
    name: string;
    address: string;
}

type PKGprop = [{
    charge: number
    packageDesc: string;
    packageName: string;
    pid: string;
    services: []
    _id: string;
}]

const ReviewBooking = ({ setCurrentStep }: Props) => {

    const [PaymentMethod, setPaymentMethod] = useState()
    const [PKG, setPKG] = useState<PKGprop>([{
        charge: 0,
        packageDesc: "",
        packageName: "",
        pid: "",
        services: [],
        _id: ""
    }])
    const [Sch, setSch] = useState("")
    const [Address, setAddress] = useState<Adrs>({
        name: "string",
        address: ""
    })

    const GetAddress = () => {
        const adrs = localStorage.getItem("_dgBkADRS");
        const address = adrs ? JSON.parse(adrs) : null;
        setAddress({
            name: address?.name || "",
            address: address?.address || ""
        })

    }

    const GetSlot = () => {

        const data = localStorage.getItem("_dgBkDT");
        const slot = data ? JSON.parse(data) : null;
        console.log(slot.time);

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Month is 0-indexed in JavaScript's Date object, so we need to adjust by subtracting 1
        const date = new Date(slot.date["year"], slot.date["month"] - 1, slot.date["dayNumber"]);

        const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        setSch(`${formattedDate} ${slot.time}`)
    }

    const GetPayM = () => {
        const payMethod = localStorage.getItem("_dgBkPM");
        const parsedPayMethod = payMethod ? JSON.parse(payMethod) : null;
        setPaymentMethod(parsedPayMethod.paymentMethod)
    }

    const GetPKG = () => {
        //packageName
        const data = localStorage.getItem("_dgBkDet");
        const pkg = data ? JSON.parse(data) : null;
        setPKG([{
            charge: pkg.charge,
            packageDesc: pkg.packageDesc,
            packageName: pkg.packageName,
            pid: pkg.pid,
            services: pkg.services,
            _id: pkg._id
        }]);


    }
    console.log(PKG);

    useEffect(() => {
        GetPayM()
        GetAddress()
        GetSlot()
        GetPKG()
    }, [])


>>>>>>> origin/master
    return (
        <div className="flex flex-col sm:flex-row gap-5 pt-10 md:p-20 md:justify-center w-full">
            <div className='bg-white w-full md:w-96 md:h-96'>

                <div onClick={() => setCurrentStep(0)} className=' flex flex-row items-center justify-between p-5 border-b border-gray-400 hover:cursor-pointer'>
                    <h1 className='text-black'>ADDRESS</h1>
<<<<<<< HEAD
                    <p className='text-black'>My Home<br />997 Bekasi West Java,</p>
=======
                    <p className='text-black'>{Address.name},<br />{Address.address.length > 20 ? Address.address.substring(0, 20) : Address.address}..</p>
>>>>>>> origin/master
                    <h1 className='text-black'>&gt;</h1>
                </div>

                <div onClick={() => setCurrentStep(1)} className='flex flex-row items-center justify-between p-5 border-b border-gray-400 hover:cursor-pointer'>
                    <h1 className='text-black'>SCHEDULE</h1>
<<<<<<< HEAD
                    <p className='text-black'>July 7, 1 AM</p>
=======
                    <p className='text-black'>{Sch}</p>
>>>>>>> origin/master
                    <h1 className='text-black'>&gt;</h1>
                </div>

                <div onClick={() => setCurrentStep(2)} className='flex flex-row items-center justify-between p-5 border-b border-gray-400 hover:cursor-pointer'>
                    <h1 className='text-black'>PAYMENT</h1>
<<<<<<< HEAD
                    <p className='text-black'>Pay Online Now</p>
=======
                    <p className='text-black'>{PaymentMethod}</p>
>>>>>>> origin/master
                    <h1 className='text-black'>&gt;</h1>
                </div>

                <div onClick={() => setCurrentStep(3)} className='flex flex-row items-center justify-between p-5 border-b border-gray-400 hover:cursor-pointer'>
                    <h1 className='text-black'>PACKAGE</h1>
<<<<<<< HEAD
                    <p className='text-black'>Puppy Deluxe</p>
=======
                    <p className='text-black'>{PKG[0].packageName}</p>
>>>>>>> origin/master
                    <h1 className='text-black'>&gt;</h1>
                </div>
            </div>

            {/* Subtotal */}

            <div className='bg-white w-full md:w-96 md:h-96 p-5 md:rounded-lg'>

                <div className='mb-3 mt-3'>
                    <h2 className='text-black'>SUB TOTAL</h2>
                </div>

                <div className='flex flex-row items-center justify-between pb-2'>
                    <h3 className='text-black'>Package</h3>
<<<<<<< HEAD
                    <h3 className='text-black'>₹750.00</h3>
=======
                    <h3 className='text-black'>₹{PKG[0].charge}</h3>
>>>>>>> origin/master
                </div>

                <div className='flex flex-row items-center justify-between pb-2'>
                    <h3 className='text-black'>Convenience Fee</h3>
                    <h3 className='text-black'>₹50.00</h3>
                </div>

                <div className='flex flex-row items-center justify-between border-b border-gray-400 pb-3 mb-3'>
                    <h3 className='text-black'>Tax (5%)</h3>
                    <h3 className='text-black'>₹30.00</h3>
                </div>

                <div className='flex flex-row items-center justify-between'>
                    <h3 className='text-black'>Grand Total</h3>
<<<<<<< HEAD
                    <h3 className='text-black font-bold text-xl'>₹830.00</h3>
=======
                    <h3 className='text-black font-bold text-xl'>₹{PKG[0].charge}</h3>
>>>>>>> origin/master
                </div>


                <div className='hidden md:flex mt-5 items-center justify-between'>
                    <button className='bg-green-500 text-blue-800 p-3 md:w-[350px] rounded-md hover:bg-green-300'>
                        Button
                    </button>
                </div>
<<<<<<< HEAD
                
=======

>>>>>>> origin/master
                <div className='sm:flex md:hidden fixed bottom-0 left-0 w-full bg-blue-800 justify-center items-center p-4'>
                    <button className='bg-white text-blue-800 p-2 rounded-md w-full sm:w-auto h-12 hover:bg-gray-100'>
                        Button
                    </button>
                </div>

            </div>
        </div>
    )
}
export default ReviewBooking