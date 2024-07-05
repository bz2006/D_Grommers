import React from 'react'

type Props = {}

const ReviewBooking = (props: Props) => {
    return (
        <div className="flex flex-col sm:flex-row gap-5 pt-10 md:p-20 md:justify-center w-full">
            <div className='bg-white w-full md:w-96 md:h-96'>

                <div className=' flex flex-row items-center justify-between p-5 border-b border-gray-400'>
                    <h1 className='text-black'>ADDRESS</h1>
                    <p className='text-black'>My Home<br />997 Bekasi West Java,</p>
                    <h1 className='text-black'>&gt;</h1>
                </div>

                <div className='flex flex-row items-center justify-between p-5 border-b border-gray-400'>
                    <h1 className='text-black'>SCHEDULE</h1>
                    <p className='text-black'>July 7, 1 AM</p>
                    <h1 className='text-black'>&gt;</h1>
                </div>

                <div className='flex flex-row items-center justify-between p-5 border-b border-gray-400'>
                    <h1 className='text-black'>PAYMENT</h1>
                    <p className='text-black'>Pay Online Now</p>
                    <h1 className='text-black'>&gt;</h1>
                </div>

                <div className='flex flex-row items-center justify-between p-5 border-b border-gray-400'>
                    <h1 className='text-black'>PACKAGE</h1>
                    <p className='text-black'>Puppy Deluxe</p>
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
                    <h3 className='text-black'>₹750.00</h3>
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
                    <h3 className='text-black font-bold text-xl'>₹830.00</h3>
                </div>


                <div className='hidden md:flex mt-5 items-center justify-between'>
                    <button className='bg-green-500 text-blue-800 p-3 md:w-[350px] rounded-md hover:bg-green-300'>
                        Button
                    </button>
                </div>
                
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