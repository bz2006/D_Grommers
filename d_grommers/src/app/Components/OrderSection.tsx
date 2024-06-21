import React from 'react'

type Props = {}

const OrderSection = (props: Props) => {
    return (

        <div className="w-196 h-48 bg-white p-4">
            <div className="flex justify-between items-start h-full ">
                <div className="flex space-x-4">
                    <div className="flex flex-col">
                        <span style={{ color: "black" }} className="text-left">First Text</span>
                        <span style={{ color: "black" }} className="text-left">Second Text</span>
                    </div>
                    <div className="flex flex-col md:pl-8">
                        <span style={{ color: "black" }} className="text-left">First Text</span>
                        <span style={{ color: "black" }} className="text-left">Second Text</span>
                    </div>
                    <div className="flex flex-col md:pl-8">
                        <span style={{ color: "black" }} className="text-left">First Text</span>
                        <span style={{ color: "black" }} className="text-left">Second Text</span>
                    </div>
                </div>
                <div className="flex space-x-2 border-b border-gray-400">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">Button 1</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">Button 2</button>
                </div>
            </div>
        </div>
    )
}

export default OrderSection