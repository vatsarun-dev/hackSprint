import chalk from "chalk";
import app from "./app.js";
import config from "./config/config.js";
import connectDb from "./config/database.js";

const startServer = async () => {
	try {
		await connectDb();
		app.listen(config.port, () => {
			console.log(chalk.bgCyan(`Server is running on port ${config.port}`));
		});
	} catch (error) {
		console.log("Error in starting server: ", error);
	}
};

startServer();
