import React from 'react'
import Image from "next/image";
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import axios from 'axios';
import SBRenderer from './renderer';

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

const GetBreed = async (id: string) => {

  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/breeds/getsinglebreed/${id}`)
    return res.data['data']

  } catch (error) {
    console.log(error);

  }

}

const SingleBreed = async (params: Props) => {

  const id = params.params.id
  let loaded = false
  let breed
  if (loaded === false) {
    breed = await GetBreed(id)
    if (breed) {
      loaded = true
    }
  }

  return (
    <>
      <Header />

      {/* <Image src={"https://static-vision.s3.ap-south-1.amazonaws.com/Firefly+20240620103708.png"}
        width={500}
        height={200}
        className="w-full h-auto"
        alt="Banner" /> */}
      <section className="bg-gray-900 py-12">
        <SBRenderer
          breeds={breed}
        />
      </section>
      <Footer />
    </>
  )
}

export default SingleBreed