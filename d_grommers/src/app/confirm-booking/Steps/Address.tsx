
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';

type Props = {}
interface NewAddress {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type Address = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type Sel = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}


type bg = {
    adrsid: string;
}
const AddressStep = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedbg, setselectedbg] = useState<bg>({
        adrsid: "",
    });
    const [iseditModalOpen, setiseditModalOpen] = useState(false);
    const [Alladdress, setallAdrs] = useState<Address[]>([])
    const [selectedaddress, setSelectedadrs] = useState<Sel[]>([{
        _id:"",
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: ""
    }]);
    const [NewAddress, setNewAddresss] = useState<NewAddress>({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: ""
    });

    const { name, address, city, state, country, pin } = NewAddress;
    console.log({ name, address, city, state, country, pin });

    const GetUser = async () => {
        try {
            const res = await axios.get('/api/user')

            return res.data["data"]['_id'];

        } catch (error) {
            console.log(error);

        }
    }



    const AddAdress = async () => {

        try {
            const id = await GetUser()
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/newaddress`, { userid: id, NewAddress: NewAddress })
            handleCancel()
            //GetAddress()
            message.success('Address added successfully')

        } catch (error) {
            console.log(error);

        }
    }

    const GetAddress = async () => {

        try {
            const id = await GetUser()
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/getalladdress/${id}`)
            setallAdrs(res.data["data"])
        } catch (error) {
            console.log(error);

        }
    }

    const UpdateInit = (adrs: any) => {
        console.log(adrs);
        setSelectedadrs([{
            _id:adrs._id,
            name: adrs.name || "",
            address: adrs.address || "",
            city: adrs.city || "",
            state: adrs.state || "",
            country: adrs.country || "",
            pin: adrs.pin || "",
            phone: adrs.phone || ""
        }]);
    }
    
    const UpdatePet = async () => {

        try {
            const id = await GetUser()
            const upid = selectedaddress[0]._id;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/updateaddress`, { userid: id, upid: upid, newAddress: selectedaddress })
            handleeditCancel()
            GetAddress()
            message.success("Address updated successfully")
            // setName("")
            // setDOB("")
            // setBreed("")
        } catch (error) {
            console.log(error);

        }
    }
    

    useEffect(() => {
        GetAddress()
    }, [])

    const SelectAddress = (id: string) => {
        setselectedbg({ ...selectedbg, adrsid: id });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewAddresss(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedadrs(prevState => prevState.map((address, index) => index === 0 ? { ...address, [name]: value } : address));
    };

    

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
        AddAdress()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setNewAddresss({
            name: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pin: "",
            phone: ""
        });
    };

    return (
        <div>
            <div className='flex  w-full items-center justify-evenly'>
                <h2 className='text-2xl'>Address</h2>
                <button onClick={showModal} className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300">
                    Add New
                </button>
            </div>
            <div className='flex mt-7 items-center justify-center w-full  md:mb-20'>
                <div className="grid grid-cols-1 gap-5 pl-4 pr-4 pt-4 pb-4 items-center " >

                    {Alladdress?.length > 0 && Alladdress.map((adrs) => (
                        <div key={adrs._id} className={`flex ${selectedbg.adrsid == adrs._id ? 'bg-violet-400 font-white' : 'bg-red-400 text-black'} p-5 md:w-100 justify-between sm:w-full hover:cursor-pointer rounded-sm`}
                            onClick={() => SelectAddress(adrs._id)}>
                            <div className='mr-12 ' >
                                <p>{adrs.name}<br />{adrs.address}<br />{adrs.phone}</p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button onClick={(e) => { e.stopPropagation(); UpdateInit(adrs); showeditModal(); }} className="bg-gray-200 text-black p-1 px-3">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Add new Address */}

            <Modal title="Add New Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Input placeholder="Name" name='name' value={NewAddress.name} onChange={handleChange} size='large' className='mb-5' />
                <Input placeholder="Address" maxLength={25} name='address' value={NewAddress.address} onChange={handleChange} size='large' className='mb-5' />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <Input placeholder="City" name='city' value={NewAddress.city} onChange={handleChange} size='large' />
                    <Input placeholder="State" name='state' value={NewAddress.state} onChange={handleChange} size='large' />
                    <Input placeholder="Country" name='country' value={NewAddress.country} onChange={handleChange} size='large' />
                    <Input placeholder="Pincode" name='pin' value={NewAddress.pin} onChange={handleChange} size='large' />
                    <Input placeholder="Phone Number" name='phone' value={NewAddress.phone} onChange={handleChange} size='large' />
                </div>
            </Modal >

            {/* Edit Address */}

            <Modal title="Edit Address" open={iseditModalOpen} onOk={handleOk} onCancel={handleeditCancel}>
                        <Input placeholder="Name" size='large' name='name' value={selectedaddress[0]?.name}  onChange={handleUpdateChange} className='mb-5' />
                        <Input placeholder="Address" size='large' name='address' value={selectedaddress[0]?.address}  onChange={handleUpdateChange} className='mb-5' />

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                            <Input placeholder="City" size='large' name='city' value={selectedaddress[0]?.city}  onChange={handleUpdateChange} />
                            <Input placeholder="State" size='large' name='state' value={selectedaddress[0]?.state}  onChange={handleUpdateChange} />
                            <Input placeholder="Country" size='large' name='country' value={selectedaddress[0]?.country}  onChange={handleUpdateChange} />
                            <Input placeholder="Pincode" size='large' name='pin' value={selectedaddress[0]?.pin}  onChange={handleUpdateChange} />
                            <Input placeholder="Phone Number " size='large' name='phone' value={selectedaddress[0]?.phone}   onChange={handleUpdateChange} />
                        </div>

            </Modal >


        </div >
    )
}

export default AddressStep