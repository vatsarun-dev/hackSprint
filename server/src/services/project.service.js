import Project from "../models/project.model.js";
import { ApiError } from "../utils/apiError.js";
import uploadToImagekit from "../utils/uploadToImagekit.js";
import { createProjectValidator } from "../validators/project.validator.js";

export const createProjectService = async (projectData, userId, file) => {
	const validatedData = createProjectValidator(projectData);
	let thumbnailUrl = "";

	if (file) {
		thumbnailUrl = await uploadToImagekit(file);
	}

	const newProject = await Project.create({
		...validatedData,
		author: userId,
		thumbnail: thumbnailUrl,
	});
	return newProject;
};

export const getAllProjectsService = async () => {
	const projects = await Project.find();
	return projects;
};

export const getProjectBySlugService = async (slug) => {
	const project = await Project.findOne({ slug });

	if (!project) {
		throw new ApiError(404, "Project not found");
	}

	return project;
};

export const updateProjectService = async (id, updateData, userId, file) => {
	const project = await Project.findById(id);

	if (!project) {
		throw new ApiError(404, "Project not found");
	}

	if (project.author.toString() !== userId) {
		throw new ApiError(403, "You are not authorized to update this project");
	}

	Object.assign(project, updateData);
  
	if (file) {
		const thumbnailUrl = await uploadToImagekit(file);
		project.thumbnail = thumbnailUrl;
	}

	await project.save();

	return project;
};

export const deleteProjectService = async (id, userId) => {
	const project = await Project.findById(id);

	if (!project) {
		throw new ApiError(404, "Project not found");
	}

	if (project.author.toString() !== userId) {
		throw new ApiError(403, "You are not authorized to delete this project");
	}

	await project.deleteOne();

	return project;
};
