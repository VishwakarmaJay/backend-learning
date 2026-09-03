import { User } from "../models/index";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import AppError from "../utils/appError";
import { sendWelcomeEmail } from "../services/email";
import { Request, Response } from "express";

const register = async (req : Request , res : Response) => {
  const { first_name, last_name, email, password } = req.body;

  const userExist  = await User.findOne({
    where: {
      email: email,
    },
  });

  if (userExist) {
    throw new AppError("User Already Exist", 409);
  }

  const salt : string = await bcrypt.genSalt(10);
  const hashedPassword : string = await bcrypt.hash(password, salt);

  const user : User= await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  });

  const token = generateToken(user.id   , res);

  res.status(201).json({
    data: {
      name: first_name,
      email: email,
    },
    token: token,
  });

  await sendWelcomeEmail(email, first_name);
};

const login = async (req : Request , res : Response) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!userExist) {
    throw new AppError("Invalid Email or Password", 401); // same 401, same message
  }

  const isPasswordValid : boolean = await bcrypt.compare(password, userExist.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid Email or Password", 401); // same 401, same message
  }

  if (userExist.email == email && isPasswordValid) {
    const token = generateToken(userExist.id, res);
    return res.status(200).json({ message: "User Logged In ", token: token });
  } else {
    throw new AppError("Invalid Email or Password", 401);
  }
};

export { register, login };
