import { User } from "../models/index";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import AppError from "../utils/appError";
import { sendWelcomeEmail } from "../services/email";
import { Request, Response } from "express";
import { AuthService } from "../services/authServices";
import { UserRepository } from "../repositories/userRepository";

const authService = new AuthService(new UserRepository()); 

const register = async (req : Request , res : Response) => {
  const user = await authService.register(req.body);
  const token = generateToken(user.id, res); 
  res.status(201).json({ data: { name: user.first_name, email: user.email }, token });
};

const login = async (req : Request , res : Response) => {
  const user = await authService.login(req.body);
  const token = generateToken(user.id, res); 
  return res.status(200).json({ message: "User Logged In ", token: token });
};

export { register, login };
