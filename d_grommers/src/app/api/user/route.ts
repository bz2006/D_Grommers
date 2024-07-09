import { ConnectDB } from "@/config/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usersModel";



ConnectDB()
export async function PUT(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { userid, upid, newAddress } = reqBody;
        const id = { upid };
        
        
        const userdata = await User.findById(userid)
        
        if(userdata){

            const AddressIndex = userdata.addresses.findIndex(
                (pet: { _id: any }) => pet._id.toString() === String(id.upid) // Ensure pet._id is treated as a string
            );
              if (AddressIndex === -1) {
                return NextResponse.json({
                    message: 'Invalid pet details ID',
                    status: 404,
                })
              }
          
          console.log(AddressIndex,newAddress,id,upid);
          
              const updatedUser = await User.updateOne(
                { _id: userid, "addresses._id": Object(upid) },
                { $set: { "addresses.$": newAddress } }
              );
          

              if (updatedUser.modifiedCount === 0) {
                return NextResponse.json({
                    message: 'address not found',
                    status: 404,
                })
              }else{
                return NextResponse.json({
                    message: 'Success',
                    status: 200
                })
              }

            
        }else{
            return NextResponse.json({
                message: 'false',
                status: 404,
            })
        }
        

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
        });

    }

}