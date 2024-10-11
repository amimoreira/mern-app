import express from "express";
import {
  getContacts,
  getContact,
  setContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/upload";

const router = express.Router();

// Rutas para contactos
router
  .route("/")
  .get(protect, getContacts)
  .post(protect, upload.single("photo"), setContact);
router
  .route("/:id")
  .delete(protect, deleteContact)
  .put(protect, upload.single("photo"), updateContact)
  .get(protect, getContact);

// Exportar el router correctamente
export default router;
