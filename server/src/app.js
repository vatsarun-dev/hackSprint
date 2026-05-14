import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/error.handler.js";
import userRoute from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Backend is running!");
});

app.use("/api/user", userRoute);

app.use(errorHandler);

export default app;
