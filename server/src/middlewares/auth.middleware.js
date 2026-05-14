import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { ApiError } from "../utils/apiError.js";

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies?.accessToken;

		if (!token) {
			throw new ApiError(401, "No token provided");
		}

		const decoded = jwt.verify(token, config.jwt_secret_access);

		req.user = {
			id: decoded.id,
		};

		next();
	} catch (error) {
		console.log("Error in middleware:", error);
		throw new ApiError(401, "UnAuthorized");
	}
};

export default authMiddleware;
