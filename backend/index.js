import app from "./app.js";
import { connectToDb } from "./config/db.js";
import cloudinary from 'cloudinary'

const port = process.env.PORT

cloudinary.v2.config({
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY,
    cloud_name : process.env.CLOUDINARY_NAME
})

connectToDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server up at port : ${port}`)
    })
})
.catch((err)=>{
    console.log(`Error : ${err.message}`)
})