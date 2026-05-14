import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		bio: {
			type: String,
			trim: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", function () {
	this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
