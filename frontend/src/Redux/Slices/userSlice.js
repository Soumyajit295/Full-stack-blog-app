import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    userData : JSON.parse(localStorage.getItem('userData')) || {},
    isLoggedin : JSON.parse(localStorage.getItem('isLoggedin')) || false
}

export const registerUser = createAsyncThunk('/user/register',async(data,{rejectWithValue})=>{
    try{
        const promise = axios.post('api/v1/users/register',data)
        toast.promise(promise,{
            loading : "Creating account",
            success : (response)=>response?.data?.message || "Successfully registered",
            error : (err)=>err?.response?.data?.message || "Failed to register"
        })
        const response = (await promise).data
        return response
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const loginUser = createAsyncThunk('/user/login',async(data,{rejectWithValue})=>{
    try{
        const promise = axios.post('api/v1/users/login',data)
        toast.promise(promise,{
            loading : "Wait a minute",
            success : (response)=>response?.data?.message || "Logged in",
            error : (err)=>err.response?.data?.message || "Failed to login"
        })
        const response = (await promise).data
        return response
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const logoutUser = createAsyncThunk('/user/logout',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.get('api/v1/users/logout')
        toast.promise(promise,{
            loading : "Logging out",
            success : (response)=>response?.data?.message || 'Logged out',
            error : (err)=>err?.response?.data?.message || "Failed to logout"
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const forgetPassword = createAsyncThunk('/user/forgot-password',async(email,{rejectWithValue})=>{
    try{
        const promise = axios.post('api/v1/users/forgot-password',email)
        toast.promise(promise,{
            loading : "sending",
            success : (response)=>response?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const resetPassword = createAsyncThunk('/user/reset-password', async ({ password, confirmPassword, _id, newJwt }, { rejectWithValue }) => {
    try {
        console.log("Password : ", password);
        const promise = axios.post(`/api/v1/users/reset-password/${_id}/${newJwt}`, { password, confirmPassword });

        toast.promise(promise, {
            loading: "Resetting password",
            success: (res) => {
                console.log("Success response:", res);
                return res?.data?.message || "Success";
            },
            error: (err) => {
                console.log("Error response:", err);
                return err?.response?.data?.message || "Failed";
            }
        });

        return (await promise).data;
    } catch (err) {
        console.error("Catch block error:", err);
        return rejectWithValue(err.message);
    }
});


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            localStorage.setItem('userData',JSON.stringify(action?.payload?.data))
            localStorage.setItem('isLoggedin',JSON.stringify(true))
            state.userData = action?.payload?.data
            state.isLoggedin = true
        })
        builder.addCase(logoutUser.fulfilled,(state,action)=>{
            localStorage.clear()
            state.userData = {}
            state.isLoggedin = false
        })
    }
})

export default userSlice.reducer