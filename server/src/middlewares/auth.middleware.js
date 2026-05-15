import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { ApiError } from "../utils/apiError.js";

const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || "";
		const bearerToken = authHeader.startsWith("Bearer ")
			? authHeader.slice(7)
			: "";
		const token = req.cookies?.accessToken || bearerToken;

		if (!token) {
			throw new ApiError(401, "No token provided");
		}

		const decoded = jwt.verify(token, config.jwt_secret_access);

		req.user = {
			id: decoded.id,
		};

		next();
	} catch (error) {
		next(error instanceof ApiError ? error : new ApiError(401, "UnAuthorized"));
	}
};

export default authMiddleware;
