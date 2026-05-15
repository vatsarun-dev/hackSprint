import asyncHandler from "../middlewares/async.handler.js";
import {
	createBlogService,
	deleteBlogService,
	getAllBlogsService,
	getSingleBlogService,
	updateBlogService,
} from "../services/blog.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createBlog = asyncHandler(async (req, res) => {
	const newBlog = await createBlogService(req.body,req.user.id);
	return res
		.status(201)
		.json(new ApiResponse(201, "Blog created successfully", newBlog));
});

export const getAllBlogs = asyncHandler(async (req, res) => {
	const allBlogs = await getAllBlogsService();
	return res.status(200).json(new ApiResponse(200, "All blogs", allBlogs));
});

export const getSingleBlog = asyncHandler(async (req, res) => {
	const blog = await getSingleBlogService(req.params.slug);
	return res.status(200).json(new ApiResponse(200, "Blog found", blog));
});

export const updateBlog = asyncHandler(async (req, res) => {
	const blog = await updateBlogService(req.params.id, req.body, req.user.id);
	return res.status(200).json(new ApiResponse(200, "Blog updated", blog));
});

export const deleteBlog = asyncHandler(async (req, res) => {
	const blog = await deleteBlogService(req.params.id, req.user.id);
	return res.status(200).json(new ApiResponse(200, "Blog deleted", blog));
});
