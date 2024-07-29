"use client"
import React, { useState } from 'react'
import { Radio } from 'antd';
import ConfirmHeader from '../Components/ConfirmHeader'
import axios from "axios"
import AddressStep from './Steps/Address'
import TimeSlotSteps from './Steps/TimeSlot'
import PaymentMStep from './Steps/PaymentMethod'
import ReviewBooking from './Steps/ReviewBooking';
import HandlePayment from '@/helpers/HandlePayements/HandleNewPayemnt';
import HandleVerifyPayment from '@/helpers/HandlePayements/HandleVerifyPayment';

type Props = {}

type PaymentProps = {
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
}

const ConfirmBooking = (props: Props) => {

  const [CurrentStep, setCurrentStep] = useState(0)

  const placeBooking = async () => {

    try {

      const userid = await GetUser()
      const Booking = GetBookingDet()
      if (Booking.bookingpayMethod.paymentMethod === "Online-pay") {

        const grandtotal=Booking.bookingamount.package+Booking.bookingamount.fee+Booking.bookingamount.tax-Booking.bookingamount.discount
    
        const payment_res = await HandlePayment(grandtotal) as PaymentProps;
        const verification = await HandleVerifyPayment(payment_res?.razorpay_order_id, payment_res.razorpay_payment_id, payment_res.razorpay_signature)
        console.log(verification)

        if(verification.data.data.verified===true){
          Booking.bookingamount.paid = true;
         
          const BKplace = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/new-booking`, {
            userid: userid,
            bookingpackage: Booking.bookingPKG,
            bookingadrs: Booking.bookingadrs,
            bookingpaymethod: Booking.bookingpayMethod,
            bookingamount: Booking.bookingamount,
            bookingslot: Booking.bookingslot
          })
        }else{
          console.log("Payment Failed")
        }


      } else if (Booking.bookingpayMethod.paymentMethod === "On-groom-pay") {

        const BKplace = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/new-booking`, {
          userid: userid,
          bookingpackage: Booking.bookingPKG,
          bookingadrs: Booking.bookingadrs,
          bookingpaymethod: Booking.bookingpayMethod,
          bookingamount: Booking.bookingamount,
          bookingslot: Booking.bookingslot
        })
        console.log(BKplace);
      }

      // if (BKplace) {
      //   localStorage.removeItem("_dgBkPKG");
      //   localStorage.removeItem("_dgBkPM");
      //   localStorage.removeItem("_dgBkDT");
      //   localStorage.removeItem("_dgBkADRS");
      // }

    } catch (error) {
      console.log(error)
    }

  }


  const GetBookingDet = () => {
    const PKG = localStorage.getItem("_dgBkPKG");
    const bookingPKG = PKG ? JSON.parse(PKG) : null;

    const payMethod = localStorage.getItem("_dgBkPM");
    const bookingpayMethod = payMethod ? JSON.parse(payMethod) : null;

    const slot = localStorage.getItem("_dgBkDT");
    const bookingslot = slot ? JSON.parse(slot) : null;

    const adrs = localStorage.getItem("_dgBkADRS");
    const bookingadrs = adrs ? JSON.parse(adrs) : null;

    const amount = localStorage.getItem("_dgBkAMT");
    const bookingamount = amount ? JSON.parse(amount) : null;

    return { bookingPKG, bookingpayMethod, bookingamount, bookingslot, bookingadrs };

  }

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

  const Steps = [
    <AddressStep />,
    <TimeSlotSteps />,
    <PaymentMStep />,
    <ReviewBooking setCurrentStep={setCurrentStep} placeBooking={placeBooking} />
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