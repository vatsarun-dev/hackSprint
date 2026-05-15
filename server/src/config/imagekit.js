import ImageKit from "imagekit";
import config from "./config.js";

const imagekit = new ImageKit({
	publicKey: config.imagekit_public_key,
	privateKey: config.imagekit_private_key,
	urlEndpoint: config.imagekit_url_endpoint,
});

export default imagekit;
