import { Request, Response } from "express";
const asynsHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

interface AuthenticatedRequest extends Request {
  user?: any; // Puedes ajustar el tipo 'any' al tipo específico de tu usuario si lo conoces
}

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
export const loginUsers = asynsHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Public
export const getMe = asynsHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { _id, userName, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    userName,
    email,
  }); 

});

// @desc Register new user
// @route POST /api/users
// @access Public
export const registerUser = asynsHandler(
  async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
     expiresIn: "30d" 
    });
};

//BaJ8KEylCfkbPABj
