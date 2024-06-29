'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import GPackages from '../../Components/GPackages';
import axios from 'axios';

type Props = {
  params: {
    id: string;
  };
}
type Breed = {
  _id: string,
  breedname: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
}

const GetBreed = async (id:string) => {

  try {
    
    const res = await axios.get(`/api/breeds/getsinglebreed/${id}`)
    return res.data['data']

  } catch (error) {
    console.log(error);

  }

}

const SingleBreed = async (params: Props) => {

  const id = params.params.id
  const breed = await GetBreed(id)
console.log(breed);


  return (
    <>
      <Header />

      {/* <Image src={"https://static-vision.s3.ap-south-1.amazonaws.com/Firefly+20240620103708.png"}
        width={500}
        height={200}
        className="w-full h-auto"
        alt="Banner" /> */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-5xl">Grooming Packages for {breed?.breedname}</h2>
            <p className="mt-4 text-xl text-gray-400">Simple, transparent charges for your furry friend.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <GPackages
              key={"1"}
              packagename='Regular'
              packagedescription='Regular Gromming'
              charge={1500}
            />
            <GPackages
              key={"1"}
              packagename='Hygine'
              packagedescription='Regular Gromming'
              charge={500}
            />
            <GPackages
              key={"1"}
              packagename='Full'
              packagedescription='Regular Gromming'
              charge={4800}
            />
            <GPackages
              key={"1"}
              packagename='Lux'
              packagedescription='Regular Gromming'
              charge={6800}
            />
          </div>
        </div>
      </section>



      <Footer />
    </>
  )
}

export default SingleBreed