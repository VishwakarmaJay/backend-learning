import express, { Router } from 'express'
import { login, register } from '../controller/authController'


const authRouter : Router = express.Router()

authRouter.post('/register', register)
authRouter.post('/login',login)

export default authRouter