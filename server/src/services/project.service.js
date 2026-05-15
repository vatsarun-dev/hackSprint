import Project from "../models/project.model.js";
import { ApiError } from "../utils/apiError.js";
import uploadToImagekit from "../utils/uploadToImagekit.js";
import { createProjectValidator } from "../validators/project.validator.js";

const normalizeList = (value) => {
	if (Array.isArray(value)) {
		return value.filter(Boolean);
	}

	if (typeof value === "string") {
		return value
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);
	}

	return [];
};

export const createProjectService = async (projectData, userId, file) => {
	const validatedData = createProjectValidator(projectData);
	let thumbnailUrl = "";

	if (file) {
		thumbnailUrl = await uploadToImagekit(file);
	}

	const newProject = await Project.create({
		...validatedData,
		techStack: normalizeList(validatedData.techStack),
		features: normalizeList(validatedData.features),
		tags: normalizeList(validatedData.tags),
		githubUrl: validatedData.githubUrl || validatedData.github,
		liveUrl: validatedData.liveUrl || validatedData.live,
		author: userId,
		thumbnail: thumbnailUrl || validatedData.thumbnail || validatedData.image,
	});
	await newProject.populate("author", "name username profilePicture description");
	return newProject;
};

export const getAllProjectsService = async () => {
	const projects = await Project.find().populate("author", "name username profilePicture description");
	return projects;
};

export const getProjectBySlugService = async (slug) => {
	const project = await Project.findOne({ slug }).populate("author", "name username profilePicture description");

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

	Object.assign(project, {
		...updateData,
		techStack: normalizeList(updateData.techStack),
		features: normalizeList(updateData.features),
		tags: normalizeList(updateData.tags),
		githubUrl: updateData.githubUrl || updateData.github,
		liveUrl: updateData.liveUrl || updateData.live,
	});
  
	if (file) {
		const thumbnailUrl = await uploadToImagekit(file);
		project.thumbnail = thumbnailUrl;
	}

	await project.save();
	await project.populate("author", "name username profilePicture description");

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
