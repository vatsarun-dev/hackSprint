import { Router } from "express";
import {
	createBlog,
	deleteBlog,
	getAllBlogs,
	getSingleBlog,
	updateBlog,
} from "../controllers/blog.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
	res.send("blog route is running");
});

router.post("/", authMiddleware, upload.single("coverImage"), createBlog);
router.get("/", getAllBlogs);
router.get("/:slug", getSingleBlog);
router.patch("/:id", authMiddleware, upload.single("coverImage"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
