import { RefreshToken, User } from "../models/index";
import { generateToken } from "../utils/generateToken";
import AppError from "../utils/appError";
import crypto from "node:crypto";
import { Request, Response } from "express";
import { AuthService } from "../services/authServices";
import { UserRepository } from "../repositories/userRepository";
import { hashToken } from "../utils/hash";

const authService = new AuthService(new UserRepository()); 

const register = async (req : Request , res : Response) => {
  const user = await authService.register(req.body);
  const token = generateToken(user.id, res); 
  res.status(201).json({ data: { name: user.first_name, email: user.email }, token });
};

const login = async (req : Request , res : Response) => {
  const user = await authService.login(req.body);
  const accessToken = generateToken(user.id, res); 
  const refreshToken = crypto.randomBytes(32).toString("hex");
  await RefreshToken.create({
    userId: user.id,
    tokenHash: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days  
    path: "/auth/refresh-token", 
  });
  return res.status(200).json({ message: "User Logged In ", token: accessToken });
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token not provided", 401);
  }

  const storedToken = await RefreshToken.findOne({ where: { tokenHash: hashToken(refreshToken) } });

  if (!storedToken || storedToken.expiresAt < new Date() || storedToken.revokedAt) {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await User.findByPk(storedToken.userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = generateToken(user.id, res); 
  return res.status(200).json({ message: "Token refreshed", token: token });
};

export { register, login, refreshToken };
