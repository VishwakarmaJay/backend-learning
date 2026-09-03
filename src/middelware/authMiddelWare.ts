import jwt from "jsonwebtoken";
import {env} from "../config/env";
import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const authMiddelWare = async (req : Request, res : Response, next : NextFunction) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }


    if(!token){
        return res.status(401).json({ message: "Unauthorized 2" });
    }

    try{
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };
        const user = await User.findByPk(decoded.id);
        if(!user){
            return res.status(401).json({ message: "Unauthorized 3" });
        }
        req.user = user;
    }catch(err :any){
        return res.status(401).json({ message: err.message });
    }

    next();

}