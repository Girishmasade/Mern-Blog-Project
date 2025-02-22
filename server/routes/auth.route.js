import {Router} from 'express'
import { GoogleLogin, Login, Logout, Register } from '../controllers/auth.controller.js'

const authRoute = Router()

authRoute.post('/register', Register)
authRoute.post('/login', Login)
authRoute.post('/google-login', GoogleLogin)
authRoute.get('/logout', Logout)

export default authRoute