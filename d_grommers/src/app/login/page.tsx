"use client"
import { ConnectDB } from '@/config/dbconfig';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useState } from 'react'
import Navigator from '../Components/DivNav';

type Props = {}

const Login = (props: Props) => {
    const router = useRouter()
    ConnectDB()
    const [email, setemail] = useState("bz@gmail.com")
    const [password, setpassword] = useState("b")

    const HandleLogin = async () => {

        console.log(email, password);
        try {
            const res = await axios.post("api/auth/login", { email: email, password: password })
            router.push("/")

        } catch (error) {
            console.log("error", error);

        }

    }


    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            {/* Left: Image */}
            <div className="w-1/2 h-100vh  lg:block">
                <Image
                    src="https://pethelpful.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:eco%2Cw_1200%2Cx_459%2Cy_262/MjA1MDAwNjkwMDk3OTg5Mzcy/shutterstock_97912964.jpg"
                    alt="Placeholder Image"
                    width={600}
                    height={800}
                />
            </div>
            {/* Right: Login Form */}
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <div>
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full text-black border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                            onChange={(e) => { setemail(e.target.value) }}
                            value={email}
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                            onChange={(e) => { setpassword(e.target.value) }}
                            value={password}
                        />
                    </div>
                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="text-blue-500"
                        />
                        <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
                    </div>
                    {/* Forgot Password Link */}
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </div>
                    {/* Login Button */}
                    <button
                        onClick={HandleLogin}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        Login
                    </button>
                </div>
                {/* Sign up Link */}
                <div className="mt-6 text-blue-500 text-center">
                    <a href="/signup" className="hover:underline">Sign up Here</a>
                </div>
            </div>
        </div>
    );
};


export default Login

