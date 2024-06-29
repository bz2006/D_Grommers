"use client"
import Footer from '@/app/Components/Footer'
import Header from '@/app/Components/Header'
import MypetsCard from '@/app/Components/MypetsCard'
import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import ImageUpload from './imagup';
import TextField from '@/app/Components/Textfield';
import SearchDropdown from '@/app/Components/SearchDropdown';

type Props = {}

const MyPets = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [DOB, setDOB] = useState("");
    const [breed, setBreed] = useState("");

    const Setname = (value: string) => {
        setName(value)
    }

    const SetDOB = (value: string) => {
        setDOB(value)
    }

    const SetBreed = (value: string) => {
        setBreed(value)
    }

    const HandleUpdate =  () => {
        console.log('updated');


    }

    return (
        <>
            <Header />
            <Button type="primary" onClick={() => { setIsModalOpen(true) }}>
                Open Modal
            </Button>
            <Modal title="Add Your Pet" open={isModalOpen} width={400} onCancel={() => { setIsModalOpen(false) }}>
                <div className='mt-2'>
                    <ImageUpload />
                </div>

                <div className='flex items-center justify-evenly flex-col mt-7'>
                    <TextField
                        label='Name'
                        placeholder='Name'
                        value={name}
                        onChange={Setname}
                    />
                    <TextField
                        label='DOB'
                        placeholder='Date of Birth'
                        value={DOB}
                        onChange={SetDOB}
                    />
                    <TextField
                        label='Breed'
                        placeholder='Golden Retriver'
                        value={breed}
                        onChange={SetBreed}
                    />
                </div>
            </Modal>
            <div className="grid grid-cols-1 gap-8 p-10  sm:grid-cols-2 lg:grid-cols-4">
                <MypetsCard
                    key='1'
                    petname='Bingo'
                    onClick={HandleUpdate}
                />
            </div>
            <Footer />
        </>
    )
}

export default MyPets