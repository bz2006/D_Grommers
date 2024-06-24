import mongoose from "mongoose"
import dotenv from "dotenv"


export async function ConnectDB() {

    dotenv.config()

    try {

        mongoose.connect(process.env.MONGO_URL!)
        const con=mongoose.connection
        con.on('connected',()=>{
            console.log("DataBase Connected")
        })

    } catch (error) {
        console.log(error);

    }

}