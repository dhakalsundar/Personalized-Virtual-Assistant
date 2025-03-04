const request = require("supertest");
const express = require("express");
const userRoutes = require("../routes/userRoutes"); // ✅ Correct import
const { auth, db } = require("../services/firebaseService");
// Mock Firebase services
jest.mock("../services/firebaseService", () => ({
  auth: {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
  },
  db: {
    ref: jest.fn(() => ({
      set: jest.fn(),
    })),
  },
}));
const app = express();
app.use(express.json());
app.use("/auth", userRoutes); // ✅ Corrected route usage
describe("Auth Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("POST /auth/signup - should create a new user", async () => {
    auth.createUser.mockResolvedValue({
      uid: "mocked-uid",
    });
    const res = await request(app).post("/auth/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully!");
  });

  test("POST /auth/signup - should return error if email exists", async () => {
    auth.createUser.mockRejectedValue({
      code: "auth/email-already-exists",
      message: "Email is already registered",
    });

    const res = await request(app).post("/auth/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Email is already registered");
  });

  test("POST /auth/login - should login user successfully", async () => {
    auth.getUserByEmail.mockResolvedValue({
      uid: "mocked-uid",
    });

    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User logged in successfully!");
  });

  test("POST /auth/login - should return error for non-existent user", async () => {
    auth.getUserByEmail.mockRejectedValue(new Error("User not found"));

    const res = await request(app).post("/auth/login").send({
      email: "unknown@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error logging in");
  });
});
