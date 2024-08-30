import cloudinary from 'cloudinary'
import fs from 'fs'

const uploadToCloudinary = async(localFilePath)=>{
    if(!localFilePath) return null

    try{
        const result = await cloudinary.v2.uploader.upload(localFilePath)
        if(result){
            fs.unlinkSync(localFilePath)
            return result
        }
    }
    catch(err){
        console.log("Error in cloudinary : ",err.message)
        return null
    }
}

export default uploadToCloudinary