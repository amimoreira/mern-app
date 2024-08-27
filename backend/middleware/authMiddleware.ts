import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

interface AuthenticatedRequest extends Request {
  user?: any; // Puedes ajustar el tipo 'any' al tipo específico de tu usuario si lo conoces
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
      
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
