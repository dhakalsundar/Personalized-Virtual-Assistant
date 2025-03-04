// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');  // Import routes
const app = express();
const PORT = 3000;
const signupRoutes = require('./routes/userRoutes'); // Import routes
const taskRoutes = require("./routes/taskRoutes")
app.use(express.json());  // This is the important part

// Enable CORS for frontend
app.use(cors());

// Use the profile routes
app.use('/api', profileRoutes);  // Mount the routes at /api
app.use("/signup", signupRoutes);
app.use("/api",taskRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
