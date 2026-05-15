import asyncHandler from "../middlewares/async.handler.js";
import {
  followUserService,
	getMeService,
	getUserService,
	loginUserService,
	logoutUserService,
	refreshTokenService,
	registerUserService,
	unFollowUserService,
	updateProfileService,
} from "../services/user.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { accessTokenOptions, refreshTokenOptions } from "../utils/cookie.js";

export const registerUser = asyncHandler(async (req, res) => {
	const { accessToken, refreshToken, newUser } = await registerUserService(
		req.body,
	);

	res.cookie("accessToken", accessToken, accessTokenOptions);

	res.cookie("refreshToken", refreshToken, refreshTokenOptions);

	return res
		.status(201)
		.json(new ApiResponse(201, "User registered successfully", newUser));
});

export const loginUser = asyncHandler(async (req, res) => {
	const { accessToken, refreshToken, user } = await loginUserService(req.body);

	res.cookie("accessToken", accessToken, accessTokenOptions);

	res.cookie("refreshToken", refreshToken, refreshTokenOptions);

	return res
		.status(200)
		.json(new ApiResponse(200, "User logged in successfully", user));
});

export const getRefreshToken = asyncHandler(async (req, res) => {
	const { accessToken } = await refreshTokenService(req.cookies.refreshToken);

	res.cookie("accessToken", accessToken, accessTokenOptions);

	return res.status(200).json(new ApiResponse(200, "Access token generated"));
});

export const getMe = asyncHandler(async (req, res) => {
	const user = await getMeService(req.user?.id);
	return res.status(200).json(new ApiResponse(200, "User data fetched", user));
});

export const getUser = asyncHandler(async (req, res) => {
	const user = await getUserService(req.params.username);
	return res.status(200).json(new ApiResponse(200, "User data fetched", user));
});

export const logoutUser = asyncHandler(async (req, res) => {
	await logoutUserService(req.user?.id);
	console.log("inside logout controller");

	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");

	return res
		.status(200)
		.json(new ApiResponse(200, "User logged out successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
	const user = await updateProfileService(req.user?.id, req.body, req.files);
	return res
		.status(200)
		.json(new ApiResponse(200, "User profile updated", user));
});

export const followUser = asyncHandler(async (req, res) => {
	const user = await followUserService(req.user?.id, req.params.userId);
	return res.status(200).json(new ApiResponse(200, "User followed", user));
});

export const unFollowUser = asyncHandler(async (req, res) => {
	const user = await unFollowUserService(req.user?.id, req.params.userId);
	return res.status(200).json(new ApiResponse(200, "User unfollowed", user));
});
