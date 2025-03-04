const express = require("express");
const { auth, db } = require("../services/firebaseService");

const router = express.Router();

// Add Task Route
router.post("/add-task", async (req, res) => {
    try {
        const { userId, taskName, taskPriority, taskDate } = req.body;

        if (!userId || !taskName || !taskPriority || !taskDate) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Generate a unique task ID
        const taskRef = db.ref("tasks").push();
        const taskId = taskRef.key;

        // Create task object
        const newTask = {
            taskId,  // Firebase unique task ID
            userId,  // Foreign key reference
            taskName,
            taskPriority,
            taskDate,
            status: "Pending", // Default status
            createdAt: new Date().toISOString(),
        };

        // Save task under `tasks/{taskId}`
        await taskRef.set(newTask);

        res.status(201).json({ message: "Task added successfully!", task: newTask });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


// Fetch All Tasks by User ID Route
router.get("/get-tasks/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const tasksRef = db.ref("tasks");
        const tasksSnapshot = await tasksRef.orderByChild("userId").equalTo(userId).once("value");

        if (!tasksSnapshot.exists()) {
            return res.status(404).json({ error: "No tasks found for this user" });
        }

        const tasks = tasksSnapshot.val();
        const taskList = Object.keys(tasks).map(taskId => ({
            taskId,
            ...tasks[taskId]
        }));

        res.status(200).json({ tasks: taskList });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


// Edit Task by Task ID
router.put("/edit-task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { taskName, taskPriority, taskDate, status } = req.body;

        if (!taskName || !taskPriority || !taskDate || !status) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const taskRef = db.ref(`tasks/${taskId}`);

        // Check if task exists
        const snapshot = await taskRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Update the task with new data
        await taskRef.update({
            taskName,
            taskPriority,
            taskDate,
            status,
            updatedAt: new Date().toISOString(),
        });

        res.status(200).json({ message: "Task updated successfully!" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


// Delete Task by Task ID
router.delete("/delete-task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }

        const taskRef = db.ref(`tasks/${taskId}`);

        // Check if task exists
        const snapshot = await taskRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Delete the task from the database
        await taskRef.remove();

        res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});



module.exports = router;
