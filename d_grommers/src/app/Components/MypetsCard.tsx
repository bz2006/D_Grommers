import Image from 'next/image';
import React from 'react'

type Props = {
    key: string;
    petname: string;
    onClick:() => void;
}

const MypetsCard: React.FC<Props> = ({ petname,onClick }) => {
    return (


        <div onClick={onClick} className="bg-violet-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 cursor-pointer">
            <div className=" flex justify-center flex-col items-center">
                <div className="mb-5 flex justify-center items-center">
                    <div >
                        <Image
                            src={"https://www.odysseyhouse.com.au/wordpress/wp-content/uploads/2018/02/golden-retriever-SQUARE@.jpg"}
                            alt=''
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col mb-0'>
                    <h1 className='text-2xl font-bold'>{petname}</h1>
                    <h4>Golden Retriver </h4>
                </div>
            </div>
        </div>
    )
}

export default MypetsCard