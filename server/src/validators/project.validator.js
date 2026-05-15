import { ApiError } from "../utils/apiError.js";

export const createProjectValidator = (data) => {
	const { title, description } = data;
	if (!title || !description) {
		throw new ApiError(404, "Title and description are required");
	}
	return data;
};
