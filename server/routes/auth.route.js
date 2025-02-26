import {Router} from 'express'
import { GoogleLogin, Login, Logout, Register } from '../controllers/auth.controller.js'
import { authanticate } from '../middelware/authanticate.js'

const authRoute = Router()

authRoute.post('/register', Register)
authRoute.post('/login', Login)
authRoute.post('/google-login', GoogleLogin)
authRoute.get('/logout',authanticate, Logout)

export default authRoute