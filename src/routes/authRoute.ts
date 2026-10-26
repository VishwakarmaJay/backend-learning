import express, { Router } from 'express'
import { login, refreshToken, register } from '../controller/authController'


const authRouter : Router = express.Router()

authRouter.post('/register', register)
authRouter.post('/login',login)
authRouter.post('/refresh-token', refreshToken) 

export default authRouter