import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggesIn.js";
import { createNewBlog, deleteBlog, getAllBlogs, getASingleBlog, getUserBlogs, updateBlog, updateBlogThumbnail } from "../controllers/blogs.controller.js";
import upload from "../middlewares/multer.middleware.js";

const blogRouter = Router()

blogRouter.route('/create-blog').post(isLoggedIn,upload.single('thumbnail'),createNewBlog)
blogRouter.route('/all-blogs').get(getAllBlogs)
blogRouter.route('/getblog/:blogId').get(getASingleBlog)
blogRouter.route('/get-blogs/:id').get(getUserBlogs)
blogRouter.route('/update-thumbnail/:blogId').post(isLoggedIn,upload.single('thumbnail'),updateBlogThumbnail)
blogRouter.route('/update-blog/:blogId').post(isLoggedIn,updateBlog)
blogRouter.route('/delete-blog/:blogId').get(isLoggedIn,deleteBlog)

export default blogRouter