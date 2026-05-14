import Blog from "../models/blog.model.js";
import { createBlogValidator } from "../validators/blog.validator.js";

export const createBlogService = async (data) => {
	const { title, content, author, category, tags, coverImage } =
		createBlogValidator(data);

	const newBlog = await Blog.create({
		title,
		content,
		author,
		category,
		tags,
		coverImage,
	});
	return newBlog;
};

export const getAllBlogsService = async () => {
	return Blog.find();
};

export const getSingleBlogService = async (id) => {
	return Blog.findById(id);
};

export const updateBlogService = async (id, data) => {
	return Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlogService = async (id) => {
	return Blog.findByIdAndDelete(id);
};
