import { Router } from "express";
import {
	getMe,
	getRefreshToken,
	getUser,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Health check
router.get("/", (req, res) => {
	res.send("user route is running");
});


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", getRefreshToken);
router.get("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getMe);
router.get("/:id", getUser);

export default router;
