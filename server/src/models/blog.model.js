import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			unique: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		category: {
			type: String,
			trim: true,
		},
		tags: [
			{
				type: String,
				trim: true,
			},
		],
		coverImage: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

blogSchema.pre("save", async function () {
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
		await mongoose.models.Blog.exists({
			slug,
			_id: { $ne: this._id },
		})
	) {
		slug = `${baseSlug}-${counter}`;
		counter++;
	}

	this.slug = slug;

});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
