import { Radio } from 'antd'
import React from 'react'

type Props = {}

const PaymentMStep = (props: Props) => {
    return (
        <div className='flex mt-7 items-center justify-center w-full  md:mb-20'>
            <div className="grid grid-cols-1 gap-5 pl-4 pr-4 pt-4 pb-4 items-center ">

                <div className="flex bg-red-500 p-5 md:w-100 sm:w-full rounded-sm ">
                    <div className='mr-12'>
                        <p>Pay Online Now</p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className="p-1 px-2">
                            <Radio />
                        </div>
                    </div>
                </div>

                <div className="flex bg-gray-500 p-5 md:w-100 sm:w-full rounded-sm ">
                    <div className='mr-12'>
                        <p>Pay On Groom </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className=" p-1 px-4">
                            <Radio />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentMStep