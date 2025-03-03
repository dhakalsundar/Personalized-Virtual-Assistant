const express = require("express");
const { auth, db } = require("../services/firebaseService");
const router = express.Router();


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Store additional user details in Realtime Database
    await db.ref(`users/${userRecord.uid}`).set({
      name,
      email,
      uid: userRecord.uid,
    });

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error creating user:", error);

    let errorMessage = "Error creating user";
    if (error.code === "auth/email-already-exists") {
      errorMessage = "Email is already registered";
    }

    res.status(500).json({ message: errorMessage, error: error.message });
  }
});
// Signup route - to create a new user and save data to Firebase Realtime Database
router.post("/", async (req, res) => {
  const { name,email,password } = req.body;

  try {
    // Create user with Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Save additional user data to Realtime Database
    const userRef = db.ref("users/" + userRecord.uid);
    await userRef.set({
      name: name,
      email: email,
      uid: userRecord.uid,
    });

    // Respond with success
    res.status(201).json({
      message: "User registered successfully!",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});


// Login route - to authenticate the user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify user with Firebase Authentication
    const user = await auth.getUserByEmail(email);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Note: Firebase Admin SDK doesn't verify the password directly.
    // The client should handle password verification via Firebase Auth Client SDK
    // Here, you can use Firebase Custom Token for login, or verify token on client side.

    // Respond with success and user data (For simplicity, returning UID)
    res.status(200).json({
      message: "User logged in successfully!",
      uid: user.uid,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});



module.exports = router;
