import jwt, { type SignOptions } from 'jsonwebtoken'
import {env} from "../config/env";

export const generateToken = (userId : string, res : any) =>{

    const payLoad = { id: userId }
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>,
    }
    const token: string = jwt.sign(payLoad, env.JWT_SECRET, options)

    res.cookie( "jwt", token ,{
        httpOnly : true,
        sameSite : "strict",
        maxAge : 1000 * 60 * 60 * 24 * 7
    })

    return token;

}