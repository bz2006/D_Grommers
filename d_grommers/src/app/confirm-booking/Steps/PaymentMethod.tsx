import { Radio, Checkbox } from 'antd'
<<<<<<< HEAD
import React, { useState, ChangeEvent } from 'react'
=======
import React, { useState, ChangeEvent,useEffect } from 'react'
>>>>>>> origin/master

type Props = {}

type PaymentMethod = {
    paynowonline: boolean;
    payongroom: boolean;
}

const PaymentMStep = (props: Props) => {

    const [OnlineMethod, setOnlineMethod] = useState(true)
    const [OngroomMethod, setOngroomMethod] = useState(false)

    const ChangeOngroom = (target: boolean) => {
        setOngroomMethod(target)
        setOnlineMethod(false)
<<<<<<< HEAD

=======
        const method={
            paymentMethod:"On-groom-pay"
        }
        localStorage.setItem("_dgBkPM", JSON.stringify(method));
>>>>>>> origin/master
    }

    const ChangeOnline = (target: boolean) => {
        setOnlineMethod(target)
        setOngroomMethod(false)
<<<<<<< HEAD
    }

=======
        const method={
            paymentMethod:"Online-pay"
        }
        localStorage.setItem("_dgBkPM", JSON.stringify(method));
    }

    useEffect(() => {
        const payMethod = localStorage.getItem("_dgBkPM");
        const parsedPayMethod = payMethod ? JSON.parse(payMethod) : null;
        if (parsedPayMethod) {
            if(parsedPayMethod.paymentMethod==="On-groom-pay"){
                ChangeOngroom(true)
            }
        }
    }, [])

>>>>>>> origin/master

    return (
        <div className='flex mt-7 items-center justify-center w-full  md:mb-20'>
            <div className="grid grid-cols-1 gap-5 pl-4 pr-4 pt-4 pb-4 items-center ">

                <div onClick={() => ChangeOnline(OnlineMethod === false ? true : false)} className="flex bg-red-500 p-8 hover:cursor-pointer md:w-full sm:w-full rounded-sm ">
                    <div className='mr-12'>
                        <h2 className='text-xl'>Pay Online Now</h2>
                    </div>
                    <div className='flex items-center justify-center '>
                        <div className="p-1 px-2">
                            <Checkbox checked={OnlineMethod} value={OnlineMethod} onChange={() => ChangeOnline(OnlineMethod === false ? true : false)} />
                        </div>
                    </div>
                </div>

                <div onClick={() => ChangeOngroom(OngroomMethod === false ? true : false)} className="flex bg-gray-500 p-8 md:w-100 sm:w-full rounded-sm hover:cursor-pointer ">
                    <div className='mr-12'>
                        <h2  className='text-xl'>Pay On Groom </h2>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className=" p-1 px-4">
                            <Checkbox checked={OngroomMethod} value={OngroomMethod} onChange={() => ChangeOngroom(OngroomMethod === false ? true : false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentMStep