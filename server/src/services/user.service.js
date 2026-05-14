import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { decodeRefreshToken } from "../utils/jwt.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import {
	loginValidator,
	registerValidator,
} from "../validators/user.validator.js";

export const registerUserService = async (data) => {
	const { name, email, password } = registerValidator(data);

	const user = await User.findOne({ email });

	if (user) {
		throw new ApiError(409, "Email already exist");
	}

	const newUser = await User.create({
		name,
		email,
		password,
	});

	const accessToken = generateAccessToken(newUser._id);
	const refreshToken = generateRefreshToken(newUser._id);

	newUser.refreshToken = refreshToken;
	await newUser.save();

	return {
		accessToken,
		refreshToken,
		newUser,
	};
};

export const loginUserService = async (data) => {
	const { email, password } = loginValidator(data);

	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(401, "Invalid credentials");
	}

	const checkPassword = await user.comparePassword(password);
	if (!checkPassword) {
		throw new ApiError(401, "Invalid password");
	}

	const accessToken = generateAccessToken(user._id);
	const refreshToken = generateRefreshToken(user._id);

	user.refreshToken = refreshToken;
	await user.save();

	return {
		accessToken,
		refreshToken,
		user,
	};
};

export const refreshTokenService = async (refreshToken) => {
	if (!refreshToken) {
		throw new ApiError(400, "Unauthorized user");
	}

	const decode = decodeRefreshToken(refreshToken);

	const user = await User.findById(decode.id);
	if (!user) {
		throw new ApiError(401, "Unauthorized user");
	}

	if (refreshToken !== user.refreshToken) {
		throw new ApiError(401, "Unauthorized user");
	}

	const accessToken = generateAccessToken(user._id);

	return {
		accessToken,
	};
};

export const getMeService = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	return user;
};

export const getUserService = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	return user;
};


export const logoutUserService = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new ApiError(404, "User not found");
	}

	user.refreshToken = "";

	await user.save();
};
