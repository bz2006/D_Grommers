"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button, Select, Collapse } from "antd"
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
      <div key={index}>
        <h1 className='text-2xl pb-5'>Location: {selectedLocation?.district}</h1>
        <h2 className='text-xl pb-3'>{monthlySlot.month} {monthlySlot.year}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-x-1 gap-y-1'>
          {monthlySlot.slots?.map((slot, slotIndex) => (
            <div key={slotIndex} className='flex flex-col p-5 bg-black w-40 items-center justify-center rounded-md text-white'>
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


      <div className='p-10'>
        <Collapse items={items} />
        
      </div>

    </div>
  )
}

export default Slots