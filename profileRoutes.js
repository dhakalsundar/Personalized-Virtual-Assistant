// profileRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const { auth, db } = require("../services/firebaseService");
const { PassThrough } = require('stream');

// Set up Multer to handle file uploads (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



router.post('/upload-profile-pic', upload.single('profilePic'), async (req, res) => {
    try {
        const file = req.file;
        const userId = req.body.userId; // Ensure userId is sent from frontend

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload to Cloudinary (using a Promise)
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const result = cloudinary.uploader.upload_stream(
                    { folder: 'profile_pictures' },
                    (error, image) => {
                        if (error) return reject(error);
                        resolve({ url: image.secure_url, public_id: image.public_id });
                    }
                );

                const bufferStream = new PassThrough();
                bufferStream.end(file.buffer);
                bufferStream.pipe(result);
            });
        };

        // Wait for Cloudinary upload
        const { url: profilePicUrl, public_id } = await uploadToCloudinary();

        // Save URL to Firebase (if this fails, delete image)
        const userRef = db.ref('users').child(userId);
        await userRef.update({ profilePic: profilePicUrl })
            .catch(async (error) => {
                console.error("Firebase update failed:", error);

                // Delete uploaded image from Cloudinary
                await cloudinary.uploader.destroy(public_id);
                return res.status(500).json({ message: "Database update failed, image deleted." });
            });

        res.json({ message: "Profile picture uploaded successfully", profilePicUrl });

    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

  
router.get('/get-profile', async (req, res) => {
    const userId = req.query.userId;  // You can pass userId as a query parameter

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const userRef = db.ref('users/' + userId);
        const userSnapshot = await userRef.once('value');
        const userData = userSnapshot.val();

        if (userData) {
            return res.status(200).json({
                name: userData.name,
                email: userData.email,
                profilePic: userData.profilePic || ''
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





router.put('/update-profile', async (req, res) => {
  try {
      const { userId, name, email } = req.body; // Get user data from request

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      // Reference to the user in Firebase Realtime Database
      const userRef = db.ref('users').child(userId);

      // Update user details in Firebase
      await userRef.update({ name, email });

      res.json({ message: "Profile updated successfully" });

  } catch (error) {
      console.error("Profile update failed:", error);
      res.status(500).json({ message: "Profile update failed", error: error.message });
  }
});


module.exports = router;
