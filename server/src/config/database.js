import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = () => {
	try {
		mongoose.connect("mongodb://localhost:27017/hackathon");
		console.log(chalk.bgGreen("Database connected"));
	} catch (error) {
		console.log("Error in database connection", error);
	}
};

export default connectDB;
