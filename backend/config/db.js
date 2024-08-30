import mongoose from "mongoose";

export const connectToDb = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((con)=>{
        console.log(`Database connected : ${con.connection.host}`)
    })
    .catch((err)=>{
        console.log(`Database connection failed : ${err.message}`)
    })
}