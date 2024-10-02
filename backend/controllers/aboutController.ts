import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const About = require("../models/AboutModel");
import mongoose from "mongoose";

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

// @desc    Get About
// @route   GET /api/Abouts/:id
// @access  Private
const getAbout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    
    const about = await About.findById(req.params.id);

    if (!about) {
      res.status(400);
      throw new Error("About not found");
    }

    res.status(200).json(about);
  }
);

// @desc    Set About
// @route   POST /api/Abouts
// @access  Private
const setAbout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    
    if (!req.body.name || !req.body.description) {
      res.status(400);
      throw new Error("Please add a text field");
    }

    if (req.body.active !== true && req.body.active !== false) {
      res.status(400);
      throw new Error("Active field must be true or false");
    }

    //Check if there's already an active about
    if (req.body.active === true) {
      const activeAbout = await About.findOne({ user: req.user.id, active: true });
      if (activeAbout) {
        res.status(400);
        throw new Error("There is already an active About. Only one About can be active.");
      }
    }

    const about = await About.create({
      name: req.body.name,
      description: req.body.description,
      active: req.body.active,
      user: req.user.id,
    });

    res.status(200).json(about);
  }
);

// @desc    Update About
// @route   PUT /api/Abouts/:id
// @access  Private
const updateAbout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const about = await About.findById(req.params.id);

  if (!about || !about.user) { // Verifica que `about` y `about.user` estén definidos
    res.status(404);
    throw new Error("About not found or user not associated");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Asegúrate de que `about.user` esté definido antes de llamar a `toString()`
  if (about.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

   // Check if there's already an active About (only if updating to active=true)
   if (req.body.active === true && about.active === false) {
    const activeAbout = await About.findOne({ user: req.user.id, active: true });
    if (activeAbout) {
      res.status(400);
      throw new Error("There is already an active About. Only one About can be active.");
    }
  }
  

  const updatedAbout = await About.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedAbout);
});

// @desc    Delete About
// @route   DELETE /api/Abouts/:id
// @access  Private
const deleteAbout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const about = await About.findById(req.params.id);

     if (!about || !about.user) { // Verifica que `about` y `about.user` estén definidos
    res.status(404);
    throw new Error("About not found or user not associated");
  }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the About user
    if (about.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await About.deleteOne(about);

    res.status(200).json({ id: req.params.id });
  }
);

module.exports = {
  getAbouts,
  getAbout,
  setAbout,
  updateAbout,
  deleteAbout,
};
