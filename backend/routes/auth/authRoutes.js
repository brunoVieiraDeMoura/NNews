import express from "express";
import { authenticateToken } from "./../../middlewares/autenticatedToken";
import {
  registerUser,
  loginUser,
  validateToken,
  forgotPassword,
  resetPassword,
  updateUser,
  someProtectedController,
} from "../../controllers/auth/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validate-token", validateToken, someProtectedController);
router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", authenticateToken, resetPassword);
router.put("/update-user/:id", authenticateToken, updateUser);

export default router;
