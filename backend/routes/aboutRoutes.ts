import { Router } from "express";
const router = Router();
import {
  getAbouts,
  getAbout,
  setAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController";
import { protect } from "../middleware/authMiddleware";

router.route("/").get(protect, getAbouts).post(protect, setAbout);
router
  .route("/:id")
  .delete(protect, deleteAbout)
  .put(protect, updateAbout)
  .get(protect, getAbout);

export default router;
