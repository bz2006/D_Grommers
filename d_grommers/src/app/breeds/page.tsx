'use client'
import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import BreedsCard from '../Components/BreedsCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Breed = {
  _id: string,
  breedname: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
}


const BreedsPage = (props: Breed) => {

  const [breeds, setBreeds] = useState<Breed[]>([])
  const router = useRouter()

  const Navigate = (id: string) => {

    router.push(`/breeds/${id}`)

  }

  const GetBreeds = async () => {

    try {
      const res = await axios.get('/api/breeds/getallbreeds')
      setBreeds(res.data["data"]);
      //setBreeds()

    } catch (error) {
      console.log(error);

    }

  }
  console.log(breeds);

  useEffect(() => {
    GetBreeds()
  }, [])
  return (
    <>
      <Header />
      <div className="p-10 flex flex-wrap items-center justify-center">
        {breeds && breeds.map((breed) => (
          <BreedsCard
            key={breed._id}
            id={breed._id}
            range="Starting from"
            name={breed.breedname}
            price="₹45.00"
            imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png"
            bgColor="bg-violet-500"
            priceColor="text-teal-500"
          />
        ))}


      </div>

      <Footer />
    </>
  )
}

export default BreedsPage