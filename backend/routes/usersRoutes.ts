import { Router } from "express";
const router = Router();
import { registerUser, loginUsers, getMe } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.post("/", registerUser);
router.post("/login", loginUsers);
router.get("/me", protect, getMe);

export default router;
