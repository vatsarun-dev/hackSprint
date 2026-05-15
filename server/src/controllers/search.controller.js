import {
	searchBlogsService,
	searchProjectsService,
	searchUsersService,
} from "../services/search.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const searchUser = asyncHandler(async (req, res) => {
	const users = await searchUsersService(req.query);

	res
		.status(200)
		.json(new ApiResponse(200, "Users fetched successfully", users));
});

export const searchProject = asyncHandler(async (req, res) => {
	const projects = await searchProjectsService(req.query);
	res
		.status(200)
		.json(new ApiResponse(200, "Projects fetched successfully", projects));
});

export const searchBlog = asyncHandler(async (req, res) => {
	const blogs = await searchBlogsService(req.query);
	res
		.status(200)
		.json(new ApiResponse(200, "Blogs fetched successfully", blogs));
});
