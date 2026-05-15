import chalk from "chalk";
import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
	try {
		if (!config.mongodb) {
			throw new Error("MONGODB_URI is not configured");
		}

		await mongoose.connect(config.mongodb);
		console.log(chalk.bgGreen("Database connected"));
	} catch (error) {
		console.log("Error in database connection", error);
		process.exit(1);
	}
};

export default connectDB;
