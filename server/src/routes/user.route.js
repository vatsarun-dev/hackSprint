import { Router } from "express";
import {
	getMe,
	getRefreshToken,
	getUser,
	loginUser,
	logoutUser,
	registerUser,
	updateProfile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Health check
router.get("/health", (req, res) => {
	res.send("user route is running");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", getRefreshToken);
router.get("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getMe);
router.get("/profile/:username", getUser);

router.patch(
	"/me",
	authMiddleware,
	upload.fields([
		{ name: "profilePicture", maxCount: 1 },
		{ name: "banner", maxCount: 1 },
	]),
	updateProfile,
);

export default router;
