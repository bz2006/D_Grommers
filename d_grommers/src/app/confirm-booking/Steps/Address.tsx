import React from 'react'

type Props = {}

const AddressStep = (props: Props) => {
    return (
        <div>
            <div className='flex w-full items-center justify-evenly'>
                <h2 className='text-2xl'>Address</h2>
                <button className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300">
                    Add New
                </button>
            </div>
            <div className='flex mt-7 items-center justify-center w-full  md:mb-20'>
                <div className="grid grid-cols-1 gap-5 pl-4 pr-4 pt-4 pb-4 items-center ">

                    <div className="flex bg-red-500 p-5 md:w-100 sm:w-full rounded-sm ">
                        <div className='mr-12'>
                            <p>My Home<br />997 Bekasi West Java,<br />Indonesia, 94102</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <button className="bg-gray-200 text-black p-1 px-3">
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="flex bg-gray-500 p-5 md:w-100 sm:w-full rounded-sm ">
                        <div className='mr-12'>
                            <p>My Home<br />997 Bekasi West Java,<br />Indonesia, 94102</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <button className="bg-gray-200 text-black p-1 px-3">
                                Edit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddressStep