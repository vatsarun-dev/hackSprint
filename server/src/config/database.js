import chalk from "chalk";
import mongoose from "mongoose";
import config from "./config.js";

const connectDb = () => {
	try {
		mongoose.connect(config.mongodb_uri);
		console.log(chalk.bgGreen("Database connected successfully"));
	} catch (error) {
		console.log("Error connecting to database: ", error);
	}
};

export default connectDb;
