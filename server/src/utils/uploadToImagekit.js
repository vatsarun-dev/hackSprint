import fs from "fs";
import imagekit from "../config/imagekit.js";

const uploadToImagekit = async (file) => {
	const response = await imagekit.upload({
		file: fs.readFileSync(file.path),
		fileName: file.originalname,
		folder: "/hackathon",
	});

	fs.unlinkSync(file.path);

	return response.url;
};

export default uploadToImagekit;
