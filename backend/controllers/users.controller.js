import User from "../models/users.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = {
    httpOnly: true,
    secure: false,
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const existedUsername = await User.findOne({name})

    if(existedUsername){
        return res.status(400).json({
            success : false,
            message : "Username already taken"
        })
    }

    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({
            success: false,
            message: "User is already registered, please login"
        });
    }

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Avatar is required"
            });
        }

        const avatarLocalPath = req.file.path;
        const avatar = await uploadToCloudinary(avatarLocalPath);

        if (!avatar) {
            return res.status(500).json({
                success: false,
                message: "Error uploading the avatar, please try again"
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            avatar: avatar.secure_url,
        });

        const createdUser = await User.findById(newUser._id).select("-password");

        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "Registration failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: createdUser,
            message: "User registered successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not registered"
            });
        }

        const check = await user.checkPassword(password);

        if (!check) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            });
        }

        const jwtToken = user.genarateJwt();

        if (!jwtToken) {
            return res.status(500).json({
                success: false,
                message: "Error generating token, please try again"
            });
        }

        const currentUser = await User.findById(user._id).select("-password")

        return res.status(200).cookie('jwtToken', jwtToken, cookieOptions).json({
            success: true,
            data : currentUser,
            message: "User logged in successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const logout = async(req,res)=>{
    const user = req.user
    if(!user){
        return res.status(400).json({
            success : false,
            message : "Unauthorized access"
        })
    }
    return res.status(200).clearCookie('jwtToken',cookieOptions).json({
        success : true,
        message : "User logout successfully"
    })
}

export const changePassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = req.user

    if(!user){
        return res.status(400).json({
            success : false,
            message : "Please login"
        })
    }

    if(!oldPassword || !newPassword){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    if(oldPassword===newPassword){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    try{
        const checkOldPassword = await user.checkPassword(oldPassword)
        if(!checkOldPassword){
            return res.status(400).json({
                success : false,
                message : "Wrong Old password"
            })
        }
        user.password = newPassword
        await user.save()
        return res.status(200).json({
            success : true,
            message : "Password changed successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export const forgetPassword = async(req,res)=>{
    const {email} = req.body
    console.log("email : ",email)
    if(!email){
        return res.status(400).json({
            success : false,
            message : "Enter registered email"
        })
    }
    const existedUser = await User.findOne({email})
    if(!existedUser){
        return res.status(400).json({
            success : false,
            message : "Email is not registered"
        })
    }

    try{
        const newJwt = jwt.sign(
            {_id : existedUser._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : '1h'}
        )
        if(!newJwt){
            return res.status(500).json({
                success : false,
                message : "Token is created"
            })
        }
        const message = `http://localhost:5173/reset-password/${existedUser._id}/${newJwt}`
        sendEmail(email,"Reset password by below link - Link will expires within 1 hour",message)
        return res.status(200).json({
            success : true,
            message : "Reset link sent to your email address"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export const resetPassword = async (req, res) => {
    console.log(req.params)
    const { _id, newJwt } = req.params;
    const { password, confirmPassword } = req.body;

    console.log("Id : ",_id)
    console.log("JWT : ",newJwt)
    console.log("Password : ",password)
    console.log("Confirm password : ",confirmPassword)

    if (!password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password should match"
        });
    }

    try {
        const verifyToken = jwt.verify(newJwt, process.env.ACCESS_TOKEN_SECRET);
        if (!verifyToken) {
            return res.status(400).json({
                success: false,
                message: "Token not verified"
            });
        }
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        user.password = password;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

  