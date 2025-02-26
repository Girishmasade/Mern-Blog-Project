import {Router} from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.js'
import { authanticate } from '../middelware/authanticate.js'

const userRoute = Router()

userRoute.use(authanticate)
userRoute.get('/profile/:userid', getUser)
userRoute.put('/update-user/:userid', upload.single('file') , updateUser)
userRoute.get('/get-all-user', getAllUser)
userRoute.delete('/delete/:id', deleteUser)

export default userRoute