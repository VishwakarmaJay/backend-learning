import jwt from 'jsonwebtoken'
import {env} from "../config/env.js";


export const generateToken = (userId, res) =>{

    const payLoad= {id : userId}
    const token = jwt.sign(payLoad, env.JWT_SECRET, {
        expiresIn : env.JWT_EXPIRES_IN  
    })

    res.cookie( "jwt", token ,{
        httpOnly : true,
        sameSite : "strict",
        maxAge : 1000 * 60 * 60 * 24 * 7
    })

    return token;

}