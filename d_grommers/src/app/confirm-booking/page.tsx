"use client"
import React, { useState } from 'react'
import { Radio } from 'antd';
import ConfirmHeader from '../Components/ConfirmHeader'
import BookingProgress from '../Components/BookingProgress'
import AddressStep from './Steps/Address'
import TimeSlotSteps from './Steps/TimeSlot'
import PaymentMStep from './Steps/PaymentMethod'
import ReviewBooking from './Steps/ReviewBooking';

type Props = {}

const ConfirmBooking = (props: Props) => {

  const [CurrentStep, setCurrentStep] = useState(0)
 
  const Steps = [
    <AddressStep />,
    <TimeSlotSteps />,
    <PaymentMStep />,
    <ReviewBooking setCurrentStep={setCurrentStep} />
  ]


  const NextStep = () => {
    if (CurrentStep <= 2) {
      setCurrentStep(CurrentStep + 1)
    }
  }

  const BAckStep = () => {
    if (CurrentStep != 0) {
      setCurrentStep(CurrentStep - 1)
    }
  }


  return (
    <>
      <ConfirmHeader />

      {/* <div className='flex items-center justify-center p-10'>
        <BookingProgress />
      </div> */}

      <div className='flex items-center justify-center'>
        {Steps[CurrentStep]}
      </div>



      <div className='fixed bottom-0 left-0 w-full bg-blue-800 flex justify-center items-center p-3'>
        <button onClick={BAckStep} className='bg-white text-blue-800 p-2 rounded-md w-full sm:w-auto md:w-96 hover:bg-gray-100'>
          back
        </button>
        <button onClick={NextStep} className='bg-white text-blue-800 p-2 rounded-md w-full sm:w-auto md:w-96 hover:bg-gray-100'>
          next
        </button>
      </div>
    </>
  )
}

export default ConfirmBooking