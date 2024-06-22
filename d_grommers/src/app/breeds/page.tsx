import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import BreedsCard from '../Components/BreedsCard'

type Props = {}

const BreedsPage = (props: Props) => {
  return (
    <>
    <Header/>
    <div className="p-10 flex flex-wrap items-center justify-center">
    <BreedsCard
     range="Starting from" 
     name="Beagle" 
     price="$45.00" 
     imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
     bgColor="bg-violet-500" 
     priceColor="text-teal-500"
    />

<BreedsCard
     range="Starting from" 
     name="Golden Retriver" 
     price="$45.00" 
     imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
     bgColor="bg-teal-500" 
     priceColor="text-teal-500"
    /><BreedsCard
    range="Starting from" 
    name="Monstera" 
    price="$45.00" 
    imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
    bgColor="bg-teal-500" 
    priceColor="text-teal-500"
   /><BreedsCard
   range="Outdoor" 
   name="Monstera" 
   price="$45.00" 
   imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
   bgColor="bg-teal-500" 
   priceColor="text-teal-500"
  /><BreedsCard
  range="Starting from" 
  name="Monstera" 
  price="$45.00" 
  imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
  bgColor="bg-teal-500" 
  priceColor="text-teal-500"
 /><BreedsCard
 range="Starting from" 
 name="Monstera" 
 price="$45.00" 
 imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
 bgColor="bg-teal-500" 
 priceColor="text-teal-500"
/><BreedsCard
     range="Starting from" 
     name="Monstera" 
     price="$45.00" 
     imgSrc="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" 
     bgColor="bg-teal-500" 
     priceColor="text-teal-500"
    />
    </div>
    
    <Footer/>
    </>
  )
}

export default BreedsPage