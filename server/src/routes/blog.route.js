import { Router } from "express";
import {
	createBlog,
	deleteBlog,
	getAllBlogs,
	getSingleBlog,
	updateBlog,
} from "../controllers/blog.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
	res.send("blog route is running");
});

router.post("/", authMiddleware, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.patch("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
