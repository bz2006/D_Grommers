import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';

type Props = {}

const AddressStep = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const[iseditModalOpen,setiseditModalOpen]=useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showeditModal = () => {
        setiseditModalOpen(true);
    };

    const handleeditCancel = () => {
        setiseditModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className='flex w-full items-center justify-evenly'>
                <h2 className='text-2xl'>Address</h2>
                <button onClick={showModal} className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300">
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
                            <button onClick={showeditModal} className="bg-gray-200 text-black p-1 px-3">
                                Edit
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Add new Address */}

            <Modal title="Add New Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Input placeholder="Name" size='large' className='mb-5' />
                <Input placeholder="Address" size='large' className='mb-5' />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <Input placeholder="City" size='large' />
                    <Input placeholder="State" size='large' />
                    <Input placeholder="Country" size='large' />
                    <Input placeholder="Pincode" size='large' />
                    <Input placeholder="Phone Number " size='large' />
                </div>
            </Modal >

            {/* Edit Address */}

            <Modal title="Edit Address" open={iseditModalOpen} onOk={handleOk} onCancel={handleeditCancel}>

                <Input placeholder="Name" size='large' className='mb-5' />
                <Input placeholder="Address" size='large' className='mb-5' />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <Input placeholder="City" size='large' />
                    <Input placeholder="State" size='large' />
                    <Input placeholder="Country" size='large' />
                    <Input placeholder="Pincode" size='large' />
                    <Input placeholder="Phone Number " size='large' />
                </div>
            </Modal >


        </div >
    )
}

export default AddressStep