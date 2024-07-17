"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button, Select } from "antd"
import {Arrange} from "./Arrange"

type Props = {}

type Loc = {
  value: string;
  label: string;
};

const Slots = (props: Props) => {

  const [locations, setLocations] = useState<Loc[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');


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
      // SlotDataArrange(res.data.data);
      console.log(Arrange(res.data.data));
      
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };
  

  useEffect(() => {
    fetchLocations();
  }, []);

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
          onChange={(value,option:any) => {
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

    </div>
  )
}

export default Slots