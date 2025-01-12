import z from "zod";
import { Request, Response } from "express";
import {
  addNewUser,
  comparePassword,
  findExistingUser,
} from "../services/authService";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});

export const signupController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password, firstName, lastName } = req.body;

  const zodValidation = signupSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }

  try {
    const checkUser = await findExistingUser(email);
    if (checkUser.length > 0) {
      return res.status(409).json({
        msg: "Email already registered",
      });
    }

    await addNewUser({ email, password, firstName, lastName });

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res.cookie("Token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(201).json({
      msg: "User registered successfully",
      userData: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });
  } catch (error) {
    console.log("Signup error: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signinController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password } = req.body;

  const zodValidation = signinSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).send({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }

  try {
    const getUser = await findExistingUser(email);
    if (getUser.length === 0) {
      return res.status(404).send({
        msg: "User not found",
      });
    }

    const verifyPassword = await comparePassword(password, getUser[0].password);
    if (!verifyPassword) {
      return res.status(401).send({
        msg: "Incorrect Password",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("Token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).send({
      msg: "Logged in successfully",
      userData: {
        firstName: getUser[0].first_name,
        lastName: getUser[0].last_name,
        email: getUser[0].email,
      },
    });
  } catch (error) {
    console.log("Signin error: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    res.clearCookie("Token");
    return res.status(200).send({
      msg: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};
