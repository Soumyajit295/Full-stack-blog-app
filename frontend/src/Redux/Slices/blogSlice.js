import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    blogId : JSON.parse(localStorage.getItem('blogId')) || '',
    blogs : [],
    singleBlog : {}
}

export const crateNewBlogPost = createAsyncThunk('/blog/create',async(data,{rejectWithValue})=>{
    try{
        const promise = axios.post('/api/v1/blogs/create-blog',data)
        toast.promise(promise,{
            loading : "Publishing your blog",
            success : (response)=>response?.data?.message || "Blog published",
            error : (err)=>err?.response?.data?.message || "Failed to publish"
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const getAllBlogs = createAsyncThunk('/blog/getblogs',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.get('/api/v1/blogs/all-blogs')
        toast.promise(promise,{
            loading : "Fetching blogs",
            success : (response)=>response?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const fetchSingleBlog = createAsyncThunk('/blog/singleblog',async(blogId,{rejectWithValue})=>{
    try{
        const promise = await axios.get(`/api/v1/blogs/getblog/${blogId}`)
        return promise.data
    }
    catch{
        return rejectWithValue(err.message)
    }
})

export const deleteBlog = createAsyncThunk('/blog/deleteblog',async(blogId,{rejectWithValue})=>{
    try{
        const promise = axios.get(`/api/v1/blogs/delete-blog/${blogId}`)
        toast.promise(promise,{
            loading : "Deleteing blog",
            success : (res)=>res?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const updateBlog = createAsyncThunk('/blog/updateblog',async({blogId,data},{rejectWithValue})=>{
    try{
        const promise = axios.post(`/api/v1/blogs/update-blog/${blogId}`,data)
        toast.promise(promise,{
            loading : "Updating your blog",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const updateThumbnail = createAsyncThunk('/blog/updatethumbnail', async ({ blogId, thumbnail }, { rejectWithValue }) => {
    try {
        console.log('Updating thumbnail with:', thumbnail);
        const promise = axios.post(`/api/v1/blogs/update-thumbnail/${blogId}`, thumbnail);
        toast.promise(promise, {
            loading: "Updating thumbnail",
            success: (res) => res?.data?.message,
            error: (err) => err?.response?.data?.message
        });
        return (await promise).data;
    } catch (err) {
        console.error('Error updating thumbnail:', err);
        return rejectWithValue(err.message);
    }
});


export const getmyBlogs = createAsyncThunk('/blogs/myBlogs',async(id,{rejectWithValue})=>{
    try{
        const promise = axios.get(`/api/v1/blogs/get-blogs/${id}`)
        toast.promise(promise,{
            loading : "Fetching user blogs",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

const blogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.blogs = action?.payload?.data
        })
        builder.addCase(fetchSingleBlog.fulfilled,(state,action)=>{
            state.singleBlog = action?.payload?.data
        })
        builder.addCase(deleteBlog.fulfilled,(state,action)=>{
            state.singleBlog = {}
        })
        builder.addCase(updateThumbnail.fulfilled, (state, action) => {
            state.singleBlog = {
                ...state.singleBlog,
                thumbnail: action?.payload?.data?.thumbnail
            };
        });
        builder.addCase(getmyBlogs.fulfilled,(state,action)=>{
            state.blogs = action?.payload?.data
        })
        
    }
})

export default blogSlice.reducer