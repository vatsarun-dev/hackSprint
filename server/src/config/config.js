import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
	port: process.env.PORT || 3000,
	mongodb: process.env.MONGODB_URI || "",
	jwt_secret_access: process.env.JWT_SECRET_ACCESS || "",
	jwt_secret_refresh: process.env.JWT_SECRET_REFRESH || "",
	node_env: process.env.NODE_ENV || "development",
	origin: process.env.ORIGIN || "",
	origin_prod: process.env.ORIGIN_PROD || "",
};
export default config;
