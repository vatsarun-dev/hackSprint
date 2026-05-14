import { ApiError } from "../utils/apiError.js";

export const loginValidator = (data) => {
	const { email, password } = data;
	if (!email || !password) {
		throw new ApiError(404, "All fields are required");
	}
	return data;
};

export const registerValidator = (data) => {
	const { name, email, password } = data;
	if (!name || !email || !password) {
		throw new ApiError(404, "All fields are required");
	}
	return data;
};
