import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Breeds from "@/models/breedsModel"


ConnectDB()

export async function GET(request: NextRequest) {

    try {
        const data = await Breeds.find({})
        return NextResponse.json({
            message: 'Success',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        
    }

}