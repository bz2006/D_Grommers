import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Breeds from "@/models/breedsModel"


ConnectDB()

export async function GET(request: NextRequest) {

    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        
        const data = await Breeds.findOne({ _id: id })
        return NextResponse.json({
            message: 'Success',
            data: data
        })

    } catch (error) {
        console.log(error);

    }

}