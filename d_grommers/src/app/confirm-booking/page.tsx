import React from 'react'
import ConfirmHeader from '../Components/ConfirmHeader'
import BookingProgress from '../Components/BookingProgress'

type Props = {}

const ConfirmBooking = (props: Props) => {
  return (
    <>
      <ConfirmHeader />

      <div className='flex items-center justify-center p-10'>
        <BookingProgress />
      </div>

      <div>
        <div className='flex w-full items-center justify-evenly'>
          <h2 className='text-2xl'>Address</h2>
          <button className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300">
            Add New
          </button>
        </div>
        <div className='flex items-center justify-center mt-7'>
        <div className="flex bg-green-600 items-center justify-start md:w-1/2 p-2 sm:w-full">
          <p className="text-2xl text-white">My home is  ahood home and laso a</p>
        </div>
        </div>

      </div>
    </>
  )
}

export default ConfirmBooking