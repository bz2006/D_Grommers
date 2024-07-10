import React from 'react'

type Props = {
  key: string;
  packagename: string;
  packagedescription: string;
  charge: number;
  services: string[];
  keyProp: string;
  onClick: (key: string) => void;
}

const GPackages: React.FC<Props> = ({ packagename, packagedescription, charge, services,onClick,keyProp }) => {
  return (


    <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white">{packagename}</h3>
        <p className="mt-4 text-gray-400">{packagedescription}</p>
      </div>
      <div className="mb-8">
        <span className="text-5xl font-extrabold text-white">₹{charge}</span>
      </div>
      <ul className="mb-8 space-y-4 text-gray-400">
        {services.length > 0 && services.map((srv,index) => (
          <li className="flex items-center" key={index}>
            <svg
              className="h-6 w-6 text-green-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{srv}</span>
          </li>
        ))}

      </ul>
      <a
        href="/confirm-booking"
        onClick={()=>onClick(keyProp)}
        className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
      >
        Book Now
      </a>
    </div>

  )
}

export default GPackages