import React from 'react'

type Props = {}

const NewsLetter = (props: Props) => {
    return (
        <div className='bg-yellow-400 p-10 flex'>

            <div className='mr-20'>

                <h2 className='text-2xl text-black font-bold'>Stay Connected</h2>
                <p className='text-gray-800'>Subscribe to our newsletter to receive exclusive updates and promotions.</p>

            </div>

            <div>
                <input type='text' placeholder='Your Email Address' className='border-0 bg-black px-5 py-3 mr-5 rounded-md text-white focus:outline-none' />
                <button className='bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800 hover:text-white'>Subscribe</button>
            </div>

        </div>
    )
}

export default NewsLetter