import { Button, Input, message } from 'antd'
import React from 'react'
import axios from 'axios'

type Props = {}

const Locations = (props: Props) => {

const AddLocation=async()=>{
    
    try {
        const res = await axios.post('/api/manage/add-location', {district: 'EKM',genSlots:2,defavslt:5})
        message.success("location added")
    } catch (error) {
        console.log(error);
        
    }
}

    return (
        <div className='p-16'>
            <div className='flex justify-center  items-center'>
                <Input className='w-80 mr-9' type='text' size='large' />
                <Button size='large'>Add Location</Button>
            </div>

            <div className='p-10'>
                <h1>EKM</h1>
            </div>
        </div>
    )
}

export default Locations