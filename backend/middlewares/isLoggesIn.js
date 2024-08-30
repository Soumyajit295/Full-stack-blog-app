import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'

const isLoggedIn = async(req,res,next)=>{
    const {jwtToken} = req.cookies
    if(!jwtToken){
        return res.status(400).json({
            success : false,
            message : "Unautorized access - No token provided"
        })
    }
    try {
        const decodedJwt = await jwt.verify(jwtToken,process.env.ACCESS_TOKEN_SECRET)
        if(!decodedJwt){
            return res.status(400).json({
                success : false,
                message : "Unautorized access - Token is not verified"
            })
        }
        const user = await User.findById(decodedJwt?._id)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - user not found"
            });
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : "Unautorized access - some internal error"
        })
    }
}

export default isLoggedIn