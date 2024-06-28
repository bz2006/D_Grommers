import Image from 'next/image';
import React from 'react'

type Props = {
    key: string;
    petname: string;
}

const MypetsCard: React.FC<Props> = ({ petname }) => {
    return (


        <div className="bg-violet-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 cursor-pointer">
            <div className="mb-8 flex justify-center flex-col items-center">
                <div className="mb-8 flex justify-center items-center">
                    <div style={{backgroundColor: "red" }}>
                        <Image
                            src={"https://img.freepik.com/premium-photo/golden-retriever-puppy-sits-black-background_259177-102.jpg"}
                            alt=''
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <h1 className='text-3xl font-bold'>{petname}</h1>
                </div>
            </div>
        </div>
    )
}

export default MypetsCard