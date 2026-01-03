import { AdminToken } from "./setup.js";
import app from "../app.js";

import request from "supertest";

describe("AUTH API", () => {
  test("Login returns JWT token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin@123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
