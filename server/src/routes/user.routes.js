import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
	res.send("user route is working");
});

router.post('/register')

export default router;
