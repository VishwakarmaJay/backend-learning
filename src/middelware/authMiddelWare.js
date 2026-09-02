import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {env} from "../config/env.js";

export const authMiddelWare = async (req, res, next) => {

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
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if(!user){
            return res.status(401).json({ message: "Unauthorized 3" });
        }
        req.user = user;
    }catch(err){
        return res.status(401).json({ message: err.message });
    }

    next();

}