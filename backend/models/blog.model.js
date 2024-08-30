import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,"Title is required"],
        trim : true
    },
    description : {
        type : String,
        required : [true,"Description is required"]
    },
    thumbnail: {
        type : String
    },
    author : {
        username : {
            type : String
        },
        useremail : {
            type : String
        }
    },
    blogContent : {
        type : String,
        required : [true,"Content is required"]
    }
},{
    timestamps : true
})

const Blog = mongoose.model("Blog",blogSchema)

export default Blog