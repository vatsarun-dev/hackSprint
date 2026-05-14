import { ApiError } from "../utils/apiError.js";

export const createBlogValidator = (data) => {
	const { title, content, author } = data;
	if (!title || !content || !author) {
		throw new ApiError(404, "All fields are required");
	}
	return data;
};
