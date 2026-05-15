import { ApiError } from "../utils/apiError.js";

export const createBlogValidator = (data) => {
	const { title, content } = data;
	if (!title || !content) {
		throw new ApiError(404, "All fields are required");
	}
	return data;
};
