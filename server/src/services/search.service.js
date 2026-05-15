import Blog from "../models/blog.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const searchUsersService = async (queryParams) => {
	const { search } = queryParams;

	const query = {};

	if (search) {
		query.name = {
			$regex: search,
			$options: "i",
		};
	}

	const users = await User.find(query).select("-password -refreshToken");

	return users;
};

export const searchProjectsService = async (queryParams) => {
	const { search, tech } = queryParams;

	const query = {};

	if (search) {
		query.title = {
			$regex: search,
			$options: "i",
		};
	}

	if (tech) {
		query.techStack = {
			$in: [tech],
		};
	}

	return await Project.find(query)
		.populate("author", "name email")
};

export const searchBlogsService = async (queryParams) => {
	const { search } = queryParams;

	const query = {};

	if (search) {
		query.title = {
			$regex: search,
			$options: "i",
		};
	}

	return await Blog.find(query)
		.populate("author", "name email")
		.sort({ createdAt: -1 });
};
