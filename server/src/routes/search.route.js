import { Router } from "express";
import {
	searchBlog,
	searchProject,
	searchUser,
} from "../controllers/search.controller.js";

const router = Router();

router.get("/health", (req, res) => {
	res.send("Search route is running");
});

router.get("/users", searchUser);
router.get("/projects", searchProject);
router.get("/blogs", searchBlog);

export default router;
