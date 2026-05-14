const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "Internal Server Error";

	console.log(err.message);

	res.status(statusCode).json({
		message: errorMessage,
	});
};

export default errorHandler;
