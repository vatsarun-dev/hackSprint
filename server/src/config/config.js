import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
	port: process.env.PORT || 3000,
	mongodb_uri: process.env.MONGODB_URI || "",
	jwt_secret: process.env.JWT_SECRET || "",
	origin: process.env.ORIGIN || "",
	node_env: process.env.NODE_ENV || "",
};

export default config;
