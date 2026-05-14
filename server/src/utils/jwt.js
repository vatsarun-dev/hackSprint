import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const decodeRefreshToken = (token) => {
	return jwt.verify(token, config.jwt_secret_refresh);
};
