import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name is required"],
        maxLength : [30,"Maxlength of the name should be 30 character"],
        trim : true,
        unique : true
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

userSchema.methods.genarateJwt = function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : '30d'
        }
    )
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.checkPassword = async function(textPassword){
    return await bcrypt.compare(textPassword,this.password)
}

const User = mongoose.model("User",userSchema)

export default User