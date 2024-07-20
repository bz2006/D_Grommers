import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import GroomingSlots from "@/models/groomingslotsModel";



ConnectDB()

export async function PUT(request: NextRequest) {

    const reqBody = await request.json()
    const { locid, slotid, NewSlots } = reqBody;
    console.log(locid, slotid, NewSlots);


    try {

        // Find the document by location id
        const groomingSlots = await GroomingSlots.findById( locid );

        if (groomingSlots) {

            const monthlySlot = groomingSlots.monthlyslots.findById(locid);
            console.log("monthllyy", groomingSlots);
            if (monthlySlot) {


                const slot = monthlySlot.slots.id(slotid);

                if (slot) {
                    console.log("sloooot", slot)
                    Object.assign(slot, NewSlots);

                    // Save the updated document
                    await groomingSlots.save();

                    return NextResponse.json({
                        message: 'Updated slot',
                        status: 200,
                    })

                } else {
                    return NextResponse.json({
                        message: 'slot not found',
                        status: 404,
                    })
                }

            } else {
                return NextResponse.json({
                    message: 'Monthly slot not found',
                    status: 404,
                })
            }


        } else {
            return NextResponse.json({
                message: 'Grooming slots not found',
                status: 404,
            })
        }

        // Find the MonthlySlotSchema entry to update



    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
        })
    }
}