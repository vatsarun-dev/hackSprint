import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		//automatic
		username: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
		},
		//automatic hashing
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		bio: {
			type: String,
			trim: true,
		},
		//automatic
		refreshToken: {
			type: String,
		},
		skills: [
			{
				type: String,
				trim: true,
			},
		],
		profilePicture: {
			type: String,
			trim: true,
			default: "",
		},
		banner: {
			type: String,
			trim: true,
			default: "",
		},
		description: {
			title: {
				type: String,
			},
			location: {
				type: String,
			},
			summary: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	},
);

userSchema.index({
	name: "text",
	skills: "text",
});

userSchema.pre("save", function () {
	if (!this.isModified("password")) {
		return;
	}
	this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.pre("save", async function () {
	if (!this.isModified("name")) {
		return;
	}

	const baseUsername = this.name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "-");

	let username;
	let isUsernameTaken = true;

	while (isUsernameTaken) {
		const randomNumbers = Math.floor(1000 + Math.random() * 9000);

		username = `${baseUsername}-${randomNumbers}`;

		const existingUser = await mongoose.models.User.findOne({
			username,
			_id: { $ne: this._id },
		});

		isUsernameTaken = !!existingUser;
	}

	this.username = username;
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
