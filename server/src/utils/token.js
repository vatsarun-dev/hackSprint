import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateAccessToken = (userId) => {
	return jwt.sign({ id: userId }, config.jwt_secret_access, {
		expiresIn: "15m",
	});
};

export const generateRefreshToken = (userId) => {
	return jwt.sign({ id: userId }, config.jwt_secret_refresh, {
		expiresIn: "1d",
	});
};
