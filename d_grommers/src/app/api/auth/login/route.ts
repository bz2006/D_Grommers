import { ConnectDB } from "@/config/dbconfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import JWT from "jsonwebtoken"


ConnectDB()
dotenv.config()

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email: email })

        if (!user) {
            return NextResponse.json(
                {
                    error: 'user does not exist'
                }, { status: 400 }
            )
        }


        const validatePassword = await bcrypt.compare(password, user.password)



        if (!validatePassword) {
            return NextResponse.json(
                {
                    error: 'wrong password'
                }, { status: 400 }
            )
        }
        // type tokenData={
        //     id:string,
        //     username: string,
        //     email: string,
        // }
         const tokenData = {
            id: User._id,
            username: User.username,
            email: User.email,

        }

        const Token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" })

        const response = NextResponse.json({
            message: "Log in successfull",

        }, { status: 200 })

        response.cookies.set("_grt5634", Token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        console.log(Error);
        return NextResponse.json({
            error
        },
            { status: 500 })

    }

}
