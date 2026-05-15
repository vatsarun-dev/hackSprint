import asyncHandler from "../middlewares/async.handler.js";
import {
	createProjectService,
	deleteProjectService,
	getAllProjectsService,
	getProjectBySlugService,
	updateProjectService,
} from "../services/project.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createProject = asyncHandler(async (req, res) => {
	const newProject = await createProjectService(req.body, req.user.id);
	res
		.status(201)
		.json(
			new ApiResponse(
				201,
				newProject,
				"Project created successfully",
				newProject,
			),
		);
});

export const getAllProjects = asyncHandler(async (req, res) => {
	const projects = await getAllProjectsService();
	res
		.status(200)
		.json(new ApiResponse(200, "Projects fetched successfully", projects));
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
	const project = await getProjectBySlugService(req.params.slug);
	res
		.status(200)
		.json(new ApiResponse(200, "Project fetched successfully", project));
});

export const updateProject = asyncHandler(async (req, res) => {
	const project = await updateProjectService(
		req.params.id,
		req.body,
		req.user.id,
	);
	res
		.status(200)
		.json(new ApiResponse(200, project, "Project updated successfully"));
});

export const deleteProject = asyncHandler(async (req, res) => {
	const project = await deleteProjectService(req.params.id, req.user.id);
	res
		.status(200)
		.json(new ApiResponse(200, "Project deleted successfully", project));
});
