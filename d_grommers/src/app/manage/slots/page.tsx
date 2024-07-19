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
  district: string;
  monthlyslots: MonthlySlot[];
};

type MonthlySlot = {
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
  time: string;
};

const Slots = (props: Props) => {

  const [locations, setLocations] = useState<Loc[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<GroomingSlot | null>(null);
  const [selectedSlot, setselectedSlot] = useState<Slot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (slot: any) => {
    setIsModalOpen(true);
    console.log(slot);

    setselectedSlot(slot);

  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/manage/get-locations`);
      setLocations(res.data.data.map((loc: { _id: string; district: string }) => ({ value: loc._id, label: loc.district })));
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
                className='p-2 items-center justify-center flex min-w-10 border rounded-md border-black hover:cursor-pointer'
                key={index}>
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