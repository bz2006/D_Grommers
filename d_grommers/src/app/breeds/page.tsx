import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import BreedsCard from '../Components/BreedsCard'
import axios from 'axios'

type Breed = {
  _id: string,
  breedname: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
}
const GetBreeds = async () => {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/breeds/getallbreeds`)
    return res.data["data"]
    //setBreeds()

  } catch (error) {
    console.log(error);

  }

}

const BreedsPage = async () => {
  let loaded = false
  let breeds
  if (loaded === false) {
    breeds = await GetBreeds()
    loaded = true
  }
  console.log(breeds);




  return (
    <>
      <Header />
      <div className="p-10 flex flex-wrap items-center justify-center">
        {breeds && breeds.map((breed: Breed) => (
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