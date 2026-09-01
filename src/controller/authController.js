import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });

    const token = generateToken(user.id,res)

    return res.status(201).json({
      data: {
        name: first_name,
        email: email,
      },
      token : token
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({
      where: {
        email :email
      },
    });

    if (!userExist) {
      return res.status(400).json({ message: "User Doesnt Exist" });
    }

    const isPasswordValid = await bcrypt.compare(password,userExist.password )

    if (userExist.email == email && isPasswordValid) {
        const token = generateToken(userExist.id, res)
      return res.status(200).json({ message: "User Logged In ",token : token });
    } else {
      return res.status(400).json({ message: "Invalid Creds" });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export { register, login };
