import Blog from "../models/blog.model.js";
import uploadToImagekit from "../utils/uploadToImagekit.js";
import { createBlogValidator } from "../validators/blog.validator.js";

export const createBlogService = async (data, userId, file) => {
	const { title, content, category, tags } = createBlogValidator(data);

	let coverImageUrl = "";

	if (file) {
		coverImageUrl = await uploadToImagekit(file);
	}

	const newBlog = await Blog.create({
		title,
		content,
		author: userId,
		category,
		tags,
		coverImage: coverImageUrl,
	});
	return newBlog;
};

export const getAllBlogsService = async () => {
	return Blog.find().populate("author", "name email");
};

export const getSingleBlogService = async (slug) => {
	const blog = await Blog.findOne({ slug }).populate("author", "name email");

	if (!blog) {
		throw new ApiError(404, "Blog not found");
	}

	return blog;
};

export const updateBlogService = async (id, data, userId, file) => {
	const blog = await Blog.findById(id);

	if (!blog) {
		throw new ApiError(404, "Blog not found");
	}

	if (blog.author.toString() !== userId) {
		//this will check if the user is the author of the blog
		throw new ApiError(403, "Unauthorized");
	}

	Object.assign(blog, data);

	if (file) {
		const coverImageUrl = await uploadToImagekit(file);
		blog.coverImage = coverImageUrl;
	}

	await blog.save();

	return blog;
};

export const deleteBlogService = async (id, userId) => {
	const blog = await Blog.findById(id);

	if (!blog) {
		throw new ApiError(404, "Blog not found");
	}

	if (blog.author.toString() !== userId) {
		throw new ApiError(403, "Unauthorized");
	}

	await blog.deleteOne();

	return blog;
};
