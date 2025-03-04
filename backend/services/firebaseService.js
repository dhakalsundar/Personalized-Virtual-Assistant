// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // Add the path to your service account key file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://new-version-chat-app-default-rtdb.firebaseio.com/" // Your Firebase Realtime Database URL
});

const db = admin.database();
const auth = admin.auth();

module.exports = { db, auth };
