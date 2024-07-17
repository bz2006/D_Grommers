"use client"
import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import BreedsCard from '../Components/BreedsCard';
import axios from 'axios';
import Navigator from "@/app/Components/DivNav" // Assuming Navigator component is imported

type Breed = {
  _id: string;
  breedname: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const BreedsPage = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/breeds/getallbreeds`);
        setBreeds(res.data["data"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBreeds();
  }, []);


  return (
    <>
      <Header />
      <div className="p-10 flex flex-wrap items-center justify-center">
        {breeds.map((breed: Breed) => (
          <div key={breed._id}>
            <Navigator path={`/breeds/${breed._id}`}>
              <BreedsCard
                range="Starting from"
                name={breed.breedname}
                price="₹45.00"
                imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png"
                bgColor="bg-violet-500"
                priceColor="text-teal-500"
              />
            </Navigator>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BreedsPage;
