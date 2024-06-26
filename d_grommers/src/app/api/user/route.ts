import { ConnectDB } from "@/config/dbconfig";
import User from "@/models/usersModel";
import { GetuserTK } from "@/helpers/route";
import { NextRequest, NextResponse } from "next/server";


ConnectDB


export async function GET(request: NextRequest) {

    try {
        const userid = await GetuserTK(request)
        console.log("userid",userid);
        
        const userdata = await User.findOne({_id:userid}).select('-password -__v -addresses -bookings -createdAt -role -updatedAt');
        if(userdata){
            return NextResponse.json({
                message: 'Success',
                data: userdata
            })
        }else{
            return NextResponse.json({
                message: 'false',
                status: 404,
            })
        }
        

    } catch (error) {
        console.log(error);

    }

}