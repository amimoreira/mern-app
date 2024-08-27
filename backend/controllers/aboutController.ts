import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const About = require("../models/AboutModel");

interface AuthenticatedRequest extends Request {
  user?: any; // Puedes ajustar el tipo 'any' al tipo específico de tu usuario si lo conoces
}

// @desc    Get About
// @route   GET /api/Abouts
// @access  Private
const getAbouts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const abouts = await About.find({ user: req.user.id });

    res.status(200).json(abouts);
  }
);

// @desc    Set About
// @route   POST /api/Abouts
// @access  Private
const setAbout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.body.name|| !req.body.email) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const about = await About.create({
    name: req.body.name,
    email: req.body.email,
    user: req.user.id,
  });

  res.status(200).json(About);
});

// @desc    Update About
// @route   PUT /api/Abouts/:id
// @access  Private
const updateAbout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const about = await About.findById(req.params.id);

  if (!about) {
    res.status(400);
    throw new Error("About not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the About user
  if (About.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAbout);
});

// @desc    Delete About
// @route   DELETE /api/Abouts/:id
// @access  Private
const deleteAbout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const about = await About.findById(req.params.id);

  if (!about) {
    res.status(400);
    throw new Error("About not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the About user
  if (About.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await About.deleteOne(about);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAbouts,
  setAbout,
  updateAbout,
  deleteAbout,
};
