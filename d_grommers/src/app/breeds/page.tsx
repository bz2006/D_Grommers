"use client"
import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import BreedsCard from '../Components/BreedsCard';
import axios from 'axios';
import Navigator from "@/app/Components/DivNav" // Assuming Navigator component is imported
import SkeletonCard from './Skeleton';

type Breed = {
  _id: string;
  breedname: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const BreedsPage = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/breeds/getallbreeds`);
        setBreeds(res.data["data"]);
    setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchBreeds();
  }, []);
  console.log(breeds)

  return (
    <>
      <div
        className="bg-cover bg-repeat bg-center sm:bg-[url('/wave-1-md.svg')] bg-[url('/wave-1-sm.svg')]"
      >
        <Header bgcolor={"bg-white"} />
        
        <div className="p-3 md:mt-10 flex flex-wrap items-center justify-center">
          {Loading === true ? (
            <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            </>
          ) : (null)}

          {breeds.map((breed: Breed) => (
            <div key={breed._id}>
              <Navigator path={`/breeds/${breed._id}`}>
                <BreedsCard
                  range="Starting from"
                  name={breed.breedname}
                  breed={breed}
                  imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png"
                  bgColor="bg-white"
                  priceColor="text-violet-600"
                />
              </Navigator>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>

  );
};

export default BreedsPage;
