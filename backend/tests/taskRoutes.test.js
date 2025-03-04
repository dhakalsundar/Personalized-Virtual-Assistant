const request = require("supertest");
const express = require("express");
const taskRoutes = require("../routes/taskRoutes"); // ✅ Import routes
const { auth, db } = require("../services/firebaseService");

// Mock Firebase Services
jest.mock("../services/firebaseService", () => ({
  auth: {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
  },
  db: {
    ref: jest.fn(() => ({
      push: jest.fn(() => ({ key: "mocked-task-id" })),
      set: jest.fn(),
      once: jest.fn(() => ({
        exists: jest.fn(() => true),
        val: jest.fn(() => ({
          taskName: "Sample Task",
          taskPriority: "High",
          taskDate: "2025-03-05",
          userId: "user123",
          status: "Pending",
        })),
      })),
      update: jest.fn(),
      remove: jest.fn(),
      orderByChild: jest.fn().mockReturnThis(),
      equalTo: jest.fn().mockReturnThis(),
    })),
  },
}));



// Setup Express app
const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes); // ✅ Route mounting

describe("Task Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  /** ✅ Test: Edit Task */
  test("PUT /tasks/edit-task/:taskId - should update an existing task", async () => {
    const res = await request(app).put("/tasks/edit-task/mocked-task-id").send({
      taskName: "Updated Task",
      taskPriority: "Medium",
      taskDate: "2025-03-06",
      status: "Completed",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task updated successfully!");
  });

  /** ✅ Test: Delete Task */
  test("DELETE /tasks/delete-task/:taskId - should delete a task", async () => {
    const res = await request(app).delete("/tasks/delete-task/mocked-task-id");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully!");
  });

  /** ❌ Test: Handle Missing Fields in Task Creation */
  test("POST /tasks/add-task - should return 400 for missing fields", async () => {
    const res = await request(app).post("/tasks/add-task").send({
      taskName: "Incomplete Task",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Missing fields");
  });
});
