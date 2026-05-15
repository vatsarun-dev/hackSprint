import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config/config.js";
import errorHandler from "./middlewares/error.handler.js";
import blogRoute from "./routes/blog.route.js";
import projectRoute from "./routes/project.route.js";
import searchRoute from "./routes/search.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: config.origin_prod || config.origin,
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Backend is running!");
});

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/project", projectRoute);
app.use("/api/search", searchRoute);

app.use(errorHandler);

export default app;
