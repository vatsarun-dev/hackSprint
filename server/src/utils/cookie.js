import config from "../config/config.js";

export const cookieOptions = {
	httpOnly: true,
	secure: config.node_env === "production",
	sameSite: config.node_env === "production" ? "none" : "lax",
};

export const accessTokenOptions = {
	...cookieOptions,
	maxAge: 15 * 60 * 1000,
};

export const refreshTokenOptions = {
	...cookieOptions,
	maxAge: 24 * 60 * 60 * 1000,
};
