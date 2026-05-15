import { Router } from "express";
import {
	createProject,
	deleteProject,
	getAllProjects,
	getProjectBySlug,
	updateProject,
} from "../controllers/project.controller.js";
import authMiddlware from "../middlewares/auth.middleware.js";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
	res.send("Project route is running");
});

router.post("/", authMiddlware, createProject);
router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);
router.patch("/:id", authMiddlware, updateProject);
router.delete("/:id", authMiddlware, deleteProject);

export default router;
