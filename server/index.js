import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { dbConfig } from './Databse/db.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import categoryRoute from './routes/category.route.js'
import blogRouter from './routes/blog.route.js'
import commentRouter from './routes/comment.route.js'
import blogLikeRouter from './routes/blogLike.route.js'

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// Route setup

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/api/blog-like', blogLikeRouter)

// Database connected in db.js file
dbConfig()

app.listen(port, () => {
    console.log('server started on port:', port);
    
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

