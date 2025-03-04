require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Upload Image Function
const uploadToCloudinary = async (fileBuffer) => {
    try {
        const base64String = `data:image/png;base64,${fileBuffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(base64String, {
            folder: "profile_pictures"
        });
        return result.secure_url; // Return the image URL
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image");
    }
};

module.exports = { uploadToCloudinary };
