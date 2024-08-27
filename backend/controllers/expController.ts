import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const Experience = require("../models/expModel");

interface AuthenticatedRequest extends Request {
  user?: any; // Puedes ajustar el tipo 'any' al tipo específico de tu usuario si lo conoces
}

// @desc    Get experience
// @route   GET /api/exps
// @access  Private
const getExps = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const exps = await Experience.find({ user: req.user.id });

    res.status(200).json(exps);
  }
);

// @desc    Set experience
// @route   POST /api/exps
// @access  Private
const setExp = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.body.company || !req.body.position || !req.body.startDate || !req.body.endDate || !req.body.description) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const exp = await Experience.create({
    company: req.body.company,
    position: req.body.position,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    user: req.user.id,
  });

  res.status(200).json(exp);
});

// @desc    Update experience
// @route   PUT /api/exps/:id
// @access  Private
const updateExp = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const exp = await Experience.findById(req.params.id);

  if (!exp) {
    res.status(400);
    throw new Error("exp not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the exp user
  if (exp.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedexp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedexp);
});

// @desc    Delete exp
// @route   DELETE /api/exps/:id
// @access  Private
const deleteExp = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const exp = await Experience.findById(req.params.id);

  if (!exp) {
    res.status(400);
    throw new Error("exp not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the exp user
  if (exp.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Experience.deleteOne(exp);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExps,
  setExp,
  updateExp,
  deleteExp,
};
