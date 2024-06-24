import { NextResponse } from "next/server";


export async function GET() {

    try {

        const response = NextResponse.json({
            message:"Log Out Successfull",
            success:true
        })
        response.cookies.set("_grt5634","",{
            httpOnly:true,
            expires:new Date(0)
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
