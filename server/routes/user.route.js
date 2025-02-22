import {Router} from 'express'
import { getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.js'

const userRoute = Router()

userRoute.get('/profile/:userid', getUser)
userRoute.put('/update-user/:userid', upload.single('file') , updateUser)

export default userRoute