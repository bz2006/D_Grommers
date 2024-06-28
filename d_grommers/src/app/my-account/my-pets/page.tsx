import Footer from '@/app/Components/Footer'
import Header from '@/app/Components/Header'
import MypetsCard from '@/app/Components/MypetsCard'
import React from 'react'

type Props = {}

const MyPets = (props: Props) => {
    return (
        <>
            <Header />
            <div className="grid grid-cols-1 gap-8 p-10  sm:grid-cols-2 lg:grid-cols-4">
                <MypetsCard
                    key='1'
                    petname='Bingo'
                />
            </div>
            <Footer />
        </>
    )
}

export default MyPets