"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button, Select, Collapse, Modal } from "antd"
import type { CollapseProps } from 'antd';

type Props = {}

type Loc = {
  value: string;
  label: string;
};

type GroomingSlot = {
  _id: string;
  district: string;
  monthlyslots: MonthlySlot[];
};

type MonthlySlot = {
  _id: string;
  month: string;
  year: number;
  slots: Slot[];
};

type Slot = {
  _id: string;
  day: number;
  dayname: string;
  avsl: number;
  time: Time[];
};

type Time = {
  _id: string;
  time: string;
  available: boolean;
};

const Slots = (props: Props) => {

  const [locations, setLocations] = useState<Loc[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<GroomingSlot | null>(null);
  const [selectedSlot, setselectedSlot] = useState<MonthlySlot | null>(null);
  // const [selectedMid, setselectedMid] = useState<Slot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (slot: any) => {
    setIsModalOpen(true);
    console.log(slot);

    setselectedSlot(slot);

  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {

      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/manage/update-slots`,
        { locid: selectedLocation?._id, slotid: selectedSlot?._id, NewSlots: selectedSlot })

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/manage/get-locations`);
      setLocations(res.data.data.map((loc: { _id: string; district: string }) => ({ value: loc._id, label: loc.district })));
      console.log(res.data.data)
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const GetSingleLoc = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/manage/get-singlelocation/${selectedLocation}`);
      setSelectedLocation(res.data.data);
      console.log(res.data.data)


    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const SelectNew = (id: string, value: boolean) => {
    setselectedSlot(prevSlot => {
      if (!prevSlot) return prevSlot; // Ensure we have a slot selected

      // Create a new slot object with updated time array
      const updatedTime = prevSlot.time.map(slot =>
        slot._id === id ? { ...slot, available: value } : slot
      );

      // Return new state with updated time array
      return { ...prevSlot, time: updatedTime };
    });

  }

  const DeleteTS = (id: string) => {
    setselectedSlot(prevSlot => {
      if (!prevSlot) return prevSlot; // Ensure we have a slot selected

      // Filter out the slot with the matching id
      const updatedTime = prevSlot.time.filter(slot => slot._id !== id);

      // Return new state with updated time array
      return { ...prevSlot, time: updatedTime };
    });
  };

  console.log(selectedSlot)
  console.log(selectedLocation)

  useEffect(() => {
    fetchLocations();
  }, []);

  const items: CollapseProps['items'] = selectedLocation?.monthlyslots?.map((monthlySlot, index) => ({
    key: `${index}`,
    label: `${monthlySlot.month} ${monthlySlot.year}`,
    children: (
      <div key={index} >
        <h2 className='text-xl pb-3'>{monthlySlot.month} {monthlySlot.year}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-x-1 gap-y-5'>
          {monthlySlot.slots?.map((slot, slotIndex) => (
            <div key={slotIndex} onClick={() => { showModal(slot) }} className='flex flex-col p-5 bg-black w-40 items-center justify-center rounded-md text-white hover:cursor-pointer'>
              <h1>{slot.dayname}, {slot.day}</h1>
              <h1>{slot.avsl} Slots</h1>
              {/* <div>
                {slot.time?.map((time, timeIndex) => (
                  <p key={timeIndex}>Time: {time.time}</p>
                ))}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    ),
  })) || [];



  return (
    <div>

      <div className='flex p-20'>

        <Select
          showSearch
          style={{ width: 200, marginRight: '5%' }}
          size="large"
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            typeof optionA?.label === 'string' && typeof optionB?.label === 'string'
              ? optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
              : 0
          }
          onChange={(value, option: any) => {
            setSelectedLocation(option.label);
          }}
        >
          {locations.map((loc) => (
            <Select.Option key={loc.value} value={loc.value} label={loc.label}>
              {loc.label}
            </Select.Option>
          ))}
        </Select>

        <Button onClick={GetSingleLoc}>Fetch</Button>

      </div>

      <div>
        <h1 className={`text-2xl pb-5 p-10 text-white ${selectedLocation ? "block" : "hidden"}`}>Location: {selectedLocation?.district}</h1>
      </div>

      <div className='p-10'>
        <Collapse items={items} />

      </div>

      <Modal title={`${selectedSlot?.dayname}, ${selectedSlot?.day}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <div>

          <div className='p-5 text-2xl pb-0'>
            Slot Availability
            <div className='pt-2'>
              <hr className='w-96' />
            </div>
          </div>


          <div className='p-5'>
            <button className="bg-violet-500 text-white font-bold py-2 px-4 mr-5 rounded">
              Available
            </button>

            <button className="bg-white-500 border border-black text-black  font-bold py-2 px-4 rounded">
              Not Available
            </button>

          </div>

        </div>



        <div>
          <div className='p-5 text-2xl pb-0'>
            Time Slots
            <div className='pt-2'>
              <hr className='w-96' />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5 p-5'>
            {selectedSlot?.time.map((t, index) => (
              <div
                onClick={() => { SelectNew(t._id, t.available === true ? false : true) }}
                className={`${t.available === true ? "bg-violet-600 text-white" : "bg-white"} p-2 items-center justify-center flex min-w-10 border rounded-md border-black hover:cursor-pointer relative`}
                key={t._id}
              >
                <span
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 bg-red-500 text-white rounded-full hover:bg-red-700 cursor-pointer text-xs"
                  onClick={() => DeleteTS(t._id)}
                >
                  &times;
                </span>
                {t.time}
              </div>
            ))}
            <div
              className='p-2 items-center justify-center flex min-w-10 border border-dashed rounded-md border-black hover:cursor-pointer'>
              +
            </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default Slots