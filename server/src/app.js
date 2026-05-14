import cors from "cors";
import express from "express";
import userRoute from "./routes/user.routes.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
	res.send("Backend is running");
});

app.use("/api/user", userRoute);

export default app;
