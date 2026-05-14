import chalk from "chalk";
import app from "./app.js";
import config from "./config/config.js";
import connectDb from "./config/database.js";

const startServer = () => {
	try {
		connectDb();
		app.listen(config.port, () => {
			console.log(chalk.bgCyan(`Server started on port: ${config.port}`));
		});
	} catch (error) {
		console.log("Error starting server");
	}
};

startServer();
