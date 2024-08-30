import { Router } from "express";
import { changePassword, forgetPassword, login, logout, register, resetPassword } from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";
import isLoggedIn from "../middlewares/isLoggesIn.js";

const userRouter = Router()

userRouter.route('/register').post(upload.single('avatar'),register)
userRouter.route('/login').post(login)
userRouter.route('/logout').get(isLoggedIn,logout)
userRouter.route('/change-password').post(isLoggedIn,changePassword)
userRouter.route('/forgot-password').post(forgetPassword)
userRouter.route('/reset-password/:_id/:newJwt').post(resetPassword);

export default userRouter