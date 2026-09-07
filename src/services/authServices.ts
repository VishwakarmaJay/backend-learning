import bcrypt from "bcryptjs";
import type { IUserRepository } from "../repositories/userRepository";
import { User } from "../models";
import AppError from "../utils/appError";
import { sendWelcomeEmail } from "./email";

export interface RegisterInput {
  first_name: string;
  last_name?: string | null;
  email: string;
  password: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
export class AuthService {
  constructor(private readonly users: IUserRepository) {}

  async register(input: RegisterInput): Promise<User> {
    const existing = await this.users.findByEmail(input.email);
    if (existing) throw new AppError("User Already Exist", 409);

    const user = await this.users.create(input);
    await sendWelcomeEmail(user.email, user.first_name);
    return user;
  }

  async login(input: LoginInput): Promise<User> {
    const userExist = await this.users.findByEmail(input.email);

    if (!userExist) {
      throw new AppError("Invalid Email or Password", 401);
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      input.password,
      userExist.password,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid Email or Password", 401);
    }

    return userExist;
  }
}
