import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/users.routes.js'
import blogRouter from './routes/blogs.routes.js'

dotenv.config({
    path : '.env'
})


const app = express()

app.use(express.json({limit : '50mb'}))
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended : true,limit : '50mb'}))

app.use('/api/v1/users',userRouter)
app.use('/api/v1/blogs',blogRouter)

export default app