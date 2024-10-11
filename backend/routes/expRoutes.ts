import { Router } from "express";
const router = Router();
import {
  getExps,
  getExp,
  setExp,
  updateExp,
  deleteExp,
} from "../controllers/expController";
import { protect } from "../middleware/authMiddleware";

router.route("/").get(protect, getExps).post(protect, setExp);
router
  .route("/:id")
  .delete(protect, deleteExp)
  .put(protect, updateExp)
  .get(protect, getExp);

export default router;
