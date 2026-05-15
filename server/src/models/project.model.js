import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		techStack: [
			{
				type: String,
				trim: true,
			},
		],
		githubUrl: {
			type: String,
			trim: true,
		},
		liveUrl: {
			type: String,
			trim: true,
		},
		thumbnail: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

projectSchema.index({ title: "text" });

projectSchema.pre("save", async function () {
	if (!this.isModified("title")) {
		return;
	}

	const baseSlug = this.title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-");

	let slug = baseSlug;
	let counter = 1;

	while (
		await mongoose.models.Project.exists({
			slug,
			_id: { $ne: this._id },
		})
	) {
		slug = `${baseSlug}-${counter}`;
		counter++;
	}

	this.slug = slug;
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
