import React from 'react'

type Props = {}

const ConfirmHeader = (props: Props) => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://static-vision.s3.ap-south-1.amazonaws.com/d_grommers.png"
            alt="D_Groomer"
            className="h-8 w-auto"
          />
        </div>
        <div>
          <button className="bg-transparent text-black px-4 py-2 rounded-md " >
            Exit
          </button>
        </div>
      </div>
    </header>
  )
}

export default ConfirmHeader