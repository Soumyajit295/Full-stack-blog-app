import { response } from "express"
import Blog from "../models/blog.model.js"
import User from "../models/users.model.js"
import uploadToCloudinary from "../utils/cloudinary.js"

export const createNewBlog = async(req,res)=>{
    const {title,description,blogContent} = req.body
    const user = req.user
    
    if(!title || !description || !blogContent){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    if(!user){
        return res.status(400).json({
            success : false,
            message : "Unauthorized access,please login"
        })
    }

    try{
        const thumbnailLocalPath = req.file?.path
        let cloudUrl = ''
        if(thumbnailLocalPath){
            const cloudinaryResponse = await uploadToCloudinary(thumbnailLocalPath)
            cloudUrl = cloudinaryResponse?.secure_url || ''
        }
        const blog = await Blog.create({
            title,
            description,
            blogContent,
            thumbnail : cloudUrl,
            author : {
                username : user.name,
                useremail : user.email
            }
        })
        if(!blog){
            return res.status(400).json({
                success : false,
                message : "Failed to create blog"
            })
        }
        return res.status(200).json({
            success : true,
            data : blog,
            message : "Blog created successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        
        if (!blogs || blogs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No blogs found"
            });
        }
        
        return res.status(200).json({
            success: true,
            data: blogs,
            message: "Blogs fetched successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get the blogs"
        });
    }
};

export const getASingleBlog = async(req,res)=>{
    try{
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.status(400).json({
                success : false,
                message : "Failed to get the blog"
            })
        }
        return res.status(200).json({
            success : true,
            data : blog,
            message : "Successfully get the blog"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}


export const getUserBlogs = async(req,res)=>{
    const {id} = req.params

    try{
        const existedAuthor = await User.findById(id)
        if(!existedAuthor){
            return res.status(400).json({
                success : false,
                message : "Author doesn't exists"
            })
        }
        const authorBlogs = await Blog.find({"author.username" : existedAuthor.name})
        if(!authorBlogs || authorBlogs.length < 1){
            return res.status(400).json({
                success : false,
                message : "Author has no blogs"
            })
        }
        return res.status(200).json({
            success : true,
            data : authorBlogs,
            message : "Blogs fetched successdully"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export const updateBlogThumbnail = async (req, res) => {
    const thumbnailLocalPath = req.file?.path;
    console.log("Thumbail local path : ",thumbnailLocalPath)
    const { blogId } = req.params

    if (!thumbnailLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Thumbnail is required"
        });
    }

    try {
        const cloudinaryResponse = await uploadToCloudinary(thumbnailLocalPath);
        console.log("Response from cloudinary : ",cloudinaryResponse)

        if (!cloudinaryResponse) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload the image to Cloudinary"
            });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $set: {
                    thumbnail : cloudinaryResponse?.secure_url
                }
            },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedBlog,
            message: "Thumbnail updated successfully"
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

export const updateBlog = async(req,res)=>{
    const {title,description,blogContent} = req.body
    const {blogId} = req.params

    if(!title && !description && !blogContent){
        return res.status(400).json({
            success : false,
            message : "At least update any field"
        })
    }

    try{
        let updatedFields = {}

        if(title) updatedFields.title = title
        if(description) updatedFields.description = description
        if(blogContent) updatedFields.blogContent = blogContent

        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {$set : updatedFields},
            {new : true}
        )
        if(!blog){
            return res.status(400).json({
                success : false,
                message : "Failed to update the blog"
            })
        }
        return res.status(200).json({
            success : true,
            data : blog,
            message : "Blog updated successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export const deleteBlog = async(req,res)=>{
    const {blogId} = req.params

    try{
        const blog = await Blog.findByIdAndDelete(blogId)
        if(!blog){
            return res.status(400).json({
                success : false,
                message : "Blog not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Blog deleted"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}