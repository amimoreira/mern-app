import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactModel");

interface AuthenticatedRequest extends Request {
  user?: any; // Puedes ajustar el tipo 'any' al tipo específico de tu usuario si lo conoces
}

// @desc    Get Contact
// @route   GET /api/Contacts
// @access  Private
const getContacts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const contacts = await Contact.find({ user: req.user.id });

    res.status(200).json(contacts);
  }
);

// @desc    Get Contact
// @route   GET /api/Contacts/:id
// @access  Private
const getContact = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc    Set Contact
// @route   POST /api/Contacts
// @access  Private
const setContact = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.body.name|| !req.body.email) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const contact = await Contact.create({
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    user: req.user.id,
  });

  res.status(200).json(contact);
});

// @desc    Update Contact
// @route   PUT /api/Contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the Contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

// @desc    Delete Contact
// @route   DELETE /api/Contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the Contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Contact.deleteOne(contact);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getContacts,
  getContact,
  setContact,
  updateContact,
  deleteContact,
};
